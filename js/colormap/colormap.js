// ColoredCube.js (c) 2012 matsuda
// Vertex shader program
var Colormap = function()
{
    this.VSHADER_SOURCE =
        '#ifdef GL_ES\n' +
            'precision mediump float;\n' +
        '#endif\n' +
        'uniform mat4 projectionMatrix;\n' +
        'uniform mat4 viewMatrix;\n' +
        'uniform mat4 modelMatrix;\n' +

        'attribute vec4 position;\n' +
//        'attribute vec3 normal;\n' +
//        'attribute vec4 color;\n' +

        'varying vec4 frag_vector;\n' +

        'void main(void)\n' +
        '{\n' +
                'mat4 modelViewMatrix = viewMatrix * modelMatrix;\n' +

                '//apply the MVP matrix to the vertex\n' +
                'gl_Position =  projectionMatrix * (modelViewMatrix * position);\n' +

                '//pass the vertex withuot transformations as vector to be mapped into rgb color\n' +
                'frag_vector = vec4(position);\n' +
        '}\n'
    ;

    // Fragment shader program
    this.FSHADER_SOURCE_ABSOLUTE_VALUE =
        '#ifdef GL_ES\n' +
            'precision mediump float;\n' +
        '#endif\n' +

        'varying vec4 frag_vector;\n' +

        '/*Based on\n' +
        'PAJEVIC S., PIERPAOLI C.: Color schemes to represent the orientation\n' +
        'of anisotropictissues from diffusion tensor data: application to white\n' +
        'matter fiber tract mapping in the human brain. Magnetic resonance in\n' +
        'medicine 42, 3 (Sept.1999), 526–540. URL: http://view.ncbi.nlm.nih.gov/pubmed/10467297. 2, 3*/ \n' +

        '//convert vector into into rgb\n' +
        'vec4 vector2rgb_map_absolute_value(vec3 vector)\n' +
        '{\n' +
            'return vec4(abs(vector), 1.0);\n' +
        '}\n' +

        '//main functin\n' +
        'void main(void) {\n' +

            'gl_FragColor = vector2rgb_map_absolute_value(normalize(frag_vector.xyz));\n' +
        '}\n'
    ;
    
    this.FSHADER_SOURCE_BOY_SURFACE =
        '#ifdef GL_ES\n' +
            'precision mediump float;\n' +
        '#endif\n' +

        'varying vec4 frag_vector;\n' +

        'const float PI = 3.141592653589793238462643383;\n' +

        'float cc(float na, float nd)\n' +
        '{\n' +
            'return (na * cos(nd * PI / 180.0));\n' +
        '}\n' +

        'float ss(float na, float nd)\n' +
        '{\n' +
            'return na * sin(nd * PI / 180.0);\n' +
        '}\n' +

        '//convert vector into into rgb\n' +
        '//from "Coloring 3D Line Fields Using Boy’s Real Projective Plane Immersion"\n' +
        '//based on "https://github.com/nipy/dipy/blob/master/dipy/viz/colormap.py"\n' +
        '// the variable z4 was wrong. Correction: z4 = z * z2; --> z4 = z2 * z2;\n' +
        'vec4 vector2rgb_map_boy_surface(vec3 vector)\n' +
        '{\n' +
            'float x = vector.x;\n' +
            'float y = vector.y;\n' +
            'float z = vector.z;\n' +

            'float x2 = x * x;\n' +
            'float y2 = y * y;\n' +
            'float z2 = z * z;\n' +

            'float x3 = x * x2;\n' +
            'float y3 = y * y2;\n' +
            'float z3 = z * z2;\n' +

            'float z4 = z2 * z2;\n' +

            'float xy = x * y;\n' +
            'float xz = x * z;\n' +
            'float yz = y * z;\n' +

            'float hh1 = 0.5 * (3.0 * z2 - 1.0) / 1.58;\n' +
            'float hh2 = 3.0 * xz / 2.745;\n' +
            'float hh3 = 3.0 * yz / 2.745;\n' +
            'float hh4 = 1.5 * (x2 - y2) / 2.745;\n' +
            'float hh5 = 6.0 * xy / 5.5;\n' +
            'float hh6 = (1.0 / 1.176) * 0.125 * (35.0 * z4 - 30.0 * z2 + 3.0);\n' +
            'float hh7 = 2.5 * x * (7.0 * z3 - 3.0 * z) / 3.737;\n' +
            'float hh8 = 2.5 * y * (7.0 * z3 - 3.0 * z) / 3.737;\n' +
            'float hh9 = ((x2 - y2) * 7.5 * (7.0 * z2 - 1.0)) / 15.85;\n' +
            'float hh10 = ((2.0 * xy) * (7.5 * (7.0 * z2 - 1.0))) / 15.85;\n' +
            'float hh11 = 105.0 * (4.0 * x3 * z - 3.0 * xz * (1.0 - z2)) / 59.32;\n' +
            'float hh12 = 105.0 * (-4.0 * y3 * z + 3.0 * yz * (1.0 - z2)) / 59.32;\n' +

            'float s0 = -23.0;\n' +
            'float s1 = 227.9;\n' +
            'float s2 = 251.0;\n' +
            'float s3 = 125.0;\n' +

            'float ss23 = ss(2.71, s0);\n' +
            'float cc23 = cc(2.71, s0);\n' +
            'float ss45 = ss(2.12, s1);\n' +
            'float cc45 = cc(2.12, s1);\n' +
            'float ss67 = ss(0.972, s2);\n' +
            'float cc67 = cc(0.972, s2);\n' +
            'float ss89 = ss(0.868, s3);\n' +
            'float cc89 = cc(0.868, s3);\n' +

            'float X = 0.0;\n' +

            'X = X + hh2 * cc23;\n' +
            'X = X + hh3 * ss23;\n' +

            'X = X + hh5 * cc45;\n' +
            'X = X + hh4 * ss45;\n' +

            'X = X + hh7 * cc67;\n' +
            'X = X + hh8 * ss67;\n' +

            'X = X + hh10 * cc89;\n' +
            'X = X + hh9 * ss89;\n' +

            'float Y = 0.0;\n' +

            'Y = Y + hh2 * -ss23;\n' +
            'Y = Y + hh3 * cc23;\n' +

            'Y = Y + hh5 * -ss45;\n' +
            'Y = Y + hh4 * cc45;\n' +

            'Y = Y + hh7 * -ss67;\n' +
            'Y = Y + hh8 * cc67;\n' +

            'Y = Y + hh10 * -ss89;\n' +
            'Y = Y + hh9 * cc89;\n' +

            'float Z = 0.0;\n' +

            'Z = Z + hh1 * -2.8;\n' +
            'Z = Z + hh6 * -0.5;\n' +
            'Z = Z + hh11 * 0.3;\n' +
            'Z = Z + hh12 * -2.5;\n' +

            '//scale and normalize to fit\n' +
            '//in the rgb space\n' +

            'float w_x = 4.1925;\n' +
            'float trl_x = -2.0425;\n' +
            'float w_y = 4.0217;\n' +
            'float trl_y = -1.8541;\n' +
            'float w_z = 4.0694;\n' +
            'float trl_z = -2.1899;\n' +

            'vec4 C;\n' +
            'C.x = 0.9 * abs(((X - trl_x) / w_x)) + 0.05;\n' +
            'C.y = 0.9 * abs(((Y - trl_y) / w_y)) + 0.05;\n' +
            'C.z = 0.9 * abs(((Z - trl_z) / w_z)) + 0.05;\n' +

            'return C;\n' +
        '}\n' +

        '//From Parametrization 1\n' +
        '// http://mathworld.wolfram.com/BoySurface.html\n' +
        'vec4 vector2rgb_map_boy_surface_2(vec3 vector)\n' +
        '{\n' +
            'float x = vector.x;\n' +
            'float y = vector.y;\n' +
            'float z = vector.z;\n' +

            'float new_x = ((2.0 * x*x  - y*y - z*z)*(x*x + y*y + z*z) + 2.0 * y * z *(y*y - z*z) + z * x*(x*x - z*z) + x * y*(y*y - x*z))/2.0;\n' +
            'float new_y = (sqrt(3.0)/2.0) * ((y*y - z*z) * (x*x + y*y + z*z) + z * x*(z*z - x*x) + x * y*(y*y - x*x));\n' +
            'float new_z = (x + y + z) * (pow(x + y + z, 3.0) + 4.0 * (y - x) * (z - y) * (x - z))/8.0;\n' +

            'new_x = new_x + 0.8;\n' +
            'new_y = new_y + 1.05;\n' +
            'new_z = new_z + 0.2;\n' +

            'new_x = new_x / 1.9;\n' +
            'new_y = new_y / 2.1;\n' +
            'new_z = new_z / 1.35;\n' +

            'vec4 rgb = vec4(new_x, new_y, new_z, 1.0);\n' +

            'return rgb;\n' +
        '}\n' +

        '//From Nordstrand\'s Parametrization 2\n' +
        '// http://mathworld.wolfram.com/BoySurface.html\n' +
        'vec4 vector2rgb_map_boy_surface_3(vec3 vector)\n' +
        '{\n' +
            'float x = vector.x;\n' +
            'float y = vector.y;\n' +
            'float z = vector.z;\n' +

            'float r = length(vector);\n' +
            'float v = acos(z / r);\n' +
            'float u = atan(y, x);\n' +

            'float new_x = (sqrt(2.0) * pow(cos(v),2.0) * cos(2.0 * u) + cos(u) * sin(2.0 * v))/(2.0 - sqrt(2.0) * sin(3.0 * u) * sin(2.0 * v));\n' +
            'float new_y = (sqrt(2.0) * pow(cos(v),2.0) * sin(2.0 * u) + cos(u) * sin(2.0 * v))/(2.0 - sqrt(2.0) * sin(3.0 * u) * sin(2.0 * v));\n' +
            'float new_z =                                          (3.0 * pow(cos(v),2.0))/(2.0 - sqrt(2.0) * sin(3.0 * u) * sin(2.0 * v));\n' +

            'new_x = new_x + 0.8;\n' +
            'new_y = new_y + 1.15;\n' +
            'new_z = new_z + 0.5;\n' +

            'new_x = new_x / 1.9;\n' +
            'new_y = new_y / 2.3;\n' +
            'new_z = new_z / 2.0;\n' +

            'vec4 rgb = vec4(new_x, new_y, new_z, 1.0);\n' +

            'return rgb;\n' +
        '}\n' +

        '//main functin\n' +
        'void main(void) {\n' +

            'gl_FragColor = vector2rgb_map_boy_surface(normalize(frag_vector.xyz));\n' +
        '}'
    ;
    
    this.FSHADER_SOURCE_MIRROR_SYMMETRY =
        '#ifdef GL_ES\n' +
            'precision mediump float;\n' +
        '#endif\n' +

        'varying vec4 frag_vector;\n' +

        '/*Based on \n' +
        'PAJEVIC S., PIERPAOLI C.: Color schemes to represent the orientation \n' +
        'of anisotropictissues from diffusion tensor data: application to white \n' +
        'matter fiber tract mapping in the human brain. Magnetic resonance in \n' +
        'medicine 42, 3 (Sept.1999), 526–540. URL: http://view.ncbi.nlm.nih.gov/pubmed/10467297. 2, 3*/ \n' +

        '//convert vector into hsv \n' +
        'vec3 vector2hsv_map_mirror_symmetry(vec3 vector)\n' +
        '{\n' +
            'vec3 hsv;\n' +

            'if(vector.z < 0.0)\n' +
                'vector = -vector;\n' +

            'vector.x = abs(vector.x);\n' +

            'vec2 vec2d = vec2(vector.xy), x_axis = vec2(1.0, 0.0);\n' +

            'vec2d = normalize(vec2d);\n' +
            'float c = dot(vec2d, x_axis);\n' +
            'float angle = degrees(acos(c));\n' +
            'if(vector.y < 0.0)\n' +
                'angle = 360.0 - angle;\n' +

            'hsv[0] = (2.0 * mod(angle - 45.0 + 180.0, 180.0)) / 360.0;\n' +

            'vec3 vec3d = vector;\n' +
            'hsv[2] = length(vec3d);\n' +

            'vec3 sat_min_axis = vec3(0.0, 0.0, 1.0);\n' +
            'vec3d = normalize(vec3d);\n' +
            'hsv[1] = sin(acos(dot(vec3d, sat_min_axis))) / 1.0;\n' +

            'return hsv;\n' +
        '}\n' +

        '//convert hsv color into rgb color\n' +
        'vec4 hsv2rgb(vec3 hsv)\n' +
        '{\n' +
            'int hueCase = int(floor(hsv[0] * 6.0));\n' +
            'float frac  = fract(hsv[0] * 6.0);\n' +
            'float lx    = hsv[2] * (1.0 - hsv[1]);\n' +
            'float ly    = hsv[2] * (1.0 - hsv[1] * frac);\n' +
            'float lz    = hsv[2] * (1.0 - hsv[1] * (1.0 - frac));\n' +

            'vec4 rgb =  vec4(1.0);\n' +
            'if(hueCase == 0 || hueCase == 6) { rgb.r = hsv[2];  rgb.g = lz;      rgb.b = lx;     }\n' +
            'if(hueCase == 1) { rgb.r = ly;      rgb.g = hsv[2];  rgb.b = lx;     }\n' +
            'if(hueCase == 2) { rgb.r = lx;      rgb.g = hsv[2];  rgb.b = lz;     }\n' +
            'if(hueCase == 3) { rgb.r = lx;      rgb.g = ly;      rgb.b = hsv[2]; }\n' +
            'if(hueCase == 4) { rgb.r = lz;      rgb.g = lx;      rgb.b = hsv[2]; }\n' +
            'if(hueCase == 5) { rgb.r = hsv[2];  rgb.g = lx;      rgb.b = ly;     }\n' +

            'return rgb;\n' +
        '}\n' +

        '//convert vector into hsv and after into rgb\n' +
        'vec4 vector2hsv2rgb(vec3 vector)\n' +
        '{\n' +
            'vec3 hsv;\n' +
            'hsv = vector2hsv_map_mirror_symmetry(vector);\n' +
            'return hsv2rgb(hsv);\n' +
        '}\n' +

        '//main functin\n' +
        'void main(void)\n' +
        '{\n' +
            'gl_FragColor = vector2hsv2rgb(normalize(frag_vector.xyz));\n' +
        '}\n'
    ;
    
    this.FSHADER_SOURCE_NO_SYMMETRY =
        '#ifdef GL_ES\n' +
            'precision mediump float;\n' +
        '#endif\n' +

        'varying vec4 frag_vector;\n' +

        '/*Based on \n' +
        'PAJEVIC S., PIERPAOLI C.: Color schemes to represent the orientation \n' +
        'of anisotropictissues from diffusion tensor data: application to white \n' +
        'matter fiber tract mapping in the human brain. Magnetic resonance in \n' +
        'medicine 42, 3 (Sept.1999), 526–540. URL: http://view.ncbi.nlm.nih.gov/pubmed/10467297. 2, 3*/ \n' +

        '//convert vector into hsv\n' +
        'vec3 vector2hsv_map_no_symmetry(vec3 vector)\n' +
        '{\n' +
            'vec3 hsv;\n' +

            'if(vector.z < 0.0)\n' +
                'vector = -vector;\n' +

            'vec2 vec2d = vec2(vector.xy), x_axis = vec2(1.0, 0.0);\n' +

            'vec2d = normalize(vec2d);\n' +
            'float c = dot(vec2d, x_axis);\n' +
            'float angle = degrees(acos(c));\n' +
            'if(vector.y < 0.0)\n' +
                'angle = 360.0 - angle;\n' +

            'hsv[0] = angle / 360.0;\n' +

            'vec3 vec3d = vector;\n' +
            'hsv[2] = length(vec3d);\n' +

            'vec3 sat_min_axis = vec3(0.0, 0.0, 1.0);\n' +
            'vec3d = normalize(vec3d);\n' +
            'hsv[1] = sin(acos(dot(vec3d, sat_min_axis))) / 1.0;\n' +

            'return hsv;\n' +

        '}\n' +

        '//convert hsv color into rgb color\n' +
        'vec4 hsv2rgb(vec3 hsv)\n' +
        '{\n' +
            'int hueCase = int(floor(hsv[0] * 6.0));\n' +
            'float frac  = fract(hsv[0] * 6.0);\n' +
            'float lx    = hsv[2] * (1.0 - hsv[1]);\n' +
            'float ly    = hsv[2] * (1.0 - hsv[1] * frac);\n' +
            'float lz    = hsv[2] * (1.0 - hsv[1] * (1.0 - frac));\n' +

            'vec4 rgb =  vec4(1.0);\n' +
            'if(hueCase == 0 || hueCase == 6) { rgb.r = hsv[2];  rgb.g = lz;      rgb.b = lx;     }\n' +
            'if(hueCase == 1) { rgb.r = ly;      rgb.g = hsv[2];  rgb.b = lx;     }\n' +
            'if(hueCase == 2) { rgb.r = lx;      rgb.g = hsv[2];  rgb.b = lz;     }\n' +
            'if(hueCase == 3) { rgb.r = lx;      rgb.g = ly;      rgb.b = hsv[2]; }\n' +
            'if(hueCase == 4) { rgb.r = lz;      rgb.g = lx;      rgb.b = hsv[2]; }\n' +
            'if(hueCase == 5) { rgb.r = hsv[2];  rgb.g = lx;      rgb.b = ly;     }\n' +

            'return rgb;\n' +
        '}\n' +

        '//convert vector into hsv and after into rgb\n' +
        'vec4 vector2hsv2rgb(vec3 vector)\n' +
        '{\n' +
            'vec3 hsv;\n' +
            'hsv = vector2hsv_map_no_symmetry(vector);\n' +
            'return hsv2rgb(hsv);\n' +
        '}\n' +

        '//main functin\n' +
        'void main(void)\n' +
        '{\n' +
            'gl_FragColor = vector2hsv2rgb(normalize(frag_vector.xyz));\n' +
        '}\n'
    ;
    
    this.FSHADER_SOURCE_ROTATIONAL_SYMMETRY =
        '#ifdef GL_ES\n' +
            'precision mediump float;\n' +
        '#endif\n' +

        'varying vec4 frag_vector;\n' +

        '/*Based on \n' +
        'PAJEVIC S., PIERPAOLI C.: Color schemes to represent the orientation \n' +
        'of anisotropictissues from diffusion tensor data: application to white \n' +
        'matter fiber tract mapping in the human brain. Magnetic resonance in \n' +
        'medicine 42, 3 (Sept.1999), 526–540. URL: http://view.ncbi.nlm.nih.gov/pubmed/10467297. 2, 3*/ \n' +

        '//convert vector into hsv\n' +
        'vec3 vector2hsv_map_rotational_symmetry(vec3 vector)\n' +
        '{\n' +
            'vec3 hsv;\n' +

            'if(vector.z < 0.0)\n' +
                'vector = -vector;\n' +

            'vec2 vec2d = vec2(vector.xy), x_axis = vec2(1.0, 0.0);\n' +

            'vec2d = normalize(vec2d);\n' +
            'float c = dot(vec2d, x_axis);\n' +
            'float angle = degrees(acos(c));\n' +
            'if(vector.y < 0.0)\n' +
                'angle = 360.0 - angle;\n' +

            'hsv[0] = (mod(2.0 * (angle - 90.0 + 360.0), 360.0) / 360.0);\n' +

            'vec3 vec3d = vector;\n' +
            'hsv[2] = length(vec3d);\n' +

            'vec3 sat_min_axis = vec3(0.0, 0.0, 1.0);\n' +
            'vec3d = normalize(vec3d);\n' +
            'hsv[1] = sin(acos(dot(vec3d, sat_min_axis))) / 1.0;\n' +

            'return hsv;\n' +

        '}\n' +

        '//convert hsv color into rgb color\n' +
        'vec4 hsv2rgb(vec3 hsv)\n' +
        '{\n' +
            'int hueCase = int(floor(hsv[0] * 6.0));\n' +
            'float frac  = fract(hsv[0] * 6.0);\n' +
            'float lx    = hsv[2] * (1.0 - hsv[1]);\n' +
            'float ly    = hsv[2] * (1.0 - hsv[1] * frac);\n' +
            'float lz    = hsv[2] * (1.0 - hsv[1] * (1.0 - frac));\n' +

            'vec4 rgb =  vec4(1.0);\n' +
            'if(hueCase == 0 || hueCase == 6) { rgb.r = hsv[2];  rgb.g = lz;      rgb.b = lx;     }\n' +
            'if(hueCase == 1) { rgb.r = ly;      rgb.g = hsv[2];  rgb.b = lx;     }\n' +
            'if(hueCase == 2) { rgb.r = lx;      rgb.g = hsv[2];  rgb.b = lz;     }\n' +
            'if(hueCase == 3) { rgb.r = lx;      rgb.g = ly;      rgb.b = hsv[2]; }\n' +
            'if(hueCase == 4) { rgb.r = lz;      rgb.g = lx;      rgb.b = hsv[2]; }\n' +
            'if(hueCase == 5) { rgb.r = hsv[2];  rgb.g = lx;      rgb.b = ly;     }\n' +

            'return rgb;\n' +
        '}\n' +

        '//convert vector into hsv and after into rgb\n' +
        'vec4 vector2hsv2rgb(vec3 vector)\n' +
        '{\n' +
            'vec3 hsv;\n' +
            'hsv = vector2hsv_map_rotational_symmetry(vector);\n' +
            'return hsv2rgb(hsv);\n' +
        '}\n' +

        '//main functin\n' +
        'void main(void)\n' +
        '{\n' +
            'gl_FragColor = vector2hsv2rgb(normalize(frag_vector.xyz));\n' +
        '}\n'
    ;
    
    this.FSHADER_SOURCE_NEW_COLORMAP =
        '#ifdef GL_ES\n' +
            'precision mediump float;\n' +
        '#endif\n' +

        'varying vec4 frag_vector;\n' +

        'const float PI = 3.141592653589793238462643383;\n' +
        'const float interpolation_range = 20.0;\n' +

        'vec4 map_vector2rgb(vec3 vector)\n' +
        '{\n' +
            'if(vector.z < 0.0)\n' +
                'vector = -vector;\n' +

            'vec3 origin_color = vec3(0.0, 0., 0.0);\n' +
            'vec3 top_color = vec3(1.0, 1.0, 1.0);\n' +

            'vec3 sector_1_color = vec3(1.0, 0.0, 0.0);\n' +
            'vec3 sector_2_color = vec3(1.0, 0.0, 1.0);\n' +
            'vec3 sector_3_color = vec3(0.0, 1.0, 0.0);\n' +
            'vec3 sector_4_color = vec3(1.0, 1.0, 0.0);\n' +
            'vec3 sector_5_color = vec3(0.0, 0.0, 1.0);\n' +
            'vec3 sector_6_color = vec3(0.0, 1.0, 1.0);\n' +

            'vec3 rgb = vec3(0.0), color_1 = vec3(0.0), color_2 = vec3(0.0);\n' +

            'float r = length(vector), t1 = 0.0, t1_aux, t2 = 0.0;\n' +
            'float azimuthal, azimuthal_deg;\n' +
            'float polar;\n' +

            'if(vector.x != 0.0)\n' +
                'azimuthal = atan(vector.y, vector.x);\n' +
            'else\n' +
                'azimuthal = 0.0;\n' +

            'azimuthal_deg = mod(degrees(azimuthal) + 360.0, 360.0);\n' +

            'if(r > 0.0)\n' +
                'polar = acos(vector.z / r);\n' +
            'else\n' +
                'polar = 0.0;\n' +

             't1_aux = degrees(polar) / (90.0 - interpolation_range);\n' +
             't1 = degrees(polar) / (90.0 - interpolation_range);\n' +

            'if(t1 > 1.0)\n' +
            '{\n' +
                't1 = 1.0;\n' +
            '}\n' +

            't1 = sin(pow(t1, 2.0) * (PI / 2.0));\n' +

            'if(azimuthal_deg >= 0.0 && azimuthal_deg < 60.0) //quadrant 1\n' +
            '{\n' +
                't2 = azimuthal_deg / 60.0;\n' +
                'color_1 = sector_1_color * t1 + top_color * (1.0 - t1);\n' +
                'color_2 = sector_2_color * t1 + top_color * (1.0 - t1);\n' +

            '} else if (azimuthal_deg >= 60.0 && azimuthal_deg < 120.0){ //quadrant 2\n' +

                't2 = (60.0 - (120.0 - azimuthal_deg)) / 60.0;\n' +
                'color_1 = sector_2_color * t1 + top_color * (1.0 - t1);\n' +
                'color_2 = sector_3_color * t1 + top_color * (1.0 - t1);\n' +

            '} else if (azimuthal_deg >= 120.0 && azimuthal_deg < 180.0){ //quadrant 3\n' +

                't2 = (60.0 - (180.0 - azimuthal_deg)) / 60.0;\n' +
                'color_1 = sector_3_color * t1 + top_color * (1.0 - t1);\n' +
                'color_2 = sector_4_color * t1 + top_color * (1.0 - t1);\n' +

            '} else if (azimuthal_deg >= 180.0 && azimuthal_deg < 240.0){ //quadrant 4\n' +

                't2 = (60.0 - (240.0 - azimuthal_deg)) / 60.0;\n' +
                'color_1 = sector_4_color * t1 + top_color * (1.0 - t1);\n' +
                'color_2 = sector_5_color * t1 + top_color * (1.0 - t1);\n' +

            '} else if (azimuthal_deg >= 240.0 && azimuthal_deg < 300.0){ //quadrant 5\n' +

                't2 = (60.0 - (300.0 - azimuthal_deg)) / 60.0;\n' +
                'color_1 = sector_5_color * t1 + top_color * (1.0 - t1);\n' +
                'color_2 = sector_6_color * t1 + top_color * (1.0 - t1);\n' +

            '} else if (azimuthal_deg >= 300.0 && azimuthal_deg < 360.0){ //quadrant 6\n' +

                't2 = (60.0 - (360.0 - azimuthal_deg)) / 60.0;\n' +
                'color_1 = sector_6_color * t1 + top_color * (1.0 - t1);\n' +
                'color_2 = sector_1_color * t1 + top_color * (1.0 - t1);\n' +
            '}\n' +

            'rgb = color_2 * t2 + color_1 * (1.0 - t2);\n' +
            'rgb = origin_color * (1.0 - r) + rgb * r;\n' +

            'return vec4(rgb, t1_aux);\n' +
        '}\n' +

        'float polar(vec3 vector)\n' +
        '{\n' +
            'vec3 vec3d;\n' +
            'vec3 sat_min_axis = vec3(0.0, 0.0, 1.0);\n' +
            'vec3d = normalize(vector);\n' +

            'return degrees(acos(dot(vec3d, sat_min_axis)));\n' +
        '}\n' +

        'float azimuthal(vec3 vector)\n' +
        '{\n' +
            'vec3 vec3d;\n' +
            'vec3 sat_min_axis = vec3(1.0, 0.0, 0.0);\n' +
            'vec3d = normalize(vector);\n' +

            'float c = degrees(acos(dot(vec3(vec3d.xy, 0.0), sat_min_axis)));\n' +
            'if(vector.y < 0.0)\n' +
                'return 360.0 - c;\n' +
            'else\n' +
                'return c;\n' +
        '}\n' +

        'vec4 vector2rgb_new_color_map(vec3 vector)\n' +
        '{\n' +
            'vec4 rgb = map_vector2rgb(vector);\n' +

            'vec4 mirror_rgb;\n' +
            'float t;\n' +

            'if(rgb.a > 1.0)\n' +
            '{\n' +
                'if(vector.z >= 0.0)\n' +
                '{\n' +
                    'if(polar(vector) >= (90.0 - interpolation_range))\n' +
                    '{\n' +
                        'vec4 mirror_rgb = map_vector2rgb(vec3(-vector.xy, vector.z));\n' +

                        'float diff_ang = interpolation_range - (90.0 - polar(vector));\n' +
                        't = diff_ang / (interpolation_range * 2.0);\n' +

                        'rgb = vec4((rgb * (1.0 - t) + mirror_rgb * t).rgb, 1.0);\n' +
                    '}\n' +

                '} else {\n' +

                    'if(polar(vector) <= (90.0 + interpolation_range))\n' +
                    '{\n' +
                        'vec4 mirror_rgb = map_vector2rgb(vec3(vector.xy, -vector.z));\n' +

                        'float diff_ang = polar(vector) - 90.0 + interpolation_range;\n' +
                        't = diff_ang / (interpolation_range * 2.0);\n' +

                        'rgb = vec4((mirror_rgb * (1.0 - t) + rgb * t).rgb, 1.0);\n' +
                    '}\n' +
                '}\n' +
            '}\n' +

            'return vec4(rgb.rgb, 1.0);\n' +
        '}\n' +

        '//main functin\n' +
        'void main(void)\n' +
        '{\n' +
            'gl_FragColor = vector2rgb_new_color_map(normalize(frag_vector.xyz));\n' +
        '}\n'
    ;
}

Colormap.prototype.create = function() {
  // Retrieve <canvas> element
    var canvas = document.getElementById('webgl_colormap');

    // Get the rendering context for WebGL
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    if (!initShaders(gl, this.VSHADER_SOURCE, this.FSHADER_SOURCE_NEW_COLORMAP)) {
        console.log('Failed to intialize shaders.');
        return;
    }
    
    var program = gl.program;
    var positionLoc    = gl.getAttribLocation(program, "position");
//    var normalLoc      = gl.getAttribLocation(program, "normal");
//    var colorLoc       = gl.getAttribLocation(gl.program, "color");
//    
    this.projMatrixLoc = gl.getUniformLocation(gl.program, "projectionMatrix");
    this.viewMatrixLoc = gl.getUniformLocation(gl.program, "viewMatrix");
    this.modelMatrixLoc = gl.getUniformLocation(gl.program, "modelMatrix");
//    this.normalMatrixloc = gl.getUniformLocation(gl.program, "normalMatrix");
//    
    this.proj_matrix = new Matrix4;
    this.view_matrix = new Matrix4;
    this.rot_matrix = new Matrix4;
    this.model_matrix = new Matrix4;
//    
//    this.model_matrix.setScale(1.3, 1.3, 1.);
    this.rot_matrix.setRotate(0.4, 0.0, 1.0, 0.0);
    this.proj_matrix.setOrtho(-1.5, 1.5, -1.5, 1.5, 1.0, 10.0);
    this.view_matrix.setLookAt(0.0, 0.0, 2.5,     0.0, 0.0, 0.0,      0.0, 1.0, 0.0);
    
    gl.uniformMatrix4fv(this.projMatrixLoc, gl.FALSE, this.proj_matrix.elements);
    gl.uniformMatrix4fv(this.viewMatrixLoc, gl.FALSE, this.view_matrix.elements);
//    
    this.createSphereVertexBuffer(gl, positionLoc, 1.0,  31, 31);
//    this.initLighting(gl);
//    
//
//    this.initTensorAttr(gl);
//    
    gl.clearColor(0.0, 0.45, 0.5, 1.0);
    
    // Set the clear color and enable the depth test
    gl.enable(gl.DEPTH_TEST);
    
    gl.enable(gl.CULL_FACE);
    gl.depthFunc(gl.LEQUAL);
//    
////    gl.enable(gl.POLYGON_OFFSET_FILL);
////    gl.polygonOffset(1.0, 1.0); // Set the polygon offset
//
    var _this = this;
    var tick = function()
    {
        _this.draw(gl, program);
        requestAnimationFrame(tick);// Request that the browser calls tick
//        
//        document.getElementById("span_linear").innerHTML = _this.linear_ind.toFixed(4);
//        document.getElementById("span_planar").innerHTML = _this.planar_ind.toFixed(4);
//        document.getElementById("span_spherical").innerHTML = _this.spherical_ind.toFixed(4);
    };
    
    tick();
    
}

Colormap.prototype.draw = function(gl, program)
{
    gl.useProgram(program);
//    if(this.update_tensor_flag)
//    {
//        this.update_tensor_flag = false;
//        this.initTensorAttr(gl);
//    }
//    
//    // Clear color and depth buffer
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//    
    this.model_matrix = this.model_matrix.multiply(this.rot_matrix);
//    
//    var normalMatrix = new Matrix4;
//    normalMatrix.multiply(this.view_matrix).multiply(this.model_matrix).multiply(this.tensor_matrix);
//    normalMatrix.invert();
//    normalMatrix.transpose();
//    
    gl.uniformMatrix4fv(this.modelMatrixLoc, gl.FALSE, this.model_matrix.elements);
//    gl.uniformMatrix4fv(this.normalMatrixloc, gl.FALSE, normalMatrix.elements);
//    
//    // Draw the glyph    
    gl.drawElements(gl.TRIANGLES, this.size_indices_buffer, gl.UNSIGNED_SHORT, 0);
}

//#################################################################################################################################

//Colormap.prototype.calculateVertices = function()
//{
//    var inc_theta = 2.0 * Math.PI / this.vertical_slices;
//    var inc_phi = Math.PI / this.horizontal_slices;
//    var theta = 0.0, phi =  inc_phi;
//
//    var vertices_pos = 0;
//
//    //Pólo inferior
//    for(var i = 0; i < this.vertical_slices; i++)
//    {
//        this.vertices[vertices_pos++] = 0.0;
//        this.vertices[vertices_pos++] = -this.radius;
//        this.vertices[vertices_pos++] = 0.0;
//    }
//
//    for(i = 1; i < this.horizontal_slices; i++)
//    {
//        theta = 0.0;
//        var r_sin_phi = this.radius * Math.sin(phi);
//        var r_cos_phi = this.radius * Math.cos(phi);
//
//        for(var j = 0; j < this.vertical_slices; j++)
//        {
//            this.vertices[vertices_pos++] = Math.sin(theta) * r_sin_phi;
//            this.vertices[vertices_pos++] = -r_cos_phi;
//            this.vertices[vertices_pos++] = Math.cos(theta) * r_sin_phi;
//            
//            theta += inc_theta;
//        }
//        this.vertices[vertices_pos] = this.vertices[vertices_pos - (this.vertical_slices * 3)];
//        vertices_pos++;
//        this.vertices[vertices_pos] = this.vertices[vertices_pos - (this.vertical_slices * 3)];
//        vertices_pos++;
//        this.vertices[vertices_pos] = this.vertices[vertices_pos - (this.vertical_slices * 3)];
//        vertices_pos++;
//        
//        phi += inc_phi;
//    }
//
//    //Pólo superior
//    for(i = 0; i < this.vertical_slices; i++)
//    {
//        this.vertices[vertices_pos++] = 0.0;
//        this.vertices[vertices_pos++] = this.radius;
//        this.vertices[vertices_pos++] = 0.0;
//    }
//}
//
//Colormap.prototype.calculateVertexIndices = function(){
//
//    var indices_pos = 0;
//
//    //pólo inferior
//    for(var i = 0; i < this.vertical_slices; i++)
//    {
//        this.indices[indices_pos++] = i * 3;
//        this.indices[indices_pos++] = (this.vertical_slices + i + 1) * 3;
//        this.indices[indices_pos++] = (this.vertical_slices + i) * 3;
//    }
//
//    //meio
//    for(i = 0; i < this.horizontal_slices - 2; i++)
//    {
//        for(var j = 0; j < this.vertical_slices + 1; j++)
//        {
//
//            var first = (this.vertical_slices + 1)* (i + 1) + this.vertical_slices + j;
//            var second = (this.vertical_slices + 1)* i + this.vertical_slices + j;
//
//            this.indices[indices_pos++] = first * 3;
//            this.indices[indices_pos++] = second * 3;
//        }
//
//    }
//
//    //pólo superior
//    var offset = (this.size_vertices_buffer - this.vertical_slices) * 3;
//    for(i = 0; i < this.vertical_slices; i++/*, indices_pos += 3*/)
//    {
//        this.indices[indices_pos++] = offset + (i * 3);
//        this.indices[indices_pos++] = offset + (- this.vertical_slices - 1 + i) * 3;
//        this.indices[indices_pos++] = offset + (- this.vertical_slices + i) * 3;
//    }
//
//}

Colormap.prototype.calculateVertices = function()
{

    var inc_theta = 2.0 * Math.PI / this.vertical_slices;
    var inc_phi = Math.PI / this.horizontal_slices;
    var theta = 0.0, phi =  inc_phi;
//    var eps = Math.PI / 10000000.0;

//    var flag_add_eps_to_phi = false;
//    var iter_to_add_phi = 0;
//    if((this.horizontal_slices % 2) == 0)
//    {
//        flag_add_eps_to_phi = true;
//        iter_to_add_phi = this.horizontal_slices / 2;
//    }
//
//    var flag_add_eps_to_theta = false;
//    var iter_to_add_theta = 0;
//    if((this.vertical_slices % 4) == 0)
//    {
//        flag_add_eps_to_theta = true;
//        iter_to_add_theta = this.vertical_slices / 4;
//
//    }else if((this.vertical_slices % 2) == 0) {
//
//        flag_add_eps_to_theta = true;
//        iter_to_add_theta = this.vertical_slices / 2;
//    }

    var vertices_pos = 0;

    //Pólo inferior
    for(var i = 0; i < this.vertical_slices; i++)
    {
        this.vertices[vertices_pos++] = 0.0;
        this.vertices[vertices_pos++] = -this.radius;
        this.vertices[vertices_pos++] = 0.0;
        
//        text = " " + vertices[vertices_pos - 3] + " " + vertices[vertices_pos - 2] + " " + vertices[vertices_pos - 1];
//        console.log(text);
    }

    for(i = 1; i < this.horizontal_slices; i++)
    {
        var r_sin_phi = this.radius * Math.sin(phi);
        var r_cos_phi = this.radius * Math.cos(phi);
        theta = 0.0;
        
//        if(flag_add_eps_to_phi && (iter_to_add_phi == i))
//            phi = phi - eps;

        for(var j = 0; j < this.vertical_slices; j++)
        {
//            if((flag_add_eps_to_theta && ((j % iter_to_add_theta) == 0)))
//                theta = theta - eps;
//
//            if((j == 0))
//                theta = eps;

//            this.vertices[vertices_pos++] = theta;
//            this.vertices[vertices_pos++] = phi;
//            this.vertices[vertices_pos++] = 0.0;
            
            this.vertices[vertices_pos++] = Math.sin(theta) * r_sin_phi;
            this.vertices[vertices_pos++] = - r_cos_phi;
            this.vertices[vertices_pos++] = Math.cos(theta) * r_sin_phi;
            
//            text = " " + vertices[vertices_pos - 3] + " " + vertices[vertices_pos - 2] + " " + vertices[vertices_pos - 1];
//            console.log(text);

//            if((flag_add_eps_to_theta && ((j % iter_to_add_theta) == 0)))
//                theta = theta + eps;
//
//            if((j == 0))
//                theta = 0.0;

            theta += inc_theta;
        }
        this.vertices[vertices_pos] = this.vertices[vertices_pos - (this.vertical_slices * 3)];
        vertices_pos++;
        this.vertices[vertices_pos] = this.vertices[vertices_pos - (this.vertical_slices * 3)];
        vertices_pos++;
        this.vertices[vertices_pos] = this.vertices[vertices_pos - (this.vertical_slices * 3)];
        vertices_pos++;
        
//        text = " " + vertices[vertices_pos - 3] + " " + vertices[vertices_pos - 2] + " " + vertices[vertices_pos - 1];
//        console.log(text);

//        if(flag_add_eps_to_phi && (iter_to_add_phi == i))
//            phi = phi + eps;

        phi += inc_phi;
    }

    //Pólo superior
    for(i = 0; i < this.vertical_slices; i++)
    {
        this.vertices[vertices_pos++] = 0.0;
        this.vertices[vertices_pos++] = this.radius;
        this.vertices[vertices_pos++] = 0.0;
        
//        text = " " + vertices[vertices_pos - 3] + " " + vertices[vertices_pos - 2] + " " + vertices[vertices_pos - 1];
//        console.log(text);
    }
}

Colormap.prototype.calculateVertexIndices = function(){

    var indices_pos = 0;

    //pólo inferior
    for(var i = 0; i < this.vertical_slices; i++)
    {
        this.indices[indices_pos++] = i * 3;
        this.indices[indices_pos++] = (this.vertical_slices + i) * 3;
        this.indices[indices_pos++] = (this.vertical_slices + i + 1) * 3;
        
//        var text = " " + indices[indices_pos - 3] + " " + indices[indices_pos - 2] + " " + indices[indices_pos - 1];
//        console.log(text);
    }

    //meio
    for(i = 0; i < this.horizontal_slices - 2; i++)
    {
        for(var j = 0; j < this.vertical_slices; j++)
        {

            var first = (this.vertical_slices + 1)* (i + 1) + this.vertical_slices + j;
            var second = (this.vertical_slices + 1)* i + this.vertical_slices + j;

            var first_plus_1 = (this.vertical_slices + 1)* (i + 1) + this.vertical_slices + (j + 1);
            var second_plus_1 = (this.vertical_slices + 1)* i + this.vertical_slices + (j + 1);

            this.indices[indices_pos++] = first * 3;
            this.indices[indices_pos++] = second_plus_1 * 3;
            this.indices[indices_pos++] = second * 3;
            
//            text = " " + indices[indices_pos - 3] + " " + indices[indices_pos - 2] + " " + indices[indices_pos - 1];
//            console.log(text);

            this.indices[indices_pos++] = second_plus_1 * 3;
            this.indices[indices_pos++] = first * 3;
            this.indices[indices_pos++] = first_plus_1 * 3;
            
//            text = " " + indices[indices_pos - 3] + " " + indices[indices_pos - 2] + " " + indices[indices_pos - 1];
//            console.log(text);
        }

    }

    //pólo superior
    var offset = (this.size_vertices_buffer - this.vertical_slices) * 3;
    for(i = 0; i < this.vertical_slices; i++/*, indices_pos += 3*/)
    {
        this.indices[indices_pos++] = offset + (i * 3);
        this.indices[indices_pos++] = offset + (- this.vertical_slices + i) * 3;
        this.indices[indices_pos++] = offset + (- this.vertical_slices - 1 + i) * 3;
        
//        text = " " + indices[indices_pos - 3] + " " + indices[indices_pos - 2] + " " + indices[indices_pos - 1];
//        console.log(text);
    }

}

