#include "../common/common_all.glsl"

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;
	st -= 0.5;
	st *= vec2(2., 2.);
	// st.x += fract(u_time * 0.1) * 1.;

	vec3 color = vec3(0.5804, 0.5686, 0.5686);
	float smooth_rate = 0.02;

	float y = func_1(st.x);
	color = mix(color, vec3(0., 1., 0.), can_draw_point(st, vec2(st.x, y), smooth_rate));

	gl_FragColor = vec4(color, 1.0);
}

