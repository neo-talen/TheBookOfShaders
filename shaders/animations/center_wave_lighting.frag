
// 中心扩散动画 带光照版
#include "../common/common_all.glsl"

vec3 direction_light = vec3(1.);
vec3 light_color = vec3(.0, 1., 0.);

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st = (st - 0.5) * 4.;

    vec2 st_mouse = u_mouse.xy / u_resolution.xy;
    st_mouse = (st_mouse - 0.5) * 4.;  // [-2, 2]

    vec2 center = vec2(0.0);

    vec2 direct_2d = st - center;
    float dis_to_center = length(direct_2d);
    float x = -u_time + dis_to_center * 16.;
    // float approximate_center = floor((st.x + center.x) / PI) * PI;

    float height = cos(x);
    float much_PI_fac = floor((x + PI / 2.) / PI);

    float sig = much_PI_fac;  // 奇数个much_PI_fac则是-1

    while(sig > 0)
    {
        sig -= 2.;
    }
    sig *= 2.;
    sig -= 1.;

    float much_PI = much_PI_fac * PI;
    float factory = much_PI / x;

    vec3 frag_pos = vec3(st.x + center.x, st.y + center.y, height);

    vec3 approximate_center = vec3(frag_pos.x * factory, frag_pos.y * factory, .0);

    // vec3 dir_1 = vec3(radius * radius / st.x, .0, .0) - vec3(st.x, st.y, .0);
    // vec3 dir_2 =
    vec3 frag_normal = normalize((frag_pos - approximate_center) * sig);

     vec3 light_color = vec3(1.0, 1.0, 1.0);

    // 点光源
    vec3 light_pos = vec3(st_mouse.x, st_mouse.y, 8.);  // vec3(fract(u_time * 0.2) * 20. - 5., 0., 3.0);
    vec3 light_direction = light_pos - frag_pos;
    float light_distance = length(light_direction);
    light_direction = normalize(light_direction);

    float max_light_distance = 3.;
    float light_density = 1.; //  - smoothstep(1., max_light_distance, light_distance) / max_light_distance;

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
    float spec = pow(max(dot(view_dir, reflect_dir), 0.0), 64.);

    vec3 specular = specular_strength * spec * light_color * light_density;

    // 最终颜色
    vec3 finale_color = vec3(0.2, 1., 1.) * (ambient_light + diffuse + specular);

    gl_FragColor = vec4(finale_color, 1.);
}
