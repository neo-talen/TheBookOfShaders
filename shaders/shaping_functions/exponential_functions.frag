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
	return smoothstep(target_y - smoot_half, target_y, st.y) - smoothstep(target_y, target_y + smoot_half, st.y);
}



void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;
	st -= 0.5;
	st *= vec2(2., 6.);
	st.x += fract(u_time * 0.1) * 1.;
	// 理解加深，任何函数都有简略形式，如y = 2x + 1的简略形式其实是y = x, 2和1，分别是x和y上的缩放和平移，
	//			跟常规的计算方程 y = 2 * x + 1的正向求解不同，shader里是对xy坐标系做变化后，计算y=x。
	//		shader里所有很多的动画也都是操作xy坐标系来实现，这样方程侧不用改动。
	//		例外：本身需要有变化的点，都自己做一下变化，通过矩阵

	vec3 color = vec3(0.5804, 0.5686, 0.5686);
	float smooth_rate = 0.2;
	
	// sin
	float sin_y = sin(st.x * PI_2);
	color = mix(color, vec3(0., 1., 0.), smooth_point(st, sin_y, smooth_rate));

	// cos
	float cos_y = cos(st.x * PI_2);
	color = mix(color, vec3(0.0549, 0.1098, 0.9059), smooth_point(st, cos_y, smooth_rate));

	// tan
	float tan_y = tan(st.x * PI_2);
	color = mix(color, vec3(1., 0., 1.), smooth_point(st, tan_y, smooth_rate));

	// asin
	float asin_y = asin(st.x * 2.);
	color = mix(color, vec3(1.0, 0.0235, 0.0235), smooth_point(st, asin_y, smooth_rate * 1.));

	// acos
	float acos_y = acos(st.x * 2.);
	color = mix(color, vec3(1.0, 0.0235, 0.0235), smooth_point(st, acos_y, smooth_rate * 1.));

	// atan
	float atan_y = atan(st.x * 2.) - 1.0;
	color = mix(color, vec3(0.1216, 1.0, 0.0235), smooth_point(st, atan_y, smooth_rate * 1.));

	gl_FragColor = vec4(color, 1.0);
}

