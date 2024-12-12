
#ifndef COMMON_DRAW_GLSL
#define COMMON_DRAW_GLSL
#endif

// 基本绘制函数
// 有两类，分别以draw_ 和 sdf_ 开头
// draw_xxx开头的函数，返回之为0. or 1. 1表示当前坐标需要绘制指定点，0-1的值为一定程度的过度值
// sdf_xxx开头的函数，返回到xxx的sdf值, 一般0表示边界，-1表示内部最远处，1表示外部最远处 TODO:

// ---------- 画点
float draw_point_x(vec2 st, float target_point_x, float smooth_factory)
{
    // draw_point的简化版本，减少一定程度的计算开销

    // st： 当前坐标位置
    // target_point_x: 要画的点的位置的x值
    // smooth_factory: 要画的点的精度范围

    // return: 返回值为 [0, 1] 表示当前坐标要画这个点的百分比：0表示不画，1表示画

    return smoothstep(target_point_x - smooth_factory, target_point_x, st.x) - smoothstep(target_point_x, target_point_x + smooth_factory, st.x);
}

float draw_point_y(vec2 st, float target_point_y, float smooth_factory)
{
    // draw_point的简化版本，减少一定程度的计算开销

    // st： 当前坐标位置
    // target_point_y: 要画的点的y值
    // smooth_factory: 要画的点的精度范围

    // return: 返回值为 [0, 1] 表示当前坐标要画这个点的百分比：0表示不画，1表示画

    return smoothstep(target_point_y - smooth_factory, target_point_y, st.y) - smoothstep(target_point_y, target_point_y + smooth_factory, st.y);
}

float draw_point(vec2 st, vec2 target_point, float smooth_factory)
{
    // st： 当前坐标位置
    // target_point: 要画的点的位置
    // smooth_factory: 要画的点的精度范围

    // return: 返回值为 [0, 1] 表示当前坐标要画这个点的百分比：0表示不画，1表示画

    float sdf_y = smoothstep(target_point.y - smooth_factory, target_point.y, st.y) - smoothstep(target_point.y, target_point.y + smooth_factory, st.y);
    float sdf_x = smoothstep(target_point.x - smooth_factory, target_point.x, st.x) - smoothstep(target_point.x, target_point.x + smooth_factory, st.x);
    return sdf_x * sdf_y;
}

// ----------- 画矩形
float draw_square(vec2 st, vec2 center, vec2 half_size)
{
    // 本质上返回一个值，1表示在矩形内，0表示在矩形外
    vec2 left_btm = center - vec2(half_size);
    vec2 right_top = center + vec2(half_size);

    float is_outside_box = step(left_btm.x, st.x) * step(left_btm.y, st.y) * (1. - step(right_top.x, st.x)) * (1. - step(right_top.y, st.y));
    return 1. - is_outside_box;
}

// ----------- 画圆
float draw_circle(vec2 st, vec2 center, float radius)
{
    // 本质上返回一个值，1表示在圆形内，0表示在圆形外
    float is_inside_circle = step(radius, length(st - center));
    return is_inside_circle;
}

// ----------- 画三角形
float draw_triangle(vec2 st, vec2 p1, vec2 p2, vec2 p3)
{
    // 本质上返回一个值，1表示在三角形内，0表示在三角形外
    float is_in_trianlge = 1.;

    vec2 d_p1 = p1 - st;
    vec2 d_p2 = p2 - st;
    vec2 d_p3 = p3 - st;

    vec2 d_p1_p2 = d_p1 + d_p2;
    vec2 d_p1_p3 = d_p1 + d_p3;
    vec2 d_p2_p3 = d_p2 + d_p3;
    is_in_trianlge = step(.0, dot(d_p1_p2, d_p1_p3) * dot(d_p1_p2, d_p2_p3) * dot(d_p2_p3, d_p1_p3));

    return is_in_trianlge;
}


// ------------------------------------------------------ 格子划分
void prepare_grid(vec2 grid, out vec2 cell_st, out vec2 cell_idx)
{
    // 将屏幕划分为grid.x * grid.y个格子，返回每个格子当前像素点使用的st和所在格子的索引（左下角为0，0）

    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 st_all = st * grid;

    cell_st = fract(st_all);
    cell_idx = floor(st_all) / grid;
}
