function clear() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// const CONDITION_START = -3*Math.PI/4;
const RUNE_MARGIN = 1.05;
const MAROON = 'rgb(153,0,0)';
const CRIMSON = 'rgb(220,20,60)';
var font = {};
fetch("https://raw.githubusercontent.com/cheese3660/cheese3660.github.io/main/font.json")
    .then(response => response.json())
    .then(json => {font = json;});
//Keep it embedded for testing
// font = {
//     "A": [
//         {
//             "type": "arc",
//             "x": 1.15,
//             "y": 0.5,
//             "theta": 135,
//             "length": 90,
//             "radius": 0.65
//         }
//     ],
//     "B": [
//         {
//             "type": "arc",
//             "x": -0.15,
//             "y": 0.5,
//             "theta": 45,
//             "length": -90,
//             "radius": 0.65
//         }
//     ],
//     "C": [
//         {
//             "type": "line",
//             "x0": 0.5,
//             "x1": 0.5,
//             "y0": 0.95,
//             "y1": 0.05,
//         }
//     ],
//     "D": [
//         {
//             "type": "arc",
//             "x": 0.5,
//             "y": -0.15,
//             "theta": 45,
//             "length": 90,
//             "radius": 0.65
//         },
//         {
//             "type": "line",
//             "x0": 0.5,
//             "x1": 0.5,
//             "y0": 0.95,
//             "y1": 0.05,
//         }
//     ],
//     "E": [
//         {
//             "type": "arc",
//             "x": 0.5,
//             "y": 1.3,
//             "theta": 225,
//             "length": 90,
//             "radius": 0.65
//         },
//         {
//             "type": "arc",
//             "x": 0.5,
//             "y": 1,
//             "theta": 225,
//             "length": 90,
//             "radius": 0.65
//         },
//         {
//             "type": "line",
//             "x0": 0.5,
//             "x1": 0.5,
//             "y0": 0.95,
//             "y1": 0.05,
//         }
//     ],
//     "F": [
//         {
//             "type": "arc",
//             "x": 0.5,
//             "y": -0.15,
//             "theta": 45,
//             "length": 90,
//             "radius": 0.65
//         }
//     ],
//     "G": [
//         {
//             "type": "arc",
//             "x": 0.5,
//             "y": 1.15,
//             "theta": 225,
//             "length": 90,
//             "radius": 0.65
//         }
//     ],
//     "H": [
//         {
//             "type": "arc",
//             "x": 0.5+0.33587572106,
//             "y": 0.5-0.33587572106,
//             "theta": 90,
//             "length": 90,
//             "radius": 0.475
//         }
//     ],
//     "I": [
//         {
//             "type": "arc",
//             "x": 0.5,
//             "y": 0.85,
//             "theta": 0,
//             "length": 360,
//             "radius": 0.125
//         }
//     ],
//     "J": [
//         {
//             "type": "arc",
//             "x": 0.5,
//             "y": 0.15,
//             "theta": 0,
//             "length": 360,
//             "radius": 0.125
//         }
//     ],
//     "K": [
//         {
//             "type": "arc",
//             "x": 0.5-0.33587572106,
//             "y": 0.5-0.33587572106,
//             "theta": 90,
//             "length": -90,
//             "radius": 0.475
//         }
//     ],
//     "L": [
//         {
//             "type": "arc",
//             "x": 0.5+0.33587572106,
//             "y": 0.5+0.33587572106,
//             "theta": 180,
//             "length": 90,
//             "radius": 0.475
//         }
//     ],
//     "M": [
//         {
//             "type": "arc",
//             "x": 0.5-0.33587572106,
//             "y": 0.5+0.33587572106,
//             "theta": 270,
//             "length": 90,
//             "radius": 0.475
//         },
//         {
//             "type": "line",
//             "x0": 0.35,
//             "y0": 0.65,
//             "x1": 0.65,
//             "y1": 0.35,
//         }
//     ],
//     "N": [
//         {
//             "type": "arc",
//             "x": 0.5-0.33587572106,
//             "y": 0.5+0.33587572106,
//             "theta": 270,
//             "length": 90,
//             "radius": 0.475
//         }
//     ],
//     "O": [
//         {
//             "type": "line",
//             "x0": 0.3,
//             "x1": 0.7,
//             "y0": 0.7,
//             "y1": 0.3,
//         }
//     ],
//     "P": [
//         {
//             "type": "arc",
//             "x": 0.5+0.475*0.75,
//             "y": 0.5,
//             "theta": 90,
//             "length": 180,
//             "radius": 0.475*0.75
//         }
//     ],
//     "Q": [
//         {
//             "type": "arc",
//             "x": 0.5+0.33587572106,
//             "y": 0.5-0.33587572106,
//             "theta": 90,
//             "length": 90,
//             "radius": 0.475
//         },
//         {
//             "type": "line",
//             "x0": 0.35,
//             "y0": 0.65,
//             "x1": 0.65,
//             "y1": 0.35,
//         }
//     ],
//     "R": [
//         {
//             "type": "arc",
//             "x": 0.5-0.475*0.75,
//             "y": 0.5,
//             "theta": 90,
//             "length": -180,
//             "radius": 0.475*0.75
//         }
//     ],
//     "S": [
//         {
//             "type": "arc",
//             "x": 0.5,
//             "y": -0.25,
//             "theta": 45,
//             "length": 90,
//             "radius": 0.65
//         },
//         {
//             "type": "arc",
//             "x": 0.5,
//             "y": -0.05,
//             "theta": 45,
//             "length": 90,
//             "radius": 0.65
//         }
//     ],
//     "T": [
//         {
//             "type": "arc",
//             "x": 0.5,
//             "y": 1.15,
//             "theta": 225,
//             "length": 90,
//             "radius": 0.65
//         },
//         {
//             "type": "line",
//             "x0": 0.4,
//             "y0": 0.7,
//             "x1": 0.6,
//             "y1": 0.3,
//         }
//     ],
//     "U": [
//         {
//             "type": "arc",
//             "x": 0.5,
//             "y": 0.5-0.475*0.75,
//             "theta": 0,
//             "length": 180,
//             "radius": 0.475*0.75
//         }
//     ],
//     "V": [
//         {
//             "type": "arc",
//             "x": 0.5,
//             "y": 0.5-0.475*0.75,
//             "theta": 0,
//             "length": 180,
//             "radius": 0.475*0.75
//         },
//         {
//             "type": "line",
//             "x0": 0.5,
//             "x1": 0.5,
//             "y0": 0.75,
//             "y1": 0.25,
//         }
//     ],
//     "W": [
//         {
//             "type": "arc",
//             "x": 0.5,
//             "y": 0.5-0.475*0.75,
//             "theta": 0,
//             "length": 180,
//             "radius": 0.475*0.75
//         },
//         {
//             "type": "line",
//             "x0": 0.4,
//             "x1": 0.4,
//             "y0": 0.75,
//             "y1": 0.25,
//         },
//         {
//             "type": "line",
//             "x0": 0.6,
//             "x1": 0.6,
//             "y0": 0.75,
//             "y1": 0.25,
//         }
//     ],
//     "X": [
//         {
//             "type": "arc",
//             "x": 0.25,
//             "y": 0.15,
//             "theta": 0,
//             "length": 360,
//             "radius": 0.125
//         }
//     ],
//     "Y": [
//         {
//             "type": "arc",
//             "x": 0.75,
//             "y": 0.15,
//             "theta": 0,
//             "length": 360,
//             "radius": 0.125
//         }],
//     "Z": [
//         {
//             "type": "arc",
//             "x": 0.5,
//             "y": 1.3,
//             "theta": 225,
//             "length": 90,
//             "radius": 0.65
//         },
//         {
//             "type": "arc",
//             "x": 0.5,
//             "y": 1,
//             "theta": 225,
//             "length": 90,
//             "radius": 0.65
//         }
//     ]
// };

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function xor(a,b) {
    return a? !b : b;
}
function coterminal(x) {
    var check = x % (2 * Math.PI);
    return check < 0 ? 2*Math.PI + check : check;
}

