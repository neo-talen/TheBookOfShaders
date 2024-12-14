
#ifndef COMMON_UTILS_GLSL
#define COMMON_UTILS_GLSL
#endif

vec3 get_scaner(in vec3 base_color)
{
    vec2 uv = (-u_resolution.xy + 2.0 * gl_FragCoord.xy) / u_resolution.y;
    vec2 uv2 = uv;
    //Asin a + B sin 2a +C sin 3a +D sin 4a
    uv2.x += u_resolution.x/u_resolution.y;
    uv2.x -= 2.0*mod(u_time, 1.0*u_resolution.x/u_resolution.y);
    float width = -(1.0/(25.0*uv2.x));
   	vec3 l = width * base_color;
    return l;
}

