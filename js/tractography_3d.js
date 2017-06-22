window.onload = function() {

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
  	fibers.file = 'volumes/dti.trk';
  	fibers.caption = 'The Corpus Callosum:<br>connecting the two hemispheres<br>of the human brain.';
//TODO Add gui to control opacity and line width	
		fibers.linewidth = fibers.linewidth * 2;
		fibers.opacity = 0.5;

  	// Add the fibers
  	threeD.add(fibers);

		//Create volume associated with fiber file
		var volume = new X.volume();
		volume.file = 'volumes/MICCAI2015_InVivo.nii';
		volume.opacity = 0.01;		//Low opacity to be able to improve rotation
		volume.volumeRendering = true;
  
		//Add The Volume
		//threeD.add(volume);

    // start the loading/rendering
    //sliceX.render();
		threeD.render();


};
