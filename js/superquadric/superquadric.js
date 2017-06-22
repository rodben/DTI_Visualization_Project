// ColoredCube.js (c) 2012 matsuda
// Vertex shader program
var Superquadric = function()
{
    this.VSHADER_SOURCE =
        'uniform mat4 projectionMatrix;\n' +
        'uniform mat4 viewMatrix;\n' +
        'uniform mat4 modelMatrix;\n' +
        'uniform mat4 eigenvector;\n' +
        'uniform mat4 eigenvalue;\n' +
        'uniform mat4 normalMatrix;\n' +

        'attribute vec4 position;\n' +
        'attribute vec3 normal;\n' +
        'attribute vec4 color;\n' +

        'uniform float alpha;\n' +
        'uniform float beta;\n' +
        'uniform int mode;\n' +

        'varying vec3 frag_normal;\n' +

        'const float rad_180 = 3.1415926535897932384626433832795; // 180º\n' +
        'const float rad_90 = 1.570796327; //90º\n' +
        'const float rad_270 = 4.71238898; //270º\n' +
        'const float rad_360 = rad_180 * 2.0;\n' +

        'float sgn(float v)\n' +
        '{\n' +
            'if ( v < 0.0 )\n' +
                'return -1.0;\n' +
            'else\n' +
                'return 1.0;\n' +
        '}\n' +

        'void main(void)\n' +
        '{\n' +
            'float theta = position.x;\n' +
            'float phi = position.y;\n' +
            'float cos_theta = cos(position.x);\n' +
            'float cos_phi = cos(position.y);\n' +
            'float sin_theta = sin(position.x);\n' +
            'float sin_phi = sin(position.y);\n' +

            'float sgn_cos_theta = sgn(cos_theta);\n' +
            'float sgn_sin_theta = sgn(sin_theta);\n' +
            'float sgn_sin_phi = sgn(sin_phi);\n' +
            'float sgn_cos_phi = sgn(cos_phi);\n' +

            'float abs_cos_theta = abs(cos_theta);\n' +
            'float abs_sin_theta = abs(sin_theta);\n' +
            'float abs_sin_phi = abs(sin_phi);\n' +
            'float abs_cos_phi = abs(cos_phi);\n' +

            'vec4 vertex;\n' +
            'vec3 normal;\n' +

            'if(mode == 1)\n' +
            '{\n' +
                'vertex = vec4(sgn_cos_theta * pow(abs_cos_theta, alpha) * sgn_sin_phi * pow(abs_sin_phi, beta),\n' +
                              'sgn_sin_theta * pow(abs_sin_theta, alpha) * sgn_sin_phi * pow(abs_sin_phi, beta),\n' +
                              'sgn_cos_phi * pow(abs_cos_phi, beta), 1.0 );\n' +

                'normal = vec3(0.0);\n' +

                'float cos_theta_alpha_plus_1  = sgn_cos_theta * pow(abs_cos_theta, (alpha + 1.0));\n' +
                'float cos_theta_alpha_minus_1 = sgn_cos_theta * pow(abs_cos_theta, (alpha - 1.0));\n' +
                'float sin_theta_alpha_plus_1  = sgn_sin_theta * pow(abs_sin_theta, (alpha + 1.0));\n' +
                'float sin_theta_alpha_minus_1 = sgn_sin_theta * pow(abs_sin_theta, (alpha - 1.0));\n' +
                'float sin_phi_beta_plus_1     = sgn_sin_phi * pow(abs_sin_phi, (beta + 1.0));\n' +
                'float cos_phi_beta_minus_1    = sgn_cos_phi * pow(abs_cos_phi, (beta - 1.0));\n' +
                'float sin_phi_2beta_minus_1   = sgn_sin_phi * pow(abs_sin_phi, (2.0 * beta - 1.0));\n' +

                'normal = vec3(alpha * beta * cos_theta * cos_phi_beta_minus_1 * sin_theta_alpha_minus_1 * sin_phi_beta_plus_1,\n' +
                              'alpha * beta * cos_theta_alpha_minus_1 * cos_phi_beta_minus_1 * sin_theta * sin_phi_beta_plus_1,\n' +

                              'alpha * beta * cos_theta_alpha_plus_1 * cos_phi * sin_theta_alpha_minus_1 * sin_phi_2beta_minus_1 +\n' +
                              'alpha * beta * cos_theta_alpha_minus_1 * cos_phi * sin_theta_alpha_plus_1 * sin_phi_2beta_minus_1);\n' +

                'if(phi < rad_90)\n' +
                '{\n' +
                    'if(theta > rad_90 && theta <= rad_180)\n' +
                         'normal = vec3(normal.x, -normal.y, -normal.z);\n' +

                    'if(theta > rad_180 && theta <= rad_270)\n' +
                         'normal = vec3(-normal.x, -normal.y, normal.z);\n' +

                    'if(theta > rad_270 && theta <= rad_360)\n' +
                         'normal = vec3(-normal.x, normal.y, -normal.z);\n' +

                '} else {\n' +

                    'if(theta > 0.0 && theta <= rad_90)\n' +
                        'normal = vec3(-normal.x, -normal.y, normal.z);\n' +

                    'if(theta > rad_90 && theta <= rad_180)\n' +
                         'normal = vec3(-normal.x, normal.y, -normal.z);\n' +

                    'if(theta > rad_180 && theta <= rad_270)\n' +
                         'normal = vec3(normal.x, normal.y, normal.z);\n' +

                    'if(theta > rad_270 && theta <= rad_360)\n' +
                         'normal = vec3(normal.x, -normal.y, -normal.z);\n' +
                '}\n' +

           '} else {\n' +

                'vertex = vec4(sgn_cos_phi * pow(abs_cos_phi, beta),\n' +
                             '-sgn_sin_theta * pow(abs_sin_theta, alpha) * sgn_sin_phi * pow(abs_sin_phi, beta),\n' +
                              'sgn_cos_theta * pow(abs_cos_theta, alpha) * sgn_sin_phi * pow(abs_sin_phi, beta), 1.0 );\n' +

                'normal = vec3(0.0);\n' +

                'float cos_theta_alpha_plus_1  = sgn_cos_theta * pow(abs_cos_theta, (alpha + 1.0));\n' +
                'float cos_theta_alpha_minus_1 = sgn_cos_theta * pow(abs_cos_theta, (alpha - 1.0));\n' +
                'float sin_theta_alpha_plus_1  = sgn_sin_theta * pow(abs_sin_theta, (alpha + 1.0));\n' +
                'float sin_theta_alpha_minus_1 = sgn_sin_theta * pow(abs_sin_theta, (alpha - 1.0));\n' +
                'float sin_phi_beta_plus_1     = sgn_sin_phi * pow(abs_sin_phi, (beta + 1.0));\n' +
                'float cos_phi_beta_minus_1    = sgn_cos_phi * pow(abs_cos_phi, (beta - 1.0));\n' +
                'float sin_phi_2beta_minus_1   = sgn_sin_phi * pow(abs_sin_phi, (2.0 * beta - 1.0));\n' +

                'normal = vec3(alpha * beta * cos_theta_alpha_plus_1 * cos_phi * sin_theta_alpha_minus_1 * sin_phi_2beta_minus_1 +\n' +
                              'alpha * beta * cos_theta_alpha_minus_1 * cos_phi * sin_theta_alpha_plus_1 * sin_phi_2beta_minus_1,\n' +

                              '-alpha * beta * cos_theta_alpha_minus_1 * cos_phi_beta_minus_1 * sin_theta * sin_phi_beta_plus_1,\n' +
                              'alpha * beta * cos_theta * cos_phi_beta_minus_1 * sin_theta_alpha_minus_1 * sin_phi_beta_plus_1);\n' +

                'if(phi < rad_90)\n' +
                '{\n' +
                    'if(theta > rad_90 && theta <= rad_180)\n' +
                        'normal = vec3(-normal.x, -normal.y, normal.z);\n' +

                    'if(theta > rad_180 && theta <= rad_270)\n' +
                        'normal = vec3(normal.x, -normal.y, -normal.z);\n' +

                    'if(theta > rad_270 && theta <= rad_360)\n' +
                        'normal = vec3(-normal.x, normal.y, -normal.z);\n' +

                '} else {\n' +

                    'if(theta > 0.0 && theta <= rad_90)\n' +
                        'normal = vec3(normal.x, -normal.y, -normal.z);\n' +

                    'if(theta > rad_90 && theta <= rad_180)\n' +
                        'normal = vec3(-normal.x, normal.y, -normal.z);\n' +

                    'if(theta > rad_270 && theta <= rad_360)\n' +
                        'normal = vec3(-normal.x, -normal.y, normal.z);\n' +
                '}\n' +

            '}\n' +

            'mat4 aux_matrix = viewMatrix * modelMatrix * eigenvector * eigenvalue;\n' +
            'gl_Position = projectionMatrix * aux_matrix * vertex;\n' +

            'frag_normal = mat3(normalMatrix) * normal;\n' +
        '}'
    ;

    // Fragment shader program
    this.FSHADER_SOURCE =
      '#ifdef GL_ES\n' +
      'precision mediump float;\n' +
      '#endif\n' +

    'varying vec3 frag_normal;\n' +

    'uniform vec3 Color;\n' +
    'uniform vec3 Ambient;\n' +
    'uniform vec3 LightColor;\n' +
    'uniform vec3 LightDirection; // direction toward the light\n' +
    'uniform vec3 HalfVector; // surface orientation for shiniest spots\n' +
    'uniform float Shininess; // exponent for sharping highlights\n' +
    'uniform float Strength; // extra factor to adjust shininess\n' +

    'void main()\n' +
    '{\n' +
        'vec3 normal = normalize(frag_normal);\n' +
        '// compute cosine of the directions, using dot products,\n' +
        '// to see how much light would be reflected\n' +
        'float diffuse = max(0.0, dot(normal, LightDirection));\n' +
        'float specular = max(0.0, dot(normal, HalfVector));\n' +
        '// surfaces facing away from the light (negative dot products)\n' +
        '// won’t be lit by the directional light\n' +
        'if (diffuse == 0.0)\n' +
            'specular = 0.0;\n' +
        'else\n' +
            'specular = pow(specular, Shininess); // sharpen the highlight\n' +

        'vec3 scatteredLight = Ambient + LightColor * diffuse;\n' +
        'vec3 reflectedLight = LightColor * specular * Strength;\n' +
        '// don’t modulate the underlying color with reflected light,\n' +
        '// only with scattered light\n' +
        'vec3 rgb = min(Color.rgb * scatteredLight + reflectedLight, vec3(1.0));\n' +
        'gl_FragColor = vec4(rgb, 1.0);\n' +
    '}'
    ;
    
    this.eigen_1 = 0.5;
    this.eigen_2 = 0.5;
    this.eigen_3 = 0.5;
    
    this.update_tensor_flag = false;
}

