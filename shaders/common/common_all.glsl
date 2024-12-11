
#ifndef COMMON_ALL_GLSL
#define COMMON_ALL_GLSL
#endif

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define PI_2 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#include "common_functions.glsl"

// ------------------------------------------------------- 画点
float can_draw_point_x(vec2 st, float target_point_x, float smooth_factory)
{
    // can_draw_point的简化版本，减少一定程度的计算开销

    // st： 当前坐标位置
    // target_point_x: 要画的点的位置的x值
    // smooth_factory: 要画的点的精度范围

    // return: 返回值为 [0, 1] 表示当前坐标要画这个点的百分比：0表示不画，1表示画

    return smoothstep(target_point_x - smooth_factory, target_point_x, st.x) - smoothstep(target_point_x, target_point_x + smooth_factory, st.x);
}

float can_draw_point_y(vec2 st, float target_point_y, float smooth_factory)
{
    // can_draw_point的简化版本，减少一定程度的计算开销

    // st： 当前坐标位置
    // target_point_y: 要画的点的y值
    // smooth_factory: 要画的点的精度范围

    // return: 返回值为 [0, 1] 表示当前坐标要画这个点的百分比：0表示不画，1表示画

    return smoothstep(target_point_y - smooth_factory, target_point_y, st.y) - smoothstep(target_point_y, target_point_y + smooth_factory, st.y);
}

float can_draw_point(vec2 st, vec2 target_point, float smooth_factory)
{
    // st： 当前坐标位置
    // target_point: 要画的点的位置
    // smooth_factory: 要画的点的精度范围

    // return: 返回值为 [0, 1] 表示当前坐标要画这个点的百分比：0表示不画，1表示画

    float sdf_y = smoothstep(target_point.y - smooth_factory, target_point.y, st.y) - smoothstep(target_point.y, target_point.y + smooth_factory, st.y);
    float sdf_x = smoothstep(target_point.x - smooth_factory, target_point.x, st.x) - smoothstep(target_point.x, target_point.x + smooth_factory, st.x);
    return sdf_x * sdf_y;
}

// -----------------------------------------------------------------------



// ------------------------------------------------------ 格子划分
void prepare_grid(vec2 grid, out vec2 cell_st, out vec2 cell_idx)
{
    // 将屏幕划分为grid.x * grid.y个格子，返回每个格子当前像素点使用的st和所在格子的索引（左下角为0，0）

    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 st_all = st * grid;

    cell_st = fract(st_all);
    cell_idx = floor(st_all) / grid;
}
