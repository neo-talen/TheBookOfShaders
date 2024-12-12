#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;

	vec3 color = vec3(1.);

	float sep_line = st.x;
	sep_line = st.y;
	// sep_line = distance(vec2(st.x, 0.), vec2(0., st.y));  // 该点
	sep_line = distance(st, vec2(.5));  // 该点到中心点的距离值

	// 本质上就是基于点的位置和一系列信息，给该点计算出一个数值，依据这个数值去决定该点的表现
	// NOTE: 如果要画正方形，需要一个vec2

	float loop_moving = 1.;
	sep_line = loop_moving * fract(sep_line * sin(u_time));

	// 依据该点的计算出来的数值，来决定颜色值
	color = mix(color, vec3(0.7294, 0.9804, 0.0471), step(0.2, sep_line));
	color = mix(color, vec3(0.0, 0.102, 1.0), step(0.4, sep_line));
	color = mix(color, vec3(0.9137, 0.0353, 0.1804), step(0.6, sep_line));
	color = mix(color, vec3(0.8745, 0.5608, 0.4392), step(0.8, sep_line));
	color = mix(color, vec3(0., 1., 0.), step(1., sep_line));

	gl_FragColor = vec4(color, 1.0);
}

