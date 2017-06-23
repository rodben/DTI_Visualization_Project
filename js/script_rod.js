window.onload = function() {

    //
    // try to create the 3D renderer
    //
    _webGLFriendly = true;
    try {
        // try to create and initialize a 3D renderer
        threeD = new X.renderer3D();
        threeD.container = '3d';
        threeD.init();
    } catch (Exception) {

    // no webgl on this machine
    _webGLFriendly = false;

    }
    
    //
    // create the 2D renderers
    // .. for the X orientation
    sliceX = new X.renderer2D();
    sliceX.container = 'sliceX';
    sliceX.orientation = 'X';
    sliceX.init();
    
    // .. for Y
    var sliceY = new X.renderer2D();
    sliceY.container = 'sliceY';
    sliceY.orientation = 'Y';
    sliceY.init();
    
    // .. and for Z
    var sliceZ = new X.renderer2D();
    sliceZ.container = 'sliceZ';
    sliceZ.orientation = 'Z';
    sliceZ.init();
    
    //
    // THE VOLUME DATA
    //
    // create a X.volume
    var volume = new X.volume();
    // .. and attach the single-file dicom in .NRRD format
    // this works with gzip/gz/raw encoded NRRD files but XTK also supports other
    // formats like MGH/MGZ
    volume.file = 'volumes/dti_FA.nii.gz';

    // add the volume in the main renderer
    // we choose the sliceX here, since this should work also on
    // non-webGL-friendly devices like Safari on iOS
    //sliceX.add(volume);
		threeD.add(volume);	

    // start the loading/rendering
    //sliceX.render();
		threeD.render();

//GUI Workable
//_____________________________________________________________________________________________________________
//#############################################################################################################
//_____________________________________________________________________________________________________________

xslicegui = function(targetRenderer, targetVolume, bbox, Xrenderer2d, Yrenderer2d, Zrenderer2d){
  this.renderer = targetRenderer;
	this.xrenderer = Xrenderer2d;
	this.yrenderer = Yrenderer2d;
	this.zrenderer = Zrenderer2d;
  this.renderer.interactor.xsliceguiref = this;
  this.volume = targetVolume;
  this.box = bbox;

  // more
  this.sceneOrientation = 0;
  this.coloring = true;
  this.color = [1, 1, 1];
  this.mode = 2;
  this.bbox = true;

  // animation 
  this.demoIntervalID = -1;

  // leap motion (lm)
  this.lmIntervalID = -1;
  this.lmController = null;

  // gui stuffs
  this.gui = null;
  // mode panel
  this.modegui = null;
  this.sliceMode = null;
  this.bboxMode = null;
  // slice panel
  this.slicegui = null;
  this.sliceXNXController = null;
  this.sliceXNYController = null;
  this.sliceXNZController = null;
  this.sliceXNCController
  // nav panel
  this.navgui = null;
  this.sliceXController = null;
  // scene panel
  this.scenegui = null;
  this.sceneOrientationController = null;
}

xslicegui.prototype.create = function(){
  // set colors and normals
  this.volume.xNormX = 1.0;
  this.volume.xNormY = 0.0;
  this.volume.xNormZ = 0.0;
  this.volume.xColor = this.color;

  //
  // The GUI panel
  //

  this.gui = new dat.GUI();
  this.setupmodegui();
  this.setupslicegui();
  this.setupscenegui();

  // start to animate!
  var _this = this;
  this.demoIntervalID = setInterval(function(){
    //_this.reslice();
    //_this.volume.sliceInfoChanged(0);
    _this.sliceXController.__max = _this.volume.range[0] - 1;},5);
}

xslicegui.prototype.setupslicegui = function(){
				
// callbacks
  var _this = this;

// the following configures the gui for interacting with the X.volume
   this.volumegui = this.gui.addFolder('Volume');
   
   // Switch between slicing and volume rendering
   this.vrController = this.volumegui.add(volume, 'volumeRendering');
		
	 // Set threshold to a small value to appear a solid volume of a brain instead of a black box
	 this.vrController.onChange(function(value) {
	 _this.volume.lowerThreshold = _this.volume.max*0.1;
   });
   
   // Configure the volume rendering opacity
   this.opacityController = this.volumegui.add(volume, 'opacity', 0, 1);
   
	 // The threshold in the min..max range
   this.lowerThresholdController = this.volumegui.add(volume, 'lowerThreshold', volume.min, volume.max).listen();
   this.upperThresholdController = this.volumegui.add(volume, 'upperThreshold', volume.min, volume.max);
   this.lowerWindowController = this.volumegui.add(volume, 'windowLow', volume.min, volume.max);
   this.upperWindowController = this.volumegui.add(volume, 'windowHigh', volume.min, volume.max);

	this.volumegui.open();
        

	this.indexgui = this.gui.addFolder('Indexes');
  // the indexX,Y,Z are the currently displayed slice indices in the range
  // 0..dimensions-1
  this.sliceXController = this.indexgui.add(volume, 'indexX', 0, volume.range[0] - 1).name('X index').listen();
  this.sliceYController = this.indexgui.add(volume, 'indexY', 0, volume.range[1] - 1).name('Y index').listen();
  this.sliceZController = this.indexgui.add(volume, 'indexZ', 0, volume.range[2] - 1).name('Z Index').listen();

	this.indexgui.open();
			

  this.slicegui = this.gui.addFolder('Color');
  this.sliceXNCController = this.slicegui.addColor(this, 'color').name('Color').listen();
  this.slicegui.open();

  this.sliceXNCController.onChange(function(value){
    if(_this.coloring){
			_this.volume.xColor = _this.color;
			_this.volume.maxColor = _this.volume.xColor;
			
			
			
    }
  });
}

xslicegui.prototype.setupscenegui = function(){

  // callbacks
  this.renderer.interactor.addEventListener(X.event.events.ROTATE, this.updateSceneView);

  var _this = this;

	//Set camera first location
	_this.renderer.camera.position = [-300, 300, 100];
  _this.renderer.camera.up = [0, 0, 1];	
}

xslicegui.prototype.updateSceneView = function(){
  var _this = this;
  if (typeof this.xsliceguiref != 'undefined'){
    _this = this.xsliceguiref
  }

  // get mode
  if(_this.sliceMode.getValue() == 1 || _this.sliceMode.getValue() == 4){
    var _x = _this.renderer.camera.view[2];
    var _y = _this.renderer.camera.view[6];
    var _z = _this.renderer.camera.view[10];
    // normalize 
    var length = Math.sqrt(_x*_x + _y*_y+_z*_z);

    _this.volume.xNormX = _x/length;
    _this.volume.xNormY = _y/length;
    _this.volume.xNormZ = _z/length;
    _this.color = [Math.abs(_this.volume.xNormZ), Math.abs(_this.volume.xNormY), Math.abs(_this.volume.xNormX)];

    if(_this.coloring){
      _this.volume.xColor = [Math.abs(_this.volume.xNormZ), Math.abs(_this.volume.xNormY), Math.abs(_this.volume.xNormX)];
      _this.volume.maxColor = [Math.abs(_this.volume.xNormZ), Math.abs(_this.volume.xNormY), Math.abs(_this.volume.xNormX)];
    }
    _this.volume.sliceInfoChanged(0);
    _this.sliceXController.__max = _this.volume.range[0] - 1;
  }

  // update navigation controller
  if(_this.sceneOrientationController.getValue() != 0){
    _this.sceneOrientationController.setValue(0);
   }
}

xslicegui.prototype.setupmodegui = function(){
  // UI
  this.modegui = this.gui.addFolder('General');
  this.sliceMode = this.modegui.add(this, 'mode', { 'Demo':0, 'Rotate Cam':1, 'Rotate Box':2, 'LeapM Palm':3, 'LeapM Point':4} ).name('Interaction Mode');
  this.bboxMode = this.modegui.add(this, 'bbox').name('Show Bounding Box');
  this.coloringMode = this.modegui.add(this, 'coloring').name('Slice Coloring');
  this.modegui.open();

  // callbacks
  var _this = this;
  this.sliceMode.onChange(function(value) {
    if (value == 0) {
      // cleanup lm interval
      clearInterval(_this.lmIntervalID);
      if(_this.lmController != null){
        _this.lmController.disconnect();
       }
      // setup demo
      var _this2 = _this;
      _this.demoIntervalID = setInterval(function(){
        _this2.reslice();
        _this2.volume.sliceInfoChanged(0);
        _this2.sliceXController.__max = _this2.volume.range[0] - 1;},5); 
    }
    else if (value == 1){
      // cleanup demo
      clearInterval(_this.demoIntervalID);
      // cleanup lm interval
      clearInterval(_this.lmIntervalID);
      if(_this.lmController != null){
        _this.lmController.disconnect();
       }

      _this.updateSceneView();
    }
    else if (value == 2){
      // cleanup demo
      clearInterval(_this.demoIntervalID);
      // cleanup lm interval
      clearInterval(_this.lmIntervalID);
      if(_this.lmController != null){
        _this.lmController.disconnect();
       }
    }
    else if(value == 3){
      // cleanup demo
      clearInterval(_this.demoIntervalID);
      // cleanup lm controller
      clearInterval(_this.lmIntervalID);
      if(_this.lmController != null){
        _this.lmController.disconnect();
       }

      var controllerOptions = {enableGestures: true};
      _this.lmController = new Leap.Controller(controllerOptions);

      _this.lmController.on('connect', function(){
        _this.lmIntervalID = setInterval(function(){
          var frame = _this.lmController.frame();
          var handString = "";
          if (frame.hands.length > 0) {
            var hand = frame.hands[0];
            _this.volume.xNormX = -hand.palmNormal[0];
            _this.volume.xNormY = hand.palmNormal[2];
            _this.volume.xNormZ = hand.palmNormal[1];
            _this.color = [Math.abs(_this.volume.xNormZ), Math.abs(_this.volume.xNormY), Math.abs(_this.volume.xNormX)];
            if(_this.coloring){
              _this.volume.xColor = [Math.abs(_this.volume.xNormZ), Math.abs(_this.volume.xNormY), Math.abs(_this.volume.xNormX)];
              _this.volume.maxColor = [Math.abs(_this.volume.xNormZ), Math.abs(_this.volume.xNormY), Math.abs(_this.volume.xNormX)];
             }
           _this.volume.sliceInfoChanged(0);
           _this.sliceXController.__max = _this.volume.range[0] - 1; 
           _this.renderer.camera.position = [-500*_this.volume.xNormX, -500*_this.volume.xNormY, -500*_this.volume.xNormZ]; 
         }
       }, 15);
     });

    _this.lmController.connect();
    // disconnect then
    }else if(value == 4){
      // cleanup demo
      clearInterval(_this.demoIntervalID);
      // cleanup lm interval
      clearInterval(_this.lmIntervalID);
      if(_this.lmController != null){
        _this.lmController.disconnect();
       }

      var controllerOptions = {enableGestures: true};
      var speedfactor = 15;
      var heightMax = 400;
      _this.lmController = new Leap.Controller(controllerOptions);

      _this.lmController.on('connect', function(){
        _this.lmIntervalID = setInterval(function(){
          var frame = _this.lmController.frame();
          if (frame.pointables.length > 0) {
            var finger = frame.pointables[0];

            //4 fingers scroll
            if(frame.pointables.length == 4){
              scroller(finger.tipPosition[0]/speedfactor, (heightMax/2 - finger.tipPosition[1])/speedfactor);
            }
            //2 fingers rotate
            else if(frame.pointables.length == 2){
              slider(finger.tipPosition[0]/speedfactor, (heightMax/2 - finger.tipPosition[1])/speedfactor);
            }

          }
        }, 10);
      });

      var slider = function(xDir, yDir) {
        var frame = _this.lmController.frame();
        _this.renderer.camera.rotate([-xDir, -yDir]);
        _this.updateSceneView();
      };
  
      var scroller = function(xDir, yDir) {
        _this.volume.indexX += yDir;
        _this.volume.children[1]['visible'] = false;
        _this.volume.children[2]['visible'] = false;
      };

    _this.lmController.connect();
    }
  });
  
  this.bboxMode.onChange(function(value) {
    _this.box.visible = value;
  });

  this.coloringMode.onChange(function(value) {
    if(value){
      _this.volume.xColor = _this.color;
      _this.volume.maxColor = _this.volume.xColor;
    }
    else{
      _this.volume.xColor = [1, 1, 1];
      _this.volume.maxColor = [1, 1, 1];
    }
    _this.volume.sliceInfoChanged(0);
  });
}

xslicegui.prototype.reslice = function(){
  var time = new Date().getTime() * 0.001;
  this.volume.xNormX = Math.cos(time);
  this.volume.xNormY = Math.cos(time*1.2);
  this.volume.xNormZ = Math.cos(time*1.5);
  this.color = [Math.abs(this.volume.xNormZ), Math.abs(this.volume.xNormY), Math.abs(this.volume.xNormX)];
  if(this.coloring){
    this.volume.xColor = [Math.abs(this.volume.xNormZ), Math.abs(this.volume.xNormY), Math.abs(this.volume.xNormX)];
    this.volume.maxColor = [Math.abs(this.volume.xNormZ), Math.abs(this.volume.xNormY), Math.abs(this.volume.xNormX)];
  }
}

//_____________________________________________________________________________________________________________
//#############################################################################################################
//_____________________________________________________________________________________________________________
    
    //
    // THE GUI
    //
    // the onShowtime method gets executed after all files were fully loaded and
    // just before the first rendering attempt
		threeD.onShowtime = function() {

			sliceY.add(volume);
      sliceY.render();
      sliceZ.add(volume);
      sliceZ.render();
			sliceX.add(volume);
			sliceX.render();			


			//Create Bounding Box
			var res = [volume.bbox[0],volume.bbox[2],volume.bbox[4]];
		  var res2 = [volume.bbox[1],volume.bbox[3],volume.bbox[5]];

		  box = new X.object();
		  box.points = new X.triplets(72);  	
		  box.normals = new X.triplets(72);
		  box.type = 'LINES';
		  box.points.add(res2[0], res[1], res2[2]);
		  box.points.add(res[0], res[1], res2[2]);
		  box.points.add(res2[0], res2[1], res2[2]);
		  box.points.add(res[0], res2[1], res2[2]);
		  box.points.add(res2[0], res[1], res[2]);
		  box.points.add(res[0], res[1], res[2]);
		  box.points.add(res2[0], res2[1], res[2]);
		  box.points.add(res[0], res2[1], res[2]);
		  box.points.add(res2[0], res[1], res2[2]);
		  box.points.add(res2[0], res[1], res[2]);
		  box.points.add(res[0], res[1], res2[2]);
		  box.points.add(res[0], res[1], res[2]);
		  box.points.add(res2[0], res2[1], res2[2]);
		  box.points.add(res2[0], res2[1], res[2]);
		  box.points.add(res[0], res2[1], res2[2]);
		  box.points.add(res[0], res2[1], res[2]);
		  box.points.add(res2[0], res2[1], res2[2]);
		  box.points.add(res2[0], res[1], res2[2]);
		  box.points.add(res[0], res2[1], res2[2]);
		  box.points.add(res[0], res[1], res2[2]);
		  box.points.add(res[0], res2[1], res[2]);
		  box.points.add(res[0], res[1], res[2]);
		  box.points.add(res2[0], res2[1], res[2]);
		  box.points.add(res2[0], res[1], res[2]);
		  for ( var i = 0; i < 24; ++i) {
		    box.normals.add(0, 0, 0);
		  }
			threeD.add(box)

			// time to create the GUI!
    gui = new xslicegui(threeD, volume, box, this.sliceX, this.sliceY, this.sliceZ);
    gui.create();

		};  
  
};
