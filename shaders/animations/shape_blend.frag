
// 圆 和正三角形融合
#include "../common/common_all.glsl"




void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st = (st - 0.5) * 4.;  // [-2, 2]

    vec2 st_mouse = u_mouse.xy / u_resolution.xy;
    st_mouse = (st_mouse - 0.5) * 4.;  // [-2, 2]

    vec2 center = vec2(.0);

    float sphere = sdf_sphere(st, 1.0);
    float equal_tri = sdf_equilateral_triangle(st, 1.);

    // 最终颜色
    vec3 bg_plane_color = vec3(0.2);
    vec3 sphere_color = vec3(1.);
    float sig = sign(sin(u_time * 10.));
    float fact = ((sig * (fract(u_time * 10. / PI) - 0.5)) + 0.5);
    vec3 finale_color = mix(bg_plane_color, sphere_color, abs(mix(sphere, equal_tri, fact)));

    gl_FragColor = vec4(finale_color, 1.);
    // gl_FragColor = vec4(finale_color, 1.);
}
