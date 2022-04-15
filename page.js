function clear() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

const CONDITION_START = -3*Math.PI/4;
const RUNE_MARGIN = 1.05;
var font = {};
fetch("https://raw.githubusercontent.com/cheese3660/cheese3660.github.io/main/font.json")
    .then(response => response.json())
    .then(json => {font = json;});
function triplets(word) {
    var triples = []
    var current_triple = "";
    for (var i = 0; i < word.length; i++) {
        if (i % 3 == 0 && i != 0) {
            triples.push(current_triple);
            current_triple = "";
            current_triple += word[i];
        } else {
            current_triple += word[i];
        }
    }
    if (current_triple.length != 0) triples.push(current_triple);
    return triples;
}
function splitRunes(runes) {
    runes = runes.toUpperCase();
    var new_runes = []
    runes.split(/(\s)/).forEach(
        element => {
            if (element.length > 0) {
                var triples = triplets(element);
                triples.forEach(triple => new_runes.push(triple));
            }
        }
    );
    return new_runes;
}

function createSigil() {
    var canvas = document.getElementById('canvas')
    var condition = "abcdefghijklmnopqrstuvwxyz"
    var condition_runes = splitRunes(condition);
    var action = "explode"
    var action_runes = splitRunes(action);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.strokeStyle = 'rgb(153,0,0)';
        ctx.fillStyle = 'rgb(153,0,0)';
        var size = canvas.width;
        var scale = size/1024;
        //Start with 2 thick circle and a thick line at a 45 degree angle
        //Give a 1% buffer to the sigil as well on each side, giving a total of 2% margin
        var start = size*0.01;
        var end = size*0.99;
        var center = size/2;
        var radius_outer = ((end-start)/2) - (7 * scale / 2);
        var radius_inner = radius_outer * 0.75;
        var maximum_height_outer = (radius_outer - radius_inner - (7 * scale)) * 0.95;
        var maximum_height_inner = (Math.SQRT1_2 * (radius_inner - (7 * scale/2))) * 0.95;
        var maximum_width_outer = maximum_height_outer / 3; //Divided by 9 as there are 9 square spaces in a rune
        var maximum_spaced_outer = maximum_width_outer * RUNE_MARGIN //Give 20% spacing between runes ... this may be increased later
        var circumsigil = Math.PI*2 * (radius_inner + (7 * scale/2));
        var possible_width_outer = circumsigil/condition_runes.length;
        var oversized = possible_width_outer > maximum_spaced_outer;
        var width_spaced = oversized ? maximum_spaced_outer : possible_width_outer;
        var true_width = width_spaced / RUNE_MARGIN;
        var radius_center = (radius_outer + radius_inner) / 2;
        var step_size = width_spaced/circumsigil;
        var step_angle = 2*Math.PI*step_size;
        ctx.lineWidth = 7 * scale;
        ctx.beginPath();
        if (!oversized) {
            ctx.arc(center,center,radius_outer,CONDITION_START,CONDITION_START+Math.PI*2);
            ctx.arc(center,center,radius_inner,CONDITION_START,CONDITION_START+Math.PI*2);
        } else {
            var percentage = (width_spaced * (condition_runes.length+1))/circumsigil;
            var offset = 2*Math.PI * percentage;
            var end = CONDITION_START + offset;
            ctx.arc(center,center,radius_outer,CONDITION_START, end);
            ctx.arc(center,center,radius_center,end,CONDITION_START);
            ctx.arc(center,center,radius_outer,CONDITION_START,end,true);
            ctx.arc(center,center,radius_inner,end,CONDITION_START);
            ctx.arc(center,center,radius_outer,CONDITION_START, end);
            ctx.arc(center,center,radius_inner,end,CONDITION_START,true);
        }
        ctx.stroke();
        ctx.lineWidth = 2;
        //for testing reasons
        ctx.strokeStyle = 'rgb(255,255,255)';
        var current_angle = CONDITION_START + step_angle;
        for (var i = 0; i < condition_runes.length; i++) {
            var rune = condition_runes[i];
            console.log("Drawing: ", rune, radius_center, center, current_angle, true_width);
            drawRadialRune(ctx, rune, radius_center, center, current_angle, true_width);
            current_angle += step_angle;
        }



        ctx.lineWidth = 5 * scale;

    }
}

function breakupRune(rune) {
    var sub_runes = [' ', ' ', ' '];
    switch (rune.length) {
        case 0:
            break;
        case 1:
            sub_runes[1] = rune[0]
            break;
        case 2:
            sub_runes[0] = rune[0]
            sub_runes[1] = rune[1]
            break;
        case 3:
            sub_runes[0] = rune[0]
            sub_runes[2] = rune[1]
            sub_runes[1] = rune[2]
            break;
        default:
            console.error(`Invalid length for rune ${sigil.length}, max 3`);
    }
    return sub_runes;
}

function drawRadialRune(ctx, rune, radius, center, angle, size) {
    var sub_runes = breakupRune(rune);
    var top = radius + size;
    var rad = top;
    for (var i = 0; i < sub_runes.length; i++) {
        drawRadialSubRune(ctx,sub_runes[i],rad,center,angle,size);
        rad -= size;
    }
}


//Maybe do a translate then scale then rotate then translate
function getRadialPoint(radius, center, angle, size, x, y) {
    //0 is the leftmost/topmost point
    //1 is the rightmost/bottommost point
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    x -= 0.5;
    y -= 0.5;
    x *= size;
    y *= size;
    x += radius;
    var xp = x * cos - y * sin;
    var yp = y * cos + x * sin;
    // var cx = center + radius*cos;
    // var cy = center + radius*sin;
    x = xp + center;
    y = yp + center;
    return {
        "x": x,
        "y": y,
    };
}


function drawRadialSubRune(ctx, subrune, radius, center, angle, size) {
    if (subrune != ' ') {
        if (font[subrune] == undefined || font[subrune].length == 0) {
            ctx.beginPath();
            var a = getRadialPoint(radius,center,angle,size,0,0);
            var b = getRadialPoint(radius,center,angle,size,0,1);
            var c = getRadialPoint(radius,center,angle,size,1,1);
            var d = getRadialPoint(radius,center,angle,size,1,0);
            ctx.moveTo(a.x,a.y);
            ctx.lineTo(b.x,b.y);
            ctx.lineTo(c.x,c.y);
            ctx.lineTo(d.x,d.y);
            ctx.lineTo(a.x,a.y);
            ctx.stroke();
        } else {
            var char = font[subrune];
            for (var i = 0; i < char.length; i++) {
                var stroke = char[i];
                ctx.beginPath();
                if (stroke.type == "arc") {
                    var center = getRadialPoint(radius,center,angle,size,stroke.x,stroke.y);
                    var theta = (-stroke.theta)*180/Math.PI;
                    var len = (-stroke.length)*180/Math.PI;
                    var ccw = len < 0;
                    theta += angle;
                    if (ccw) {
                        console.log("ARC: ", center.x,center.y,stroke.radius*size,theta+len,theta);
                        ctx.arc(center.x,center.y,stroke.radius*size,theta+len,theta);
                    } else {
                        console.log("ARC: ", center.x,center.y,stroke.radius*size,theta,theta+len);
                        ctx.arc(center.x,center.y,stroke.radius*size,theta,theta+len);
                    }
                } else if (stroke.type == "line") {

                }
                ctx.stroke();
            }
        }
    }
}