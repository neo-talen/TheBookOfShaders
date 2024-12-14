
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

#include "./common_functions.glsl"
#include "./common_draw.glsl"
#include "./common_utils.glsl"