Superquadric.prototype.create = function() {
  // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    if (!initShaders(gl, this.VSHADER_SOURCE, this.FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }
    
    var program = gl.program;
    var positionLoc    = gl.getAttribLocation(program, "position");
    var normalLoc      = gl.getAttribLocation(program, "normal");
//    var colorLoc       = gl.getAttribLocation(gl.program, "color");
    
    this.projMatrixLoc = gl.getUniformLocation(gl.program, "projectionMatrix");
    this.viewMatrixLoc = gl.getUniformLocation(gl.program, "viewMatrix");
    this.modelMatrixLoc = gl.getUniformLocation(gl.program, "modelMatrix");
    this.normalMatrixloc = gl.getUniformLocation(gl.program, "normalMatrix");
    
    this.proj_matrix = new Matrix4;
    this.view_matrix = new Matrix4;
    this.rot_matrix = new Matrix4;
    this.model_matrix = new Matrix4;
    
    this.model_matrix.setScale(1.3, 1.3, 1.);
    this.rot_matrix.setRotate(0.4, 1.0, 0.0, 0.0);
    this.proj_matrix.setOrtho(-1.5, 1.5, -1.5, 1.5, 0.0, 6.0);
    this.view_matrix.setLookAt(0.0, 0.0, 3.0,     0.0, 0.0, 0.0,      0.0, 1.0, 0.0);
    
    gl.uniformMatrix4fv(this.projMatrixLoc, gl.FALSE, this.proj_matrix.elements);
    gl.uniformMatrix4fv(this.viewMatrixLoc, gl.FALSE, this.view_matrix.elements);
    
    this.createSuperquadricVertexBuffer(gl, positionLoc, 31, 31);
    this.initLighting(gl);
    

    this.initTensorAttr(gl);
    
    gl.clearColor(0.0, 0.45, 0.5, 1.0);
    
    // Set the clear color and enable the depth test
    gl.enable(gl.DEPTH_TEST);
    
    gl.enable(gl.CULL_FACE);
    gl.depthFunc(gl.LEQUAL);
    
//    gl.enable(gl.POLYGON_OFFSET_FILL);
//    gl.polygonOffset(1.0, 1.0); // Set the polygon offset

    var _this = this;
    var tick = function()
    {
        _this.draw(gl, program);
        requestAnimationFrame(tick);// Request that the browser calls tick
        
        document.getElementById("span_linear").innerHTML = _this.linear_ind.toFixed(4);
        document.getElementById("span_planar").innerHTML = _this.planar_ind.toFixed(4);
        document.getElementById("span_spherical").innerHTML = _this.spherical_ind.toFixed(4);
    };
    
    tick();
    
}

Superquadric.prototype.draw = function(gl, program)
{
    gl.useProgram(program);
    if(this.update_tensor_flag)
    {
        this.update_tensor_flag = false;
        this.initTensorAttr(gl);
    }
    
    // Clear color and depth buffer
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    this.model_matrix = this.model_matrix.multiply(this.rot_matrix);
    
    var normalMatrix = new Matrix4;
    normalMatrix.multiply(this.view_matrix).multiply(this.model_matrix).multiply(this.tensor_matrix);
    normalMatrix.invert();
    normalMatrix.transpose();
    
    gl.uniformMatrix4fv(this.modelMatrixLoc, gl.FALSE, this.model_matrix.elements);
    gl.uniformMatrix4fv(this.normalMatrixloc, gl.FALSE, normalMatrix.elements);
    
    // Draw the glyph    
    gl.drawElements(gl.TRIANGLES, this.size_indices_buffer, gl.UNSIGNED_SHORT, 0);
}

//#################################################################################################################################

Superquadric.prototype.initTensorAttr = function(gl)
{
    var alpha_loc = gl.getUniformLocation(gl.program, "alpha");
    var beta_loc  = gl.getUniformLocation(gl.program, "beta");
    var mode_loc  = gl.getUniformLocation(gl.program, "mode");
    this.eigenvalue_loc  = gl.getUniformLocation(gl.program, "eigenvalue");
    this.eigenvector_loc  = gl.getUniformLocation(gl.program, "eigenvector");

    var sharpness = 3.0;
    this.linear_ind = (this.eigen_1 - this.eigen_2) / (this.eigen_1 + this.eigen_2 + this.eigen_3);
    this.planar_ind = 2.0 * (this.eigen_2 - this.eigen_3) / (this.eigen_1 + this.eigen_2 + this.eigen_3);
    this.spherical_ind = 3.0 * (this.eigen_3) / (this.eigen_1 + this.eigen_2 + this.eigen_3);
    
    if(this.linear_ind >= this.planar_ind)
    {
        gl.uniform1f(alpha_loc, Math.pow((1.0 - this.planar_ind), sharpness));
        gl.uniform1f(beta_loc,  Math.pow((1.0 - this.linear_ind), sharpness));
        gl.uniform1i(mode_loc, 2);

    } else {

        gl.uniform1f(alpha_loc, Math.pow((1.0 - this.linear_ind), sharpness));
        gl.uniform1f(beta_loc, Math.pow((1.0 - this.planar_ind), sharpness));
        gl.uniform1i(mode_loc, 1);
    }
    
    this.eigenvalue = new Matrix4;
    this.eigenvalue.setScale(this.eigen_1 / this.eigen_1, this.eigen_2 / this.eigen_1, this.eigen_3 / this.eigen_1);
    
    this.eigenvector = new Matrix4;    
    this.eigenvector.elements[0] = -0.286319;  this.eigenvector.elements[1] = -0.238457; this.eigenvector.elements[2] =  0.927987; this.eigenvector.elements[3] = 0.0;
    this.eigenvector.elements[4] =  0.087994;  this.eigenvector.elements[5] =  0.957898; this.eigenvector.elements[6] =  0.273293; this.eigenvector.elements[7] = 0.0;
    this.eigenvector.elements[8] = -0.954085;  this.eigenvector.elements[9] =  0.159906; this.eigenvector.elements[10] = -0.253281; this.eigenvector.elements[11] = 0.0;
    this.eigenvector.elements[12] = 0.0;       this.eigenvector.elements[13] = 0.0;      this.eigenvector.elements[14] = 0.0;       this.eigenvector.elements[15] = 1.0;

//    eigenvalue = eigenvalue.setIdentity();
//    eigenvector = eigenvector.setIdentity();
    gl.uniformMatrix4fv(this.eigenvalue_loc, gl.FALSE, this.eigenvalue.elements);
    gl.uniformMatrix4fv(this.eigenvector_loc, gl.TRUE, this.eigenvector.elements);
    
    this.tensor_matrix = new Matrix4;
    this.tensor_matrix.set(this.eigenvector);
    this.tensor_matrix = this.tensor_matrix.multiply(this.eigenvalue);
}

Superquadric.prototype.initLighting = function(gl)
{
    var color_loc           = gl.getUniformLocation(gl.program, "Color");
    var ambient_loc         = gl.getUniformLocation(gl.program, "Ambient");
    var light_color_loc     = gl.getUniformLocation(gl.program, "LightColor");
    var light_direction_loc = gl.getUniformLocation(gl.program, "LightDirection");
    var half_vector_loc     = gl.getUniformLocation(gl.program, "HalfVector");
    var shininess_loc       = gl.getUniformLocation(gl.program, "Shininess");
    var strength_loc        = gl.getUniformLocation(gl.program, "Strength");

    var color = new Float32Array([0.996062, 0.0575172, 0.0674649]);
    var ambient = new Float32Array([0.05, 0.05, 0.05]);
    var light_color = new Float32Array([0.7, 0.7, 0.7]);
    var light_direction = new Vector3([0.0, 0.0, 1.0]);
    var viewer_direction = new Vector3([0.0, 0.0, 1.0]);
    var half_vector = new Vector3([light_direction[0] + viewer_direction[0], light_direction[1] + viewer_direction[1], light_direction[2] + viewer_direction[2]]).normalize();
    var shininess = 10.0;
    var strength = 0.3;

    gl.uniform3fv(color_loc, color);
    gl.uniform3fv(ambient_loc, ambient);
    gl.uniform3fv(light_color_loc, light_color);
    gl.uniform3fv(light_direction_loc, light_direction.elements);
    gl.uniform3fv(half_vector_loc, half_vector.elements);
    gl.uniform1f(shininess_loc, shininess);
    gl.uniform1f(strength_loc, strength);
}

Superquadric.prototype.calculateVertices = function()
{

    var inc_theta = 2.0 * Math.PI / this.vertical_slices;
    var inc_phi = Math.PI / this.horizontal_slices;
    var theta = 0.0, phi =  inc_phi;
    var eps = Math.PI / 10000000.0;

    var flag_add_eps_to_phi = false;
    var iter_to_add_phi = 0;
    if((this.horizontal_slices % 2) == 0)
    {
        flag_add_eps_to_phi = true;
        iter_to_add_phi = this.horizontal_slices / 2;
    }

    var flag_add_eps_to_theta = false;
    var iter_to_add_theta = 0;
    if((this.vertical_slices % 4) == 0)
    {
        flag_add_eps_to_theta = true;
        iter_to_add_theta = this.vertical_slices / 4;

    }else if((this.vertical_slices % 2) == 0) {

        flag_add_eps_to_theta = true;
        iter_to_add_theta = this.vertical_slices / 2;
    }

    var vertices_pos = 0;

    //Pólo inferior
    for(var i = 0; i < this.vertical_slices; i++)
    {
        this.vertices[vertices_pos++] = eps;
        this.vertices[vertices_pos++] = eps;
        this.vertices[vertices_pos++] = 0.0;
        
//        text = " " + vertices[vertices_pos - 3] + " " + vertices[vertices_pos - 2] + " " + vertices[vertices_pos - 1];
//        console.log(text);
    }

    for(i = 1; i < this.horizontal_slices; i++)
    {
        theta = 0.0;
        if(flag_add_eps_to_phi && (iter_to_add_phi == i))
            phi = phi - eps;

        for(var j = 0; j < this.vertical_slices; j++)
        {
            if((flag_add_eps_to_theta && ((j % iter_to_add_theta) == 0)))
                theta = theta - eps;

            if((j == 0))
                theta = eps;

            this.vertices[vertices_pos++] = theta;
            this.vertices[vertices_pos++] = phi;
            this.vertices[vertices_pos++] = 0.0;
            
//            text = " " + vertices[vertices_pos - 3] + " " + vertices[vertices_pos - 2] + " " + vertices[vertices_pos - 1];
//            console.log(text);

            if((flag_add_eps_to_theta && ((j % iter_to_add_theta) == 0)))
                theta = theta + eps;

            if((j == 0))
                theta = 0.0;

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

        if(flag_add_eps_to_phi && (iter_to_add_phi == i))
            phi = phi + eps;

        phi += inc_phi;
    }

    //Pólo superior
    for(i = 0; i < this.vertical_slices; i++)
    {
        this.vertices[vertices_pos++] = 0.0 + eps;
        this.vertices[vertices_pos++] = Math.PI - eps;
        this.vertices[vertices_pos++] = 0.0;
        
//        text = " " + vertices[vertices_pos - 3] + " " + vertices[vertices_pos - 2] + " " + vertices[vertices_pos - 1];
//        console.log(text);
    }
}

Superquadric.prototype.calculateVertexIndices = function(){

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

Superquadric.prototype.createObjectBuffers = function(gl, vertex_loc)
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

Superquadric.prototype.createSuperquadricVertexBuffer = function(gl, vertex_loc, _vertical_slices, _horizontal_slices)
{
    if(_vertical_slices < 3)
        _vertical_slices = 3;

    if(_horizontal_slices < 3)
        _horizontal_slices = 3;

    this.vertical_slices = _vertical_slices;
    this.horizontal_slices = _horizontal_slices;

    this.size_vertices_buffer = (this.vertical_slices + 1) * (this.horizontal_slices - 1) + 2 * this.vertical_slices; //(n + 1) * (n - 1) + 2 * n

    this.vertices = new Float32Array(this.size_vertices_buffer * 3);
    this.calculateVertices();

    this.size_indices_buffer = 2 * 3 * this.vertical_slices + 6 * this.vertical_slices * (this.horizontal_slices - 2); // 2 * 3 * n + 6 * n * ( n - 2 )
    this.indices = new Uint16Array(this.size_indices_buffer);
    this.calculateVertexIndices();

    for(var i = 0; i < this.size_indices_buffer; i++){
        this.indices[i] /= 3;
    }

    this.createObjectBuffers(gl, vertex_loc);
}

Superquadric.prototype.eigenvalue01Handler = function(x)
{
	this.eigen_1 = parseFloat(document.getElementById(x).value);
    this.update_tensor_flag = true;
    if(this.eigen_1 < this.eigen_2)
    {
        this.eigen_2 = this.eigen_1;
        document.getElementById("eigenvalue_02").value = this.eigen_1;       
    }
    
    if(this.eigen_1 < this.eigen_3)
    {
        this.eigen_3 = this.eigen_1;
        document.getElementById("eigenvalue_03").value = this.eigen_1;       
    }
}

Superquadric.prototype.eigenvalue02Handler = function(x)
{
	this.eigen_2 = parseFloat(document.getElementById(x).value);
    this.update_tensor_flag = true;
    if(this.eigen_2 < this.eigen_3)
    {
        this.eigen_3 = this.eigen_2;
        document.getElementById("eigenvalue_03").value = this.eigen_2;       
    }
    
    if(this.eigen_2 > this.eigen_1)
    {
        this.eigen_1 = this.eigen_2;
        document.getElementById("eigenvalue_01").value = this.eigen_2;       
    }
}

Superquadric.prototype.eigenvalue03Handler = function(x)
{
	this.eigen_3 = parseFloat(document.getElementById(x).value);
    this.update_tensor_flag = true;
    
    if(this.eigen_3 > this.eigen_2)
    {
        this.eigen_2 = this.eigen_3;
        document.getElementById("eigenvalue_02").value = this.eigen_3;       
    }
    
    if(this.eigen_3 > this.eigen_1)
    {
        this.eigen_1 = this.eigen_3;
        document.getElementById("eigenvalue_01").value = this.eigen_3;       
    }
}