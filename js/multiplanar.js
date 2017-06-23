var Multiplanar = function() {

/********** FA Related ****************/
		    _webGLFriendly = true;
    try {
        // try to create and initialize a 3D renderer
        this.r = new X.renderer3D();
        this.r.container = 'scalar_index_multiplanar_fa';
				this.r.bgColor = [.15, .15, .15];
        this.r.init();

        this.render_md = new X.renderer3D();
        this.render_md.container = 'scalar_index_multiplanar_md';
				this.render_md.bgColor = [.15, .15, .15];
        this.render_md.init();
    } catch (Exception) {

    // no webgl on this machine
    _webGLFriendly = false;

    }

		this.fa_volume = new X.volume();
		this.fa_volume.file = 'volumes/dti_FA.nii.gz';

		this.fa_slice_x_index = this.fa_volume.indexX;
		this.fa_slice_y_index = this.fa_volume.indexY;
		this.fa_slice_z_index = this.fa_volume.indexZ;

		//Create Bounding Box for FA volume
		 this.box_fa = new X.object();
     this.box_fa.points = new X.triplets(72);
     this.box_fa.normals = new X.triplets(72);

/********** MD Related ****************/


		this.md_volume = new X.volume();
		this.md_volume.file = 'volumes/dti_MD.nii.gz';

		this.md_slice_x_index = this.md_volume.indexX;
		this.md_slice_y_index = this.md_volume.indexY;
		this.md_slice_z_index = this.md_volume.indexZ;

		//Create Bounding Box for FA volume
		 this.box_md = new X.object();
     this.box_md.points = new X.triplets(72);
     this.box_md.normals = new X.triplets(72);



}

Multiplanar.prototype.multiplanar_view = function() {

//----------------------------------------------------------------------------------------//
/******************************************* FA Related **********************************/
//---------------------------------------------------------------------------------------//		

		//Add volume to render
		this.r.add(this.fa_volume);

		// callbacks
    var _this = this;
		
    // attach event!
    // the onShowtime method gets executed after all files were fully loaded and
    // just before the first rendering attempt
    this.r.onShowtime = function() {

        // CREATE Bounding Box
        var res = [_this.fa_volume.bbox[0],_this.fa_volume.bbox[2],_this.fa_volume.bbox[4]];
        var res2 = [_this.fa_volume.bbox[1],_this.fa_volume.bbox[3],_this.fa_volume.bbox[5]];

       
        _this.box_fa.type = 'LINES';
        _this.box_fa.points.add(res2[0], res[1], res2[2]);
        _this.box_fa.points.add(res[0], res[1], res2[2]);
        _this.box_fa.points.add(res2[0], res2[1], res2[2]);
        _this.box_fa.points.add(res[0], res2[1], res2[2]);
        _this.box_fa.points.add(res2[0], res[1], res[2]);
        _this.box_fa.points.add(res[0], res[1], res[2]);
        _this.box_fa.points.add(res2[0], res2[1], res[2]);
        _this.box_fa.points.add(res[0], res2[1], res[2]);
        _this.box_fa.points.add(res2[0], res[1], res2[2]);
        _this.box_fa.points.add(res2[0], res[1], res[2]);
        _this.box_fa.points.add(res[0], res[1], res2[2]);
        _this.box_fa.points.add(res[0], res[1], res[2]);
        _this.box_fa.points.add(res2[0], res2[1], res2[2]);
        _this.box_fa.points.add(res2[0], res2[1], res[2]);
        _this.box_fa.points.add(res[0], res2[1], res2[2]);
        _this.box_fa.points.add(res[0], res2[1], res[2]);
        _this.box_fa.points.add(res2[0], res2[1], res2[2]);
        _this.box_fa.points.add(res2[0], res[1], res2[2]);
        _this.box_fa.points.add(res[0], res2[1], res2[2]);
        _this.box_fa.points.add(res[0], res[1], res2[2]);
        _this.box_fa.points.add(res[0], res2[1], res[2]);
        _this.box_fa.points.add(res[0], res[1], res[2]);
        _this.box_fa.points.add(res2[0], res2[1], res[2]);
        _this.box_fa.points.add(res2[0], res[1], res[2]);
        for ( var i = 0; i < 24; ++i) {
            _this.box_fa.normals.add(0, 0, 0);
        }
        _this.r.add(_this.box_fa);

        var center = [_this.fa_volume.bbox[0] + (_this.fa_volume.bbox[1]-_this.fa_volume.bbox[0]),
              _this.fa_volume.bbox[2] + (_this.fa_volume.bbox[3]-_this.fa_volume.bbox[2]),
              _this.fa_volume.bbox[4] + (_this.fa_volume.bbox[5]-_this.fa_volume.bbox[4])
              ]
		}

    // adjust the camera position a little bit, just for visualization purposes
    this.r.camera.position = [270, 250, 330];

    this.r.render();

//----------------------------------------------------------------------------------------//
/******************************************* MD Related **********************************/
//---------------------------------------------------------------------------------------//		

		//Add volume to render
		this.render_md.add(this.md_volume);

		// callbacks
    var _this = this;
		
    // attach event!
    // the onShowtime method gets executed after all files were fully loaded and
    // just before the first rendering attempt
    this.render_md.onShowtime = function() {

        // CREATE Bounding Box
        var res = [_this.md_volume.bbox[0],_this.md_volume.bbox[2],_this.md_volume.bbox[4]];
        var res2 = [_this.md_volume.bbox[1],_this.md_volume.bbox[3],_this.md_volume.bbox[5]];

       
        _this.box_md.type = 'LINES';
        _this.box_md.points.add(res2[0], res[1], res2[2]);
        _this.box_md.points.add(res[0], res[1], res2[2]);
        _this.box_md.points.add(res2[0], res2[1], res2[2]);
        _this.box_md.points.add(res[0], res2[1], res2[2]);
        _this.box_md.points.add(res2[0], res[1], res[2]);
        _this.box_md.points.add(res[0], res[1], res[2]);
        _this.box_md.points.add(res2[0], res2[1], res[2]);
        _this.box_md.points.add(res[0], res2[1], res[2]);
        _this.box_md.points.add(res2[0], res[1], res2[2]);
        _this.box_md.points.add(res2[0], res[1], res[2]);
        _this.box_md.points.add(res[0], res[1], res2[2]);
        _this.box_md.points.add(res[0], res[1], res[2]);
        _this.box_md.points.add(res2[0], res2[1], res2[2]);
        _this.box_md.points.add(res2[0], res2[1], res[2]);
        _this.box_md.points.add(res[0], res2[1], res2[2]);
        _this.box_md.points.add(res[0], res2[1], res[2]);
        _this.box_md.points.add(res2[0], res2[1], res2[2]);
        _this.box_md.points.add(res2[0], res[1], res2[2]);
        _this.box_md.points.add(res[0], res2[1], res2[2]);
        _this.box_md.points.add(res[0], res[1], res2[2]);
        _this.box_md.points.add(res[0], res2[1], res[2]);
        _this.box_md.points.add(res[0], res[1], res[2]);
        _this.box_md.points.add(res2[0], res2[1], res[2]);
        _this.box_md.points.add(res2[0], res[1], res[2]);
        for ( var i = 0; i < 24; ++i) {
            _this.box_md.normals.add(0, 0, 0);
        }
        _this.render_md.add(_this.box_md);

        var center = [_this.md_volume.bbox[0] + (_this.md_volume.bbox[1]-_this.md_volume.bbox[0]),
              _this.md_volume.bbox[2] + (_this.md_volume.bbox[3]-_this.md_volume.bbox[2]),
              _this.md_volume.bbox[4] + (_this.md_volume.bbox[5]-_this.md_volume.bbox[4])
              ]
		}
    // adjust the camera position a little bit, just for visualization purposes
    this.render_md.camera.position = [270, 250, 330];

    this.render_md.render();

}


//--------------------------  FA  ----------------------------------------------------//

Multiplanar.prototype.FAsliceXHandler = function(x)
{
	
	//Update index with value
	this.fa_slice_x_index = parseFloat(document.getElementById(x).value);
	this.fa_volume.indexX = this.fa_slice_x_index;
	//Render again	
	this.r.render();

}

Multiplanar.prototype.FAsliceYHandler = function(x)
{
	
	//Update index with value
	this.fa_slice_y_index = parseFloat(document.getElementById(x).value);
	this.fa_volume.indexY = this.fa_slice_y_index;
	//Render again	
	this.r.render();

}  

Multiplanar.prototype.FAsliceZHandler = function(x)
{
	
	//Update index with value
	this.fa_slice_z_index = parseFloat(document.getElementById(x).value);
	this.fa_volume.indexZ = this.fa_slice_z_index;
	//Render again	
	this.r.render();

}

//--------------------------  MD  ----------------------------------------------------//

Multiplanar.prototype.MDsliceXHandler = function(x)
{
	
	//Update index with value
	this.md_slice_x_index = parseFloat(document.getElementById(x).value);
	this.md_volume.indexX = this.md_slice_x_index;
	//Render again	
	this.render_md.render();

}

Multiplanar.prototype.MDsliceYHandler = function(x)
{
	
	//Update index with value
	this.md_slice_y_index = parseFloat(document.getElementById(x).value);
	this.md_volume.indexY = this.md_slice_y_index;
	//Render again	
	this.render_md.render();

}  

Multiplanar.prototype.MDsliceZHandler = function(x)
{
	
	//Update index with value
	this.md_slice_z_index = parseFloat(document.getElementById(x).value);
	this.md_volume.indexZ = this.md_slice_z_index;
	//Render again	
	this.render_md.render();

}            
