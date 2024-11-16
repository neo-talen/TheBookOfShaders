
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
float arc(in vec2 p, in float w, in float s, in float e, in float t) {
    float d = sArc(p, w, s, e);
    return stroke(d, t);
}





// ----------------------------------------------

float smooth_point(vec2 st, float target_y, float smoot_half)
{
	return smoothstep(target_y - smoot_half, target_y, st.y) - 
	smoothstep(target_y, target_y + smoot_half, st.y);
}




void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;

    float y = smoothstep(.0, 1., st.x);
    
	vec3 color = vec3(0.9608, 0.3882, 0.0588);

	color = mix(color, vec3(0., 1., 0.), smooth_point(st, y, 0.05));

	gl_FragColor = vec4(color, 1.0);
}