Colormap.prototype.createObjectBuffers = function(gl, vertex_loc)
{
    var buffer = gl.createBuffer();   // Create a buffer object
    if (!buffer) {
        console.log('Failed to create the buffer object');
        return false;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

    gl.vertexAttribPointer(vertex_loc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertex_loc);

    var index_buffer = gl.createBuffer();   // Create a buffer object
    if (!buffer) {
        console.log('Failed to create the buffer object');
        return false;
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
}

Colormap.prototype.createSphereVertexBuffer = function(gl, vertex_loc, _radius, _vertical_slices, _horizontal_slices)
{
    if(_radius <= 0.0 )
        _radius = 0.2;
    
    if(_vertical_slices < 3)
        _vertical_slices = 3;

    if(_horizontal_slices < 3)
        _horizontal_slices = 3;

    this.radius = _radius;
    this.vertical_slices = _vertical_slices;
    this.horizontal_slices = _horizontal_slices;

    this.size_vertices_buffer = (this.vertical_slices + 1) * (this.horizontal_slices - 1) + 2 * this.vertical_slices; //(n + 1) * (n - 1) + 2 * n

    this.vertices = new Float32Array(this.size_vertices_buffer * 3);
    this.calculateVertices();

    this.size_indices_buffer = 2 * 3 * this.vertical_slices + 6 * this.vertical_slices * (this.horizontal_slices - 2); // 2 * 3 * n + 6 * n * ( n - 2 )
//    this.size_indices_buffer = 2 * 3 * this.vertical_slices + 2 * (this.vertical_slices + 1) * (this.horizontal_slices - 2); // 2 * 3 * n + 2 * ( n + 1 ) * ( n - 2 )
    this.indices = new Uint16Array(this.size_indices_buffer);
    this.calculateVertexIndices();

    for(var i = 0; i < this.size_indices_buffer; i++){
        this.indices[i] /= 3;
    }

    this.createObjectBuffers(gl, vertex_loc);
}