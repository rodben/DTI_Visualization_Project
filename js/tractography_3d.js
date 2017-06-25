var Tractography = function(canvasID, trackID)
{
		
		this.elementid = canvasID;
		if(trackID ==  1) {
			this.track_file = 'volumes/raphael.trk';
			this.caption = 'Full Brain Fibers'
		} else {
			this.track_file = 'volumes/raphael_70.trk';
			this.caption = 'Brain Fibers with lenght bigger than 70mm'
		}
	
		this.fiber = new X.fibers();
		this.fiber.file  = this.track_file;

		// Try to create the 3D renderer
    _webGLFriendly = true;
    try {
        // try to create and initialize a 3D renderer
        this.threeD = new X.renderer3D();
        this.threeD.container = this.elementid;
        this.threeD.init();
    } catch (Exception) {

    // no webgl on this machine
    _webGLFriendly = false;

    }

}

Tractography.prototype.tractography_render_3d = function() {


  	this.fiber.caption = this.caption;
		this.fiber.opacity = 0.8;

  	// Add the fibers
  	this.threeD.add(this.fiber);

    // start the loading/rendering
    //sliceX.render();
		this.threeD.camera.position = [65, 75, 110];
		this.threeD.render();

}

Tractography.prototype.change_linewidth = function(x) {
		this.fiber.linewidth = parseFloat(document.getElementById(x).value);
		this.threeD.render();
}
