
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


// ----------------------------------------------



/* Shape 2D arc */
float sArc(in vec2 p, in float w, in float s, in float e) {    
    float a = distance(p, w * 0.5 * vec2(cos(s), sin(s)));
    float x = -PI;
    p *= mat2(cos(x - s), -sin(x - s), sin(x - s), cos(x - s));
    float b = clamp(atan(p.y, p.x), x, x + e);
    b = distance(p, w * 0.5 * vec2(cos(b), sin(b)));
    return min(a, b) * 2.0;
}
// float arc(in vec2 p, in float w, in float s, in float e, in float t) {
//     float d = sArc(p, w, s, e);
//     return stroke(d, t);
// }

/* Easing Back In equation */
/* Adapted from Robert Penner easing equations */
float easeBackIn(float t) {
    float s = 1.70158;
    return t * t * ((s + 1.0) * t - s);
}

vec3 get_scaner(in vec3 base_color)
{
    vec2 uv = (-u_resolution.xy + 2.0 * gl_FragCoord.xy) / u_resolution.y;
    vec2 uv2 = uv;
    //Asin a + B sin 2a +C sin 3a +D sin 4a
    uv2.x += u_resolution.x/u_resolution.y;
    uv2.x -= 2.0*mod(u_time, 1.0*u_resolution.x/u_resolution.y);
    float width = -(1.0/(25.0*uv2.x));
   	vec3 l = width * base_color;
    return l;
}

// ----------------------------------------------

float smooth_point(vec2 st, float target_y, float smoot_half)
{
	return smoothstep(target_y - smoot_half, target_y, st.y) - 
	smoothstep(target_y, target_y + smoot_half, st.y);
}

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st *= 2.2;
    st.y -= 1.;
    float y = easeBackIn(smoothstep(.3, 0.8, st.x));
    float cur_left_x = fract(u_time) * 2.2;
    float cur_right_x = cur_left_x + 0.3;

    // y *= step(cur_left_x, st.x) * (1. - step(cur_right_x, st.x));

    // y = y * sin(u_time);
	vec3 color = vec3(0.9608, 0.3882, 0.0588);

	color = mix(color, vec3(0., 1., 0.), smooth_point(st, y, 0.01));
    vec3 l = get_scaner(vec3(1.0, 3.0, 2.))* 2.;
	gl_FragColor = vec4(vec3(smooth_point(st, y, 0.03), .0, 0.) * l, 1.0);
}

