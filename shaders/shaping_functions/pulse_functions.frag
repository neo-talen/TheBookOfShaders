
// 脉冲函数
#include "../common/common_all.glsl"

// TODO 归一化
float pulse_step(vec2 st)
{
    //   ----   ----    ----
    //      |   |   |   |
    //      -----   ----
    return floor((mod(st.x, 2.) - 1.));
    // return floor(fract(st.x) - 0.5) + 1.;
}

float lerp_step(in vec2 st)
{
    //      /\/\/\/\
//    float innter = fract(st.x) - 0.5;
//    float sig = sign(innter);
    return sign(fract(st.x) - 0.5) * (fract(st.x) - 0.5) * 2.;
}

float step_same_step(vec2 st)
{
    //  __    __    __
    // /  \__/  \__/
    return clamp(lerp_step(vec2(st.x * 0.5, st.y)) * 2., 0.5, 1.5);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st = (st - 0.5) * 8.;  // [-2, 2]
    // st.x *= .;

    float y = .0;
    y = draw_point(st, vec2(st.x, pulse_step(st)), 0.1);
    // y = draw_point(st, vec2(st.x, lerp_step(st)), 0.1);
    y = draw_point(st, vec2(st.x, step_same_step(st)), 0.1);


    gl_FragColor = vec4(vec3(0.1 * y, 0.8 * y, 0.3 * y), 1.);
    // gl_FragColor = vec4(finale_color, 1.);
}
