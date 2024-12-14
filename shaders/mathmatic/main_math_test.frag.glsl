
#include "../common/common_all.glsl"
#include "math_all.glsl"


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    float anim_y = abs(fract(u_time * 1.));

    float final_y = 1.0;
    final_y *= quadratic_bezier(st.x, vec2(0.25, 0.75));
    final_y *= cubic_bezier(st.x, vec2(0.25, anim_y), vec2(0.75, 1 - anim_y));

    vec3 bg_color = vec3(st.x);
    vec3 point_color = vec3(.0, 1., 0.);

    // 最终颜色
    vec3 finale_color = mix(bg_color, point_color, draw_point_y(st, final_y, 0.01));

    gl_FragColor = vec4(finale_color, 1.);
}
