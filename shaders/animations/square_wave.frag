
#include "../common/common_all.glsl"




void main() {

    vec2 grid = vec2(4., 4.);
    vec2 st;
    vec2 cell_idx;
    prepare_grid(grid, st, cell_idx);

    // cell_idx += (vec2(1.0) / grid);  // 让左下角从1,1开始，因为一些计算函数*0会没有变化
    // ----------- 操作每个格子

    vec3 cell_base_color = vec3(.9);

    float diagonal = cell_idx.x + cell_idx.y + 0.1;  // y = x 对角线，格子延y=x对角线分批次（1，2）格子和（2,1）格子的这个值是一样的

    // 画中心正方形
    vec2 center = vec2(.5);
    float half_size = 0.35 * (abs(sin(u_time + diagonal))) + 0.1;  // [0.1, 0.4]
    vec2 left_btm = center - vec2(half_size);
    vec2 right_top = center + vec2(half_size);

    float outside_box = step(left_btm.x, st.x) * step(left_btm.y, st.y) * (1. - step(right_top.x, st.x)) * (1. - step(right_top.y, st.y));

    vec3 box_color = vec3(cell_idx, .5);

    gl_FragColor = vec4(mix(cell_base_color, box_color, outside_box), 1.);
}
