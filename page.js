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
var font = require("font.json");
function splitRunes(runes) {
    runes = runes.toUpperCase();
    runes = runes.split('.');
    var new_runes = []
    runes.forEach(
        rune => rune.split(/(\s)/).forEach(
        element => {
            if (element.length > 0) new_runes.push(element);
        })
    );
    return new_runes;
}

function createSigil() {
    var canvas = document.getElementById('canvas')
    var condition = "a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z"
    var condition_runes = splitRunes(condition);
    var action = "ex.plode"
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
        var radius_inner = radius_outer * 0.7;
        var maximum_height_outer = (radius_outer - radius_inner - (7 * scale)) * 0.95;
        var maximum_height_inner = (Math.SQRT1_2 * (radius_inner - (7 * scale/2))) * 0.95;
        var maximum_width_outer = maximum_height_outer / 9; //Divided by 9 as there are 9 square spaces in a rune
        var maximum_spaced_outer = maximum_width_outer * RUNE_MARGIN //Give 20% spacing between runes ... this may be increased later
        var circumsigil = Math.PI*2 * (radius_inner + (7 * scale/2));
        var possible_width_outer = circumsigil/condition_runes.length;
        var oversized = possible_width_outer > maximum_spaced_outer;
        var width_spaced = oversized ? maximum_spaced_outer : possible_width_outer;
        var true_width = width_spaced / RUNE_MARGIN;

        ctx.lineWidth = 7 * scale;
        ctx.beginPath();
        if (!oversized) {
            ctx.arc(center,center,radius_outer,CONDITION_START,CONDITION_START+Math.PI*2);
            ctx.arc(center,center,radius_inner,CONDITION_START,CONDITION_START+Math.PI*2);
        } else {
            var percentage = (width_spaced * condition_runes.length)/circumsigil;
            var offset = 2*Math.PI * percentage;
            var end = CONDITION_START + offset;
            var radius_center = (radius_outer + radius_inner) / 2;
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





        ctx.lineWidth = 5 * scale;

    }
}

function breakupRune(rune) {
    var sub_runes = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    switch (rune.length) {
        case 0:
            break;
        case 1:
            sub_runes[4] = rune[0]
            break;
        case 2:
            sub_runes[3] = rune[0]
            sub_runes[4] = rune[1]
            break;
        case 3:
            sub_runes[3] = rune[0]
            sub_runes[5] = rune[1]
            sub_runes[4] = rune[2]
            break;
        case 4:
            sub_runes[2] = rune[0]
            sub_runes[5] = rune[1]
            sub_runes[3] = rune[2]
            sub_runes[4] = rune[3]
            break;
        case 5:
            sub_runes[2] = rune[0]
            sub_runes[6] = rune[1]
            sub_runes[3] = rune[2]
            sub_runes[5] = rune[3]
            sub_runes[4] = rune[4]
            break;
        case 6:
            sub_runes[1] = rune[0]
            sub_runes[6] = rune[1]
            sub_runes[2] = rune[2]
            sub_runes[5] = rune[3]
            sub_runes[3] = rune[4]
            sub_runes[4] = rune[5]
            break;
        case 7:
            sub_runes[1] = rune[0]
            sub_runes[7] = rune[1]
            sub_runes[2] = rune[2]
            sub_runes[6] = rune[3]
            sub_runes[3] = rune[4]
            sub_runes[5] = rune[5]
            sub_runes[4] = rune[6]
            break;
        case 8:
            sub_runes[0] = rune[0]
            sub_runes[7] = rune[1]
            sub_runes[1] = rune[2]
            sub_runes[6] = rune[3]
            sub_runes[2] = rune[4]
            sub_runes[5] = rune[5]
            sub_runes[3] = rune[6]
            sub_runes[4] = rune[7]
            break;
        case 9:
            sub_runes[0] = rune[0]
            sub_runes[8] = rune[1]
            sub_runes[1] = rune[2]
            sub_runes[7] = rune[3]
            sub_runes[2] = rune[4]
            sub_runes[6] = rune[5]
            sub_runes[3] = rune[6]
            sub_runes[5] = rune[7]
            sub_runes[4] = rune[8]
            break;
        default:
            console.error(`Invalid length for rune ${sigil.length}`);
    }
    return sub_runes;
}

function drawRadialRune(ctx, rune, radius, center, angle, angular_width, radial_size) {
    var sub_runes = breakupRune(rune);

}

function interpRadialPoint(radius, center, angle, angular_width, size, x, y) {
    var a0 = angle - (angular_width)/2;
    var a = a0 + (x*angular_width);
    var r0 = radius - (size/2);
    var r = radius + y * size;
    var x = center + (Math.cos(a) * r);
    var y = center + (Math.sin(a) * r);

}


function drawRadialSubRune(ctx, subrune, radius, center, angle, angular_width, size) {
    var top_left_x = Math.cos(angle - (angular_width/2)) + center * (radius + size/2);
    var top_right_x = Math.cos(angle + (angular_width/2) + center * (radius + size/2));
    var bottom_left_x = Math.cos(angle - (angular_width/2) + center * (radius - size/2));
    var bottom_right_x = Math.cos(angle - (angular_width/2) + center * (radius - size/2));

}