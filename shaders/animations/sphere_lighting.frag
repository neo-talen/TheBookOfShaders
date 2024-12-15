
// 圆 带光照版
#include "../common/common_all.glsl"



float radius = 1.0;
void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st = (st - 0.5) * 4.;  // [-2, 2]

    vec2 center = vec2(.0);

    vec2 direct_2d = st - center;
    vec3 sphere_3d = vec3(st.x, st.y, sqrt(radius * radius - st.x * st.x - st.y * st.y));
    vec3 sphere_normal = normalize(sphere_3d);

    float dis = length(direct_2d);

    float in_sphere = draw_sphere(st, center, radius);

    vec3 st_3d = mix(vec3(st.x, st.y, 0.), sphere_3d, in_sphere);
    vec3 final_normal = normalize(mix(vec3(0., 0., 1.), sphere_normal, in_sphere));

    // 方向光没有高光？
    vec3 light_direction = vec3(1.);  // vec3(fract(u_time * 0.2) * 10. - 5., 0., 1.0);
    vec3 light_color = vec3(0.0, 1.0, .0);

    // 点光源
    vec3 light_pos = vec3(1.);  // vec3(fract(u_time * 0.2) * 20. - 5., 0., 3.0);

    light_direction = normalize(light_pos - st_3d);

    vec3 camer_pos = vec3(0., 2., 0.);

    // 漫反射
    float diff = max(dot(final_normal, light_direction), .0);
    vec3 diffuse = diff * light_color;

    // 环境光
    float ambient_strenth = 0.3;  // 环境光强度
    vec3 ambient_light = light_color * ambient_strenth;
    vec3 bg_plane_color = vec3(0.1);

    // 镜面光
    float specular_strength = 0.9;  // 10. * abs(sin(u_time));  // 镜面光反射强度
    vec3 view_dir = normalize(camer_pos - st_3d);
    vec3 reflect_dir = reflect(-light_direction, final_normal);
    float spec = pow(max(dot(view_dir, reflect_dir), 0.0), 2.);
    vec3 specular = specular_strength * spec * light_color;

    // 最终颜色
    vec3 sphere_color = vec3(1.);
    vec3 finale_color = mix(bg_plane_color, sphere_color, in_sphere);

    gl_FragColor = vec4(finale_color * (ambient_light + diffuse), 1.);
    // gl_FragColor = vec4(finale_color, 1.);
}
