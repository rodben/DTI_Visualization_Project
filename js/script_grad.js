var Grad_render = function()
{

    _webGLFriendly = true;
    
    //
    try {
        // create the 2D renderers
        // .. for the X orientation
        this.sliceX = new X.renderer2D();
        this.sliceX.container = 'sliceX_grad';
        this.sliceX.orientation = 'X';
        this.sliceX.init();
    } catch (Exception) {

        // no webgl on this machine
        _webGLFriendly = false;

    }
    
    // .. for Y
    this.sliceY = new X.renderer2D();
    this.sliceY.container = 'sliceY_grad';
    this.sliceY.orientation = 'Y';
    this.sliceY.init();
    
    // .. and for Z
    this.sliceZ = new X.renderer2D();
    this.sliceZ.container = 'sliceZ_grad';
    this.sliceZ.orientation = 'Z';
    this.sliceZ.init();
    
    //
    // THE VOLUME DATA
    //
    // create a X.volume
    this.grad_volume = new X.volume();
    // .. and attach the single-file dicom in .NRRD format
    // this works with gzip/gz/raw encoded NRRD files but XTK also supports other
    // formats like MGH/MGZ
    //volume.file = "volume/20150509_181941VBM6minSENSEs501a1005.nii.gz";

    this.grad_volume.file = 'volumes/test4d_0.nii.gz';
    
}

Grad_render.prototype.load_grad_render = function() {

    // add the volume in the main renderer
    // we choose the sliceX here, since this should work also on
    // non-webGL-friendly devices like Safari on iOS
    this.sliceX.add(this.grad_volume);

    // start the loading/rendering
    this.sliceX.render();

    //_____________________________________________________________________________________________________________
    //#############################################################################################################
    //_____________________________________________________________________________________________________________
    
    //
    // THE GUI
    //
    // the onShowtime method gets executed after all files were fully loaded and
    // just before the first rendering attempt
    
   var _this = this;    

    this.sliceX.onShowtime = function() {

        _this.sliceY.add(_this.grad_volume);
        _this.sliceY.render();
        _this.sliceZ.add(_this.grad_volume);
        _this.sliceZ.render();

    };

    // hide waiting screen after first render!

	//sliceX.onRender = function()
    //{
	//	var loadingDiv = document.getElementById('loading');
	//	loadingDiv.style.display = 'none';
	//}  
  
}


var Grad_render15 = function()
{

    _webGLFriendly = true;
    
    //
    try {
        // create the 2D renderers
        // .. for the X orientation
        this.sliceX = new X.renderer2D();
        this.sliceX.container = 'sliceX_grad15';
        this.sliceX.orientation = 'X';
        this.sliceX.init();
    } catch (Exception) {

        // no webgl on this machine
        _webGLFriendly = false;

    }
    
    // .. for Y
    this.sliceY = new X.renderer2D();
    this.sliceY.container = 'sliceY_grad15';
    this.sliceY.orientation = 'Y';
    this.sliceY.init();
    
    // .. and for Z
    this.sliceZ = new X.renderer2D();
    this.sliceZ.container = 'sliceZ_grad15';
    this.sliceZ.orientation = 'Z';
    this.sliceZ.init();
    
    //
    // THE VOLUME DATA
    //
    // create a X.volume
    this.grad_volume = new X.volume();
    // .. and attach the single-file dicom in .NRRD format
    // this works with gzip/gz/raw encoded NRRD files but XTK also supports other
    // formats like MGH/MGZ
    //volume.file = "volume/20150509_181941VBM6minSENSEs501a1005.nii.gz";

    this.grad_volume.file = 'volumes/test4d_15.nii.gz';
    
}

Grad_render15.prototype.load_grad_render15 = function() {

    // add the volume in the main renderer
    // we choose the sliceX here, since this should work also on
    // non-webGL-friendly devices like Safari on iOS
    this.sliceX.add(this.grad_volume);

    // start the loading/rendering
    this.sliceX.render();

    //_____________________________________________________________________________________________________________
    //#############################################################################################################
    //_____________________________________________________________________________________________________________
    
    //
    // THE GUI
    //
    // the onShowtime method gets executed after all files were fully loaded and
    // just before the first rendering attempt
    
   var _this = this;    

    this.sliceX.onShowtime = function() {

        _this.sliceY.add(_this.grad_volume);
        _this.sliceY.render();
        _this.sliceZ.add(_this.grad_volume);
        _this.sliceZ.render();

    };

    // hide waiting screen after first render!

	//sliceX.onRender = function()
    //{
	//	var loadingDiv = document.getElementById('loading');
	//	loadingDiv.style.display = 'none';
	//}  
  
}
