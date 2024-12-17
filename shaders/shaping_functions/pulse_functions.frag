
// 脉冲函数
#include "../common/common_all.glsl"

float pulse_step(vec2 st)
{
    //   ----   ----    ----
    //      |   |   |   |
    //      -----   ----
    return floor((mod(st.x, 2.) - 1.));
    // return floor(fract(st.x) - 0.5) + 1.;
}


void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st = (st - 0.5) * 4.;  // [-2, 2]

    float y = draw_point(st, vec2(st.x, pulse_step(st)), 0.1);


    gl_FragColor = vec4(vec3(y), 1.);
    // gl_FragColor = vec4(finale_color, 1.);
}
