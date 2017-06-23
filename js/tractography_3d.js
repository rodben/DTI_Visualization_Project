function tractography_render_3d() {

    //
    // try to create the 3D renderer
    //
    _webGLFriendly = true;
    try {
        // try to create and initialize a 3D renderer
        threeD = new X.renderer3D();
        threeD.container = 'threeD_tractography_visual';
        threeD.init();
    } catch (Exception) {

    // no webgl on this machine
    _webGLFriendly = false;

    }

		  // create a new X.fibers
  	var fibers = new X.fibers();
  	// .. associate the TrackVis .TRK file
  	fibers.file = 'volumes/raphael.trk';
  	fibers.caption = 'The Corpus Callosum:<br>connecting the two hemispheres<br>of the human brain.';
//TODO Add gui to control opacity and line width	
		fibers.linewidth = fibers.linewidth * 2;
		fibers.opacity = 0.8;

  	// Add the fibers
  	threeD.add(fibers);

		//Create volume associated with fiber file
		var volume = new X.volume();
		volume.file = 'volumes/dti_dwi.nii';
		volume.opacity = 0.05;		//Low opacity to be able to improve rotation
		//volume.volumeRendering = true;
		volume.lowerThreshold = 0.9;
  
		//Add The Volume
		//threeD.add(volume);

    // start the loading/rendering
    //sliceX.render();
		threeD.camera.position = [65, 75, 110];
		threeD.render();


};
