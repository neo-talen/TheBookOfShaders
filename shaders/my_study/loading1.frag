#ifdef GL_ES
precision mediump float;
#endif


//  
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float x_sep = 4.;
float y_sep = 4.;


void main() {
	vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 dim = vec2(x_sep, y_sep);
    st *= dim;

    vec2 index = floor(st);  // 每个格子的索引，左下角(0,0)； 右上角(x_step-1，y_step-1)；
    index = index / dim;    // 格子索引归一化

    st = fract(st);  // 格子坐标归一化
	
    // 接下来的操作都是对每个格子的操作
    // vec2 center = 

	gl_FragColor = vec4(index, .0, 1.0);
}

