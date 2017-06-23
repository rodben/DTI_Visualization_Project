var Multiplanar = function() {
		    _webGLFriendly = true;
    try {
        // try to create and initialize a 3D renderer
        this.r = new X.renderer3D();
        this.r.container = 'scalar_index_multiplanar_fa';
				this.r.bgColor = [.15, .15, .15];
        this.r.init();
    } catch (Exception) {

    // no webgl on this machine
    _webGLFriendly = false;

    }

		this.fa_volume = new X.volume();
		this.fa_volume.file = 'volumes/dti_FA.nii.gz';

		this.fa_slice_x_index = this.fa_volume.indexX;
		this.fa_slice_y_index = this.fa_volume.indexY;
		this.fa_slice_z_index = this.fa_volume.indexZ;

		//Create Bounding Box
		 this.box = new X.object();
     this.box.points = new X.triplets(72);
     this.box.normals = new X.triplets(72);

}

Multiplanar.prototype.multiplanar_view = function() {


		//Add volume to render
		this.r.add(this.fa_volume);

		// callbacks
    var _this = this;

		
		
    // attach event!
    // the onShowtime method gets executed after all files were fully loaded and
    // just before the first rendering attempt
    this.r.onShowtime = function() {
        // Hide Y and Z slices
        //_this.fa_volume.children[1]['visible'] = false;
        //_this.fa_volume.children[2]['visible'] = false;

        // CREATE Bounding Box
        var res = [_this.fa_volume.bbox[0],_this.fa_volume.bbox[2],_this.fa_volume.bbox[4]];
        var res2 = [_this.fa_volume.bbox[1],_this.fa_volume.bbox[3],_this.fa_volume.bbox[5]];

       
        _this.box.type = 'LINES';
        _this.box.points.add(res2[0], res[1], res2[2]);
        _this.box.points.add(res[0], res[1], res2[2]);
        _this.box.points.add(res2[0], res2[1], res2[2]);
        _this.box.points.add(res[0], res2[1], res2[2]);
        _this.box.points.add(res2[0], res[1], res[2]);
        _this.box.points.add(res[0], res[1], res[2]);
        _this.box.points.add(res2[0], res2[1], res[2]);
        _this.box.points.add(res[0], res2[1], res[2]);
        _this.box.points.add(res2[0], res[1], res2[2]);
        _this.box.points.add(res2[0], res[1], res[2]);
        _this.box.points.add(res[0], res[1], res2[2]);
        _this.box.points.add(res[0], res[1], res[2]);
        _this.box.points.add(res2[0], res2[1], res2[2]);
        _this.box.points.add(res2[0], res2[1], res[2]);
        _this.box.points.add(res[0], res2[1], res2[2]);
        _this.box.points.add(res[0], res2[1], res[2]);
        _this.box.points.add(res2[0], res2[1], res2[2]);
        _this.box.points.add(res2[0], res[1], res2[2]);
        _this.box.points.add(res[0], res2[1], res2[2]);
        _this.box.points.add(res[0], res[1], res2[2]);
        _this.box.points.add(res[0], res2[1], res[2]);
        _this.box.points.add(res[0], res[1], res[2]);
        _this.box.points.add(res2[0], res2[1], res[2]);
        _this.box.points.add(res2[0], res[1], res[2]);
        for ( var i = 0; i < 24; ++i) {
            _this.box.normals.add(0, 0, 0);
        }
        _this.r.add(_this.box);

        var center = [_this.fa_volume.bbox[0] + (_this.fa_volume.bbox[1]-_this.fa_volume.bbox[0]),
              _this.fa_volume.bbox[2] + (_this.fa_volume.bbox[3]-_this.fa_volume.bbox[2]),
              _this.fa_volume.bbox[4] + (_this.fa_volume.bbox[5]-_this.fa_volume.bbox[4])
              ]

        // time to create the GUI!
//        gui = new xslicegui(_this.r, _this.volume, _this.box);
//        gui.create();

    };

//    // hide waiting screen after first render!
//    this.r.onRender = function(){
//        var loadingDiv = document.getElementById('loading');
//        loadingDiv.style.display = 'none';
//        
//    }

    // adjust the camera position a little bit, just for visualization purposes
    this.r.camera.position = [270, 250, 330];

    this.r.render();
}

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
