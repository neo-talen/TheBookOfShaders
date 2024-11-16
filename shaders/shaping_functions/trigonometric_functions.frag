// 三角函数

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define PI_2 6.28318530718

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
    st -= 0.5;
    st *= 2.;
    // st.x += u_time;

    float sin_y = sin(st.x * PI_2);
    
	vec3 color = vec3(0.5804, 0.5686, 0.5686);

	color = mix(color, vec3(0., 1., 0.), smooth_point(st, sin_y, 0.05));

    float cos_y = cos(st.x * PI_2);
    color = mix(color, vec3(0.0549, 0.1098, 0.9059), smooth_point(st, cos_y, 0.05));



	gl_FragColor = vec4(color, 1.0);
}

