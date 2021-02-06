            RGBA(`


            vec2 mul(in vec2 a, in vec2 b) {
                return vec2(a.x * b.x - a.y * b.y, a.y * b.x + a.x * b.y);
            }

            float fractal(vec2 p){
                vec2 result = p;
                for (float i = 0.0; i < 64.0; i++){
                    result = mul(result, result) + p;
                    if (length(result)>2.)
                        return i;
                }
                return 64.0;
            }

            float channel(vec2 p, float shift, float t) {
                float v = fract(shift-time*0.5)*0.25+0.75;
                v = pow(v, 10.0);
                float d = fractal(p+t*0.02)/64.0;
                return smoothstep(v, v+0.03+t, d); 
            }

            void main() {
                vec2 p = gl_FragCoord.xy/resolution-0.5;
                p.x *= resolution.x/resolution.y;

                p /= 5.;
                p.x -= 1.76;
                gl_FragColor = vec4(
                    channel(p, 0.0, 0.06)-channel(p, 0.2, 0.05)+channel(p, 0.4, 0.04),
                    channel(p, 0.0, 0.07)-channel(p, 0.2, 0.05)+channel(p, 0.4, 0.03),
                    channel(p, 0.0, 0.03)-channel(p, 0.2, 0.03)+channel(p, 0.4, 0.03),
                    1.0);
            }`, {record:false});