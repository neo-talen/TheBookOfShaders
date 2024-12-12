
#include "../common/common_all.glsl"



// todo 遍历函数

void main() {
    u_time = u_time * 0.1;

    float fract_time = fract(u_time) * 4;  // 0 - 4;
    vec2[] grid_list = {
            vec2(1., 1.),
            vec2(1., 2.),
            vec2(2., 2.),
            vec2(2., 1.),
    };

    vec2 grid = mix(grid_list[int(fract_time)], grid_list[mod(int(fract_time) + 1, 4.)], fract_time - int(fract_time));
    vec2 st;
    vec2 cell_idx;
    prepare_grid(grid, st, cell_idx);

    // cell_idx += (vec2(1.0) / grid);  // 让左下角从1,1开始，因为一些计算函数*0会没有变化
    // ----------- 操作每个格子

    vec3 cell_base_color = vec3(.9);


    float diagonal = .0 * cell_idx.x + cell_idx.y + 0.1;  // y = x 对角线，格子延y=x对角线分批次（1，2）格子和（2,1）格子的这个值是一样的

    float variable_size = 1.;  // abs(sin(u_time + diagonal));

    // 画中心正方形
    vec2 center = vec2(.5);
    float half_size = 0.35 * variable_size + 0.1;  // [0.1, 0.4]

    float is_in_box = draw_square(st, center, vec2(half_size));
   //  float is_in_circle = draw_sphere(st, center, half_size);
    float is_in_circle = sdf_sphere(st, center, half_size);
    float is_in_triangle = draw_triangle(st, center, center + vec2(half_size), center - vec2(half_size, -half_size));

    vec3 box_color = vec3(cell_idx, .5);

    // 最终颜色
    vec3 finale_color = mix(cell_base_color, box_color, 1. - is_in_triangle);

    gl_FragColor = vec4(finale_color, 1.);
}
