#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float smooth_point(vec2 st, float target_y, float smoot_half)
{
	return smoothstep(target_y - smoot_half, target_y, st.y) - 
	smoothstep(target_y, target_y + smoot_half, st.y);
}

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;

    float y = smoothstep(.0, 1., st.x);
    
	vec3 color = vec3(0.9804, 0.0471, 0.0471);

	color = mix(color, vec3(0., 1., 0.), smooth_point(st, y, 0.05));

	gl_FragColor = vec4(color, 1.0);
}