async function animate_arc(ctx, stroke, pps) {
    var prev_st = 0;
    var prev_et = 0;
    var steps;
    var dtheta;
    var pixels_per_frame = pps/60;
    if (pixels_per_frame < 3) pixels_per_frame = 3;
    var start = coterminal(stroke.start);
    var end = coterminal(stroke.end);
    if (start >= end) end += 2 *Math.PI;
    var len = Math.abs((end-start) * stroke.radius);
    var steps = Math.floor(len/pixels_per_frame);
    var dtheta = (end-start) / steps;
    var x = stroke.x;
    var y = stroke.y;
    var r = stroke.radius;
    var invert = end < start;
    for (var i = 0; i < steps; i++) {
        if (i == 0) {
            prev_st = stroke.start;
            prev_et = prev_st+dtheta;
            ctx.strokeStyle = CRIMSON;
            ctx.beginPath();
            ctx.arc(x,y,r,prev_st,prev_et,invert);
            ctx.stroke();
        } else {
            ctx.strokeStyle = MAROON;
            ctx.beginPath();
            ctx.arc(x,y,r,prev_st,prev_et,invert);
            ctx.stroke();
            prev_st = prev_et;
            prev_et += dtheta;
            ctx.strokeStyle = CRIMSON;
            ctx.beginPath();
            ctx.arc(x,y,r,prev_st,prev_et,invert);
            ctx.stroke();
        }
        await sleep(17);
    }

    ctx.strokeStyle = MAROON;
    ctx.beginPath();
    ctx.arc(x,y,r,stroke.start,stroke.end);
    ctx.stroke();
    await sleep(17);
}

