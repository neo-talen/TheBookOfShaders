// Helper functions:
float slopeFromT (float t, float A, float B, float C){
  float dtdx = 1.0/(3.0*A*t*t + 2.0*B*t + C);
  return dtdx;
}

float xFromT (float t, float A, float B, float C, float D){
  float x = A*(t*t*t) + B*(t*t) + C*t + D;
  return x;
}

float yFromT (float t, float E, float F, float G, float H){
  float y = E*(t*t*t) + F*(t*t) + G*t + H;
  return y;
}


// bezier functions
float quadratic_bezier(float x, vec2 control_point) {
    // adapted from BEZMATH.PS (1993)
    // by Don Lancaster, SYNERGETICS Inc.
    // http://www.tinaja.com/text/bezmath.html

    float epsilon = 0.00001;
    float a = control_point.x;
    float b = control_point.y;
    a = max(0, min(1, a));
    b = max(0, min(1, b));
    if (a == 0.5) {
        a += epsilon;
    }

    // solve t from x (an inverse operation)
    float om2a = 1 - 2 * a;
    float t = (sqrt(a * a + om2a * x) - a) / om2a;
    float y = (1 - 2 * b) * (t * t) + (2 * b) * t;
    return y;
}


float cubic_bezier(float x, vec2 control_point_1, vec2 control_point_2)
{
    float a = control_point_1.x;
    float b = control_point_1.y;
    float c = control_point_2.x;
    float d = control_point_2.y;

    float y0a = 0.00; // initial y
    float x0a = 0.00; // initial x
    float y1a = b;    // 1st influence y
    float x1a = a;    // 1st influence x
    float y2a = d;    // 2nd influence y
    float x2a = c;    // 2nd influence x
    float y3a = 1.00; // final y
    float x3a = 1.00; // final x

    float A = x3a - 3 * x2a + 3 * x1a - x0a;
    float B = 3 * x2a - 6 * x1a + 3 * x0a;
    float C = 3 * x1a - 3 * x0a;
    float D = x0a;

    float E = y3a - 3 * y2a + 3 * y1a - y0a;
    float F = 3 * y2a - 6 * y1a + 3 * y0a;
    float G = 3 * y1a - 3 * y0a;
    float H = y0a;

    // Solve for t given x (using Newton-Raphelson), then solve for y given t.
    // Assume for the first guess that t = x.
    float currentt = x;
    int nRefinementIterations = 5;
    for (int i = 0; i < nRefinementIterations; i++) {
        float currentx = xFromT(currentt, A, B, C, D);
        float currentslope = slopeFromT(currentt, A, B, C);
        currentt -= (currentx - x) * (currentslope);
        currentt = clamp(currentt, 0, 1);
    }

    float y = yFromT(currentt, E, F, G, H);
    return y;
}