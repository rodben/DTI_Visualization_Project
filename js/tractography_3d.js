var Tractography = function()
{
		this.full_fiber = new X.fibers();
		this.full_fiber.file  = 'volumes/raphael.trk';

		this.full_fiber_volume = new X.volume();
		this.full_fiber_volume.file = 'volumes/dti_dwi.nii';
			
		    //
    // try to create the 3D renderer
    //
    _webGLFriendly = true;
    try {
        // try to create and initialize a 3D renderer
        this.threeD = new X.renderer3D();
        this.threeD.container = 'threeD_tractography_visual';
        this.threeD.init();
    } catch (Exception) {

    // no webgl on this machine
    _webGLFriendly = false;

    }

}

Tractography.prototype.tractography_render_3d = function() {


  	this.full_fiber.caption = 'Full Brain Fibers';
	//TODO Add gui to control opacity and line width	
		this.full_fiber.linewidth = this.full_fiber.linewidth * 2;
		this.full_fiber.opacity = 0.8;

  	// Add the fibers
  	this.threeD.add(this.full_fiber);

		//Create volume associated with fiber file

		this.full_fiber_volume.opacity = 0.05;		//Low opacity to be able to improve rotation
		//this.full_fiber_volume.volumeRendering = true;
		this.full_fiber_volume.lowerThreshold = 0.9;
  
		//Add The Volume
		//this.threeD.add(this.full_fiber_volume);

    // start the loading/rendering
    //sliceX.render();
		this.threeD.camera.position = [65, 75, 110];
		this.threeD.render();

}