async function animate_line(ctx, stroke, pps) {
    var prev_sx = 0;
    var prev_sy = 0;
    var prev_ex = 0;
    var prev_ey = 0;
    var len = Math.sqrt((stroke.sx-stroke.x)**2 + (stroke.sy-stroke.y)**2);
    var pixels_per_frame = pps/30;
    if (pixels_per_frame < 3) pixels_per_frame = 3;
    var steps = Math.floor(len/pixels_per_frame);
    var step_x = (stroke.x - stroke.sx)/steps;
    var step_y = (stroke.y - stroke.sy)/steps;
    for (var i = 0; i < steps; i++) {
        if (i == 0) {
            prev_sx = stroke.sx;
            prev_sy = stroke.sy;
            prev_ex = prev_sx+step_x;
            prev_ey = prev_sy+step_y;
            ctx.strokeStyle = CRIMSON;
            ctx.beginPath();
            ctx.moveTo(prev_sx,prev_sy);
            ctx.lineTo(prev_ex,prev_ey);
            ctx.stroke();
        } else {
            ctx.strokeStyle = MAROON;
            ctx.beginPath();
            ctx.moveTo(prev_sx,prev_sy);
            ctx.lineTo(prev_ex,prev_ey);
            ctx.stroke();
            prev_sx = prev_ex;
            prev_sy = prev_ey;
            prev_ex += step_x;
            prev_ey += step_y;
            ctx.strokeStyle = CRIMSON;
            ctx.beginPath();
            ctx.moveTo(prev_sx,prev_sy);
            ctx.lineTo(prev_ex,prev_ey);
            ctx.stroke();
        }
        await sleep(33);
    }
    ctx.strokeStyle = MAROON
    ctx.beginPath();
    ctx.moveTo(stroke.sx,stroke.sy);
    ctx.lineTo(stroke.x,stroke.y);
    ctx.stroke();

    await sleep(33);
}
async function animate(ctx, stroke, pps) {
    if (stroke.type == "line") {
        await animate_line(ctx,stroke,pps);
    } else {
        await animate_arc(ctx,stroke,pps);
    }
}

class Animator {
    constructor(context) {
        this.ctx = context;
        this.current_animation = []; //The current animation to be played
        this.x = 0.0;
        this.y = 0.0;
        this.empty = true;
    }

