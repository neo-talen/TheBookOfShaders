// 所有函数

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define PI_2 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//============================ 函数开始

float smooth_point(vec2 st, float target_y, float smoot_half)
{
	return smoothstep(target_y-smoot_half,target_y,st.y) - smoothstep(target_y,target_y+smoot_half,st.y);
}

//============================ 函数结束

void main(){
	vec2 st=gl_FragCoord.xy/u_resolution.xy;
	st-=.5;
	st*=2.;
	// st.x += u_time;
	
	float sin_y=sin(st.x*PI_2);
	
	vec3 color=vec3(.5804,.5686,.5686);
	
	color=mix(color,vec3(1.0, 0.0, 0.702),smooth_point(st,sin_y,.05));

    color=mix(color,vec3(0.0, 1.0, 0.0824), smooth_point(st, step(-0.01, st.x) * step(st.x, 0.01) * st.y, .01));
	color=mix(color,vec3(1.0, 0.0, 0.0), smooth_point(st, .0, .01));

	float cos_y=cos(st.x*PI_2);
	color=mix(color,vec3(.0549,.1098,.9059),smooth_point(st,cos_y,.05));
		
	gl_FragColor=vec4(color,1.);
}

