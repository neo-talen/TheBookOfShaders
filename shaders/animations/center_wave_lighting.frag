
// 中心扩散动画 带光照版
#include "../common/common_all.glsl"

vec3 direction_light = vec3(1.);
vec3 light_color = vec3(.0, 1., 0.);

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st = (st - 0.5) * 4;

    vec2 st_mouse = u_mouse.xy / u_resolution.xy;
    st_mouse = (st_mouse - 0.5) * 4.;  // [-2, 2]

    vec2 center = vec2(.0);

    vec2 direct_2d = st - center;
    float radius = length(direct_2d);

    float height = cos(-u_time + radius * 8.);
    vec3 frag_pos = vec3(st.x + center.x, st.y + center.y, height);
    vec3 dir_1 = vec3(radius * radius / st.x, .0, .0) - vec3(st.x, st.y, .0);
    // vec3 dir_2 =
    vec3 frag_normal = normalize(vec3(, height));

     vec3 light_color = vec3(1.0, 1.0, 1.0);

    // 点光源
    vec3 light_pos = vec3(st_mouse.x * 2., st_mouse.y * 2., 4.);  // vec3(fract(u_time * 0.2) * 20. - 5., 0., 3.0);

    vec3 light_direction = normalize(light_pos - frag_pos);

    vec3 camer_pos = vec3(0., .0, 8.);

    // 漫反射
    float diff = max(dot(frag_normal, light_direction), .0);
    vec3 diffuse = diff * light_color * 0.3;

    // 环境光
    float ambient_strenth = 0.2;  // 环境光强度
    vec3 ambient_light = light_color * ambient_strenth;
    vec3 bg_plane_color = vec3(0.1);

    // 镜面光
    float specular_strength = 0.9;  // 10. * abs(sin(u_time));  // 镜面光反射强度
    vec3 view_dir = normalize(camer_pos - frag_pos);
    vec3 reflect_dir = reflect(-light_direction, frag_normal);
    float spec = pow(max(dot(view_dir, reflect_dir), 0.0), 32.);
    vec3 specular = specular_strength * spec * light_color;

    // 最终颜色
    vec3 finale_color = vec3(0.2, 1., 1.) * (ambient_light + diffuse + specular);

    gl_FragColor = vec4(finale_color, 1.);
}
