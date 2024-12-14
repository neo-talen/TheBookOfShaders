
// 中心扩散动画 带光照版
#include "../common/common_all.glsl"

vec3 direction_light = vec3(1.);


void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st = (st - 0.5) * 2;

    vec2 center = vec2(.0);

    vec2 direct_2d = st - center;
    float dis = length(direct_2d);

    float height = cos(-u_time + dis * 20.0) * 0.3 + 0.3;
    float normal = vec3(normalize(direct_2d).xy, sin(-u_time));

    vec3 cur_color = vec3(cos(-u_time + dis * 20.) * 0.3 + 0.3, 1., 1.);

    // 最终颜色
    vec3 finale_color = cur_color;

    gl_FragColor = vec4(finale_color, 1.);
}
