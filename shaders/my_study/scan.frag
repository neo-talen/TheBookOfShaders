#include "../common/common_all.glsl"

void main() {
   	vec3 l = get_scaner(vec3(1.0, 3.0, 2.));

    gl_FragColor = vec4(l, 1.0);
}