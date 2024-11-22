// 三角函数

#ifdef GL_ES
precision mediump float;
#endif

#define PI 1.  // 3.14159265359
#define PI_2 1.  // 6.28318530718

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
	// st.x += 0.5;  // fract(u_time * 0.1) * 1.;
	// 理解加深，任何函数都有简略形式，如y = 2x + 1的简略形式其实是y = x, 2和1，分别是x和y上的缩放和平移，
	//			跟常规的计算方程 y = 2 * x + 1的正向求解不同，shader里是对xy坐标系做变化后，计算y=x。
	//		shader里所有很多的动画也都是操作xy坐标系来实现，这样方程侧不用改动。
	//		例外：本身需要有变化的点，都自己做一下变化，通过矩阵

	vec3 color = vec3(0.5804, 0.5686, 0.5686);
	float smooth_rate = 0.2;
	
	// x-y axis
	color = mix(color, vec3(1., 0., 0.), smooth_point(st, 0., smooth_rate * 0.1));
	color = mix(color, vec3(0., 1.0, 0.0), smooth_point(vec2(st.y, st.x), 0., smooth_rate * 0.1));

	float x_axis = 0.;

	// pow
	float y = pow(st.x * PI_2, 2.);
	color = mix(color, vec3(0., 1., 0.), smooth_point(st, y, smooth_rate));

	// exp
	y = exp(st.x * PI_2);
	color = mix(color, vec3(0.0549, 0.1098, 0.9059), smooth_point(st, y, smooth_rate));

	// log
	y = log(st.x * PI_2);
	color = mix(color, vec3(1., 0., 1.), smooth_point(st, y, smooth_rate));

	// exp2
	y = exp2(st.x * 2.);
	color = mix(color, vec3(1.0, 0.0235, 0.0235), smooth_point(st, y, smooth_rate * 1.));

	// log2
	y = log2(st.x * 2.);
	color = mix(color, vec3(1.0, 0.0235, 0.0235), smooth_point(st, y, smooth_rate * 1.));

	// sqrt
	y = sqrt(st.x * 2.) - 1.0;
	color = mix(color, vec3(0.1216, 1.0, 0.0235), smooth_point(st, y, smooth_rate * 1.));

	gl_FragColor = vec4(color, 1.0);
}