    begin() {
        this.x = 0.0;
        this.y = 0.0;
        this.current_animation = [];
        this.empty = true;
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
        this.empty = false;
    }
    arc(x,y,radius,start,end,ccw) {
        //Put in the current animation with those exact arguments
        var difx = this.x - radius * Math.cos(start);
        var dify = this.y - radius * Math.sin(start);
        if (!this.empty && (Math.abs(difx) > 1 || Math.abs(dify) > 1)) {
            this.lineTo(x + radius * Math.cos(start), y + radius * Math.sin(start));
        }
        var anim = {
            type: "arc",
            x: x,
            y: y,
            radius: radius,
            start: start,
            end: end,
            sx: this.x,
            sy: this.y
        }
        this.current_animation.push(anim);
        this.x = x + radius * Math.cos(end);
        this.y = y + radius * Math.sin(end);
        this.empty = false;
    }
    lineTo(x,y) {
        var anim = {
            type: "line",
            x: x,
            y: y,
            sx: this.x,
            sy: this.y,
        }
        this.current_animation.push(anim);
        this.x = x;
        this.y = y;
        this.empty = false;
    }


    async end(pixels_per_second) {
        for (var i = 0; i < this.current_animation.length; i++) 
            await animate(this.ctx, this.current_animation[i], pixels_per_second)
        this.x = 0.0;
        this.y = 0.0;
        this.current_animation = [];
        this.empty = true;
    }
}
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
    var new_runes = [];
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


