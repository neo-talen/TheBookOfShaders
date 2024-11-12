#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

	float circle(vec2 st, float pct1, float pct2)
{
		return step(0.01, st.y) * (smoothstep( pct1-0.01, pct1, st.y) - smoothstep( pct1, pct1+0.01, st.y) + smoothstep( pct2-0.01, pct2, st.y) - smoothstep( pct2, pct2+0.01, st.y));
}

	float circle_2(vec2 st, vec2 origin, float radius)
	{
		float distance = sqrt(pow(st.x - origin.x, 2.0) + pow(st.y - origin.y, 2.0));
		return smoothstep(-0.01, 0., distance - radius) - smoothstep(0., 0.01, distance - radius);
	}

    float circle_sdf(vec2 pos, vec2 origin, float radius)
	{
		// 返回点到圆形边缘的距离
		float distance = sqrt(pow(pos.x - origin.x, 2.0) + pow(pos.y - origin.y, 2.0));
		return distance - radius;
	}
float plane = 0.1;  // 地平线
float speed = 0.1;  // 太阳升起速度
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 left_btm_to_right_top = vec3((st.x + st.y) / 2.0);  // 从左下到右上

    vec3 midlle_left_to_right = vec3((smoothstep(0.25, 0.5, st.y) - smoothstep(0.5, 0.55, st.y)) * (1.0 - st.x));

    color = mix(colorA, colorB, left_btm_to_right_top + midlle_left_to_right);

//     // Plot transition lines for each channel
//     color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
//     color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
//     color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));
	
    float time_speed = u_time * speed;
    float fract_time = fract(time_speed);
    vec2 o = vec2(0.7, clamp(plane, 1., fract_time));
    float r = 0.05 + clamp(0., 0.1, fract_time);
    float r_square = 0.04;
	float pct1 = (1.0 - step(r, abs(o.x - st.x))) * (o.y + sqrt(max(pow(r, 2.) - pow(o.x-st.x, 2.), 0.)));
	float pct2 = (1.0 - step(r, abs(o.x - st.x))) * (o.y - sqrt(max(pow(r, 2.) - pow(o.x-st.x, 2.), 0.)));

   //  float is_cir = circle(st, pct1, pct2);
    // float is_cir = circle_2(st, o, r);
    float sdf_to_circle = circle_sdf(st, o, r);
    float is_cir = clamp(.0, 0.1, sdf_to_circle);
    color = (1.0- is_cir) * color + is_cir * vec3(0.9294, 0.9294, 0.0627) * 10.;
    
    gl_FragColor = vec4(color,1.0);
}