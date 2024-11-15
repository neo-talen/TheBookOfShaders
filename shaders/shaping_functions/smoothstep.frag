#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;

    float p = smoothstep(.0, 1., st.x);
    
	vec2 center = vec2(0.5);
	vec2 dir = center - st;
	float theata = atan(dir.y, dir.x);

	gl_FragColor = vec4(vec3(1.-sin(theata)), 1.0);
}

