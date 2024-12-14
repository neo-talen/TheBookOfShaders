
// 中心扩散动画
#include "../common/common_all.glsl"


void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st = (st - 0.5) * 2;

    vec2 center = vec2(.0);

    float dis = length(st - center);

    vec3 cur_color = vec3(cos(-u_time * 5 + dis * 20.) * 0.3 + 0.3, abs(sin(u_time)), 1.);

    // 最终颜色
    vec3 finale_color = cur_color;

    gl_FragColor = vec4(finale_color, 1.);
}
