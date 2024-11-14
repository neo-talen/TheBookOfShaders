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
    
	gl_FragColor = vec4(vec3(p, .1, .1), 1.0);
}

