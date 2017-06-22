window.onload = function() {

    //
    // try to create the 3D renderer
    //
    _webGLFriendly = true;
    try {
        // try to create and initialize a 3D renderer
        threeD = new X.renderer3D();
        threeD.container = '3d_tractography';
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
  
  	// .. add the fibers
  	threeD.add(fibers);

    // start the loading/rendering
    //sliceX.render();
		threeD.render();


};