async function createSigil() {
    var canvas = document.getElementById('canvas')
    var condition = document.getElementById('condition').value;
    var condition_runes = splitRunes(condition);
    var action = document.getElementById('action').value;
    var action_runes = splitRunes(action);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var anim = new Animator(ctx);
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
        var radius_scribe = radius_inner - (7 * scale/2);
        var maximum_height_outer = (radius_outer - radius_inner - (7 * scale)) * 0.95;
        var maximum_width_outer = maximum_height_outer / 3; //Divided by 9 as there are 9 square spaces in a rune
        var maximum_spaced_outer = maximum_width_outer //Give 20% spacing between runes ... this may be increased later
        var circumsigil = Math.PI*2 * (radius_inner + (7 * scale/2));
        var possible_width_outer = circumsigil/condition_runes.length;
        var oversized = possible_width_outer > maximum_spaced_outer;
        var width_spaced = oversized ? maximum_spaced_outer : possible_width_outer;
        var true_width = width_spaced;
        var radius_center = (radius_outer + radius_inner) / 2;
        var step_size = width_spaced/circumsigil;
        var step_angle = 2*Math.PI*step_size;
        var percentage = (width_spaced * (condition_runes.length))/circumsigil;
        var radial_percentage = 2 * Math.PI * percentage;
        var CONDITION_START = -Math.PI/2 - (radial_percentage/2) - 0.01;
        ctx.lineWidth = 7 * scale;
        if (!oversized) {
            // ctx.beginPath();
            anim.begin();
            anim.arc(center,center,radius_outer,CONDITION_START,CONDITION_START+Math.PI*2);
            anim.arc(center,center,radius_inner,CONDITION_START,CONDITION_START+Math.PI*2);
            // ctx.stroke();
            await anim.end(750);
        } else {
            // var percentage = (width_spaced * (condition_runes.length))/circumsigil;
            var end = CONDITION_START + radial_percentage + 0.02;
            // ctx.beginPath();
            anim.begin();
            anim.arc(center,center,radius_outer,CONDITION_START, end);
            anim.arc(center,center,radius_center,end,CONDITION_START);
            anim.moveTo(center + radius_outer * Math.cos(end), center + radius_outer * Math.sin(end));
            anim.arc(center,center,radius_outer,end,CONDITION_START+2*Math.PI);
            anim.arc(center,center,radius_inner,CONDITION_START,end);
            anim.moveTo(center + radius_center * Math.cos(end), center + radius_center * Math.sin(end));
            anim.arc(center,center,radius_inner,end,CONDITION_START+2*Math.PI);
            // ctx.stroke();
            await anim.end(750);
        }
        //for testing reasons
        // ctx.strokeStyle = 'rgb(255,255,255)';
        var current_angle = CONDITION_START + step_angle/2 + 0.01;
        var tick_angle = current_angle+step_angle/2;
        var tick_start = radius_outer - (0.4 * maximum_width_outer);
        ctx.lineWidth = 4 * scale;
        for (var i = 0; i < condition_runes.length - 1; i++) {
            var sin = Math.sin(tick_angle);
            var cos = Math.cos(tick_angle);
            var ex = radius_outer * cos + center;
            var ey = radius_outer * sin + center;
            var sx = tick_start * cos + center;
            var sy = tick_start * sin + center;
            anim.begin();
            anim.moveTo(sx,sy);
            anim.lineTo(ex,ey)
            await anim.end(1);
            tick_angle += step_angle;
        }
        ctx.lineWidth = 3 * scale;
        for (var i = 0; i < condition_runes.length; i++) {
            var rune = condition_runes[i];
            await drawRadialRune(anim, rune, radius_center, center, current_angle, true_width);
            current_angle += step_angle;
        }
        ctx.lineWidth = 5 * scale;
        var N = action_runes.length;
        var N3 = action_runes.length/3;
        var theta = Math.atan(N3);
        var height = 2*Math.cos(theta) *radius_scribe;
        console.log(height);
        var width = height*N3;
        var size = height/3;
        // var size2 = size * RUNE_MARGIN;
        var x_start = center - (width/2) + (size/2);
        var x = x_start;
        var y0 = center - (height/2) - (5 * scale/2);
        var y1 = center + (height/2) + (5 * scale/2);
        var x0 = center - (width/2) - (5 * scale/2);
        var x1 = center + (width/2) + (5 * scale/2);
        anim.begin();
        anim.moveTo(x0,y0);
        anim.lineTo(x1,y0);
        anim.lineTo(x1,y1);
        anim.lineTo(x0,y1);
        anim.lineTo(x0,y0);
        await anim.end(750);
        //Now draw the 2 marks on the side and the n marks on the top and bottom
        var offy = height/3;
        var offx = width/N;
        var rad_squared = radius_inner*radius_inner;
        var tooth_start_y = y0+offy;
        var tooth_start_x = x0+offx;
        for (var i = 0; i < 2; i++) {
            var yy = ((tooth_start_y)-center);
            var xa = radius_inner*Math.sqrt(1 - yy*yy/rad_squared) + center;
            var xb = -radius_inner*Math.sqrt(1 - yy*yy/rad_squared) + center;
            anim.begin();
            anim.moveTo(x1,tooth_start_y);
            anim.lineTo(xa,tooth_start_y);
            await anim.end(750);
            anim.begin();
            anim.moveTo(x0,tooth_start_y);
            anim.lineTo(xb,tooth_start_y)
            await anim.end(750);
            tooth_start_y += offy;
        }
        for (var i = 0; i < N-1; i++) {
            var xx = ((tooth_start_x)-center);
            var ya = radius_inner*Math.sqrt(1 - xx*xx/rad_squared) + center;
            var yb = -radius_inner*Math.sqrt(1 - xx*xx/rad_squared) + center;
            anim.begin();
            anim.moveTo(tooth_start_x, y1);
            anim.lineTo(tooth_start_x, ya);
            await anim.end(750);
            anim.begin();
            anim.moveTo(tooth_start_x, y0);
            anim.lineTo(tooth_start_x, yb);
            await anim.end(750);
            tooth_start_x += offx;
        }
        for (var i = 0; i < action_runes.length; i++) {
            await drawLinearRune(anim,action_runes[i],size, x, center);
            x += size;
        }
        //Idea a toothlike thing
        
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

async function drawRadialRune(ctx, rune, radius, center, angle, size) {
    var sub_runes = breakupRune(rune);
    var top = radius + size;
    var rad = top;
    for (var i = 0; i < sub_runes.length; i++) {
        await drawRadialSubRune(ctx,sub_runes[i],rad,center,angle,size);
        rad -= size;
    }
}

//Maybe do a translate then scale then rotate then translate
function getRadialPoint(radius, center, angle, size, x, y) {
    //0 is the leftmost/topmost point
    //1 is the rightmost/bottommost point
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var t = x;
    x = y;
    y = t;
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

async function drawRadialSubRune(anim, subrune, radius, center, angle, size) {
    if (subrune != ' ') {
        if (font[subrune] == undefined || font[subrune].length == 0) {
            anim.begin();
            var a = getRadialPoint(radius,center,angle,size,0,0);
            var b = getRadialPoint(radius,center,angle,size,0,1);
            var c = getRadialPoint(radius,center,angle,size,1,1);
            var d = getRadialPoint(radius,center,angle,size,1,0);
            anim.moveTo(a.x,a.y);
            anim.lineTo(b.x,b.y);
            anim.lineTo(c.x,c.y);
            anim.lineTo(d.x,d.y);
            anim.lineTo(a.x,a.y);
            anim.end(50);
        } else {
            var char = font[subrune];
            for (var i = 0; i < char.length; i++) {
                var stroke = char[i];
                await anim.begin();
                if (stroke.type == "arc") {
                    var _center = getRadialPoint(radius,center,angle,size,stroke.x,stroke.y);
                    var theta = (-(stroke.theta-90))*Math.PI/180;
                    var len = (-stroke.length)*Math.PI/180;
                    var ccw = len < 0;
                    theta += angle;
                    if (ccw) {
                        anim.arc(_center.x,_center.y,stroke.radius*size,theta+len,theta);
                    } else {
                        anim.arc(_center.x,_center.y,stroke.radius*size,theta,theta+len);
                    }
                } else if (stroke.type == "line") {
                    var start = getRadialPoint(radius,center,angle,size,stroke.x0,stroke.y0);
                    var end = getRadialPoint(radius,center,angle,size,stroke.x1,stroke.y1);
                    anim.moveTo(start.x,start.y);
                    anim.lineTo(end.x,end.y);
                }
                await anim.end(50);
            }
        }
    }
}

async function drawLinearRune(ctx, rune, size, x, y) {
    var sub_runes = breakupRune(rune);
    var top = y - size;
    for (var i = 0; i < sub_runes.length; i++) {
        await drawLinearSubRune(ctx,sub_runes[i],size,x,top);
        top += size;
    }
}

async function  drawLinearSubRune(anim, subrune, size, x, y) {
    if (subrune != ' ') {
        if (font[subrune] == undefined || font[subrune].length == 0) {
            var x0 = x - size/2;
            var x1 = x + size/2;
            var y0 = y - size/2;
            var y1 = y + size/2;
            anim.begin();
            anim.moveTo(x0,y0);
            anim.lineTo(x1,y0);
            anim.lineTo(x1,y1);
            anim.lineTo(x0,y1);
            anim.lineTo(x0,y0);
            await anim.end(300);
        } else {
            var char = font[subrune];
            for (var i = 0; i < char.length; i++) {
                var stroke = char[i];
                anim.begin();
                if (stroke.type == "arc") {
                    // var _center = getRadialPoint(radius,center,angle,size,stroke.x,stroke.y);
                    var _x = (stroke.x - 0.5)*size + x;
                    var _y = -(stroke.y - 0.5)*size + y;
                    var theta = (-(stroke.theta))*Math.PI/180;
                    var len = (-stroke.length)*Math.PI/180;
                    var ccw = len < 0;
                    if (ccw) {
                        anim.arc(_x,_y,stroke.radius*size,theta+len,theta);
                    } else {
                        anim.arc(_x,_y,stroke.radius*size,theta,theta+len);
                    }
                } else if (stroke.type == "line") {
                    var sx = (stroke.x0 - 0.5)*size + x;
                    var sy = -(stroke.y0 - 0.5)*size + y;
                    var ex = (stroke.x1 - 0.5)*size+x;
                    var ey = -(stroke.y1 - 0.5)*size+y;
                    console.log("LINE: ", sx,sy,ex,ey)
                    anim.moveTo(sx,sy);
                    anim.lineTo(ex,ey);
                }
                await anim.end(300);
            }
        }
    }
}