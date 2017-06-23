xslicegui = function(targetRenderer, targetVolume, bbox){
    this.renderer = targetRenderer;
    this.renderer.interactor.xsliceguiref = this;
    this.volume = targetVolume;
    this.box = bbox;

    // more
    this.sceneOrientation = 0;
    this.color = [1, 1, 1];
    this.mode = 0;
    this.bbox = true;

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
    this.volume.xNormY = 1.0;
    this.volume.xNormZ = 1.0;
    this.volume.xColor = this.color;

    //
    // The GUI panel
    //
    this.gui = new dat.GUI();
    this.setupmodegui();
    this.setupslicegui();
    this.setupnavgui();
    this.setupscenegui();
    this.updateSceneView();

}

xslicegui.prototype.setupnavgui = function(){
    this.navgui = this.gui.addFolder('Slice Selection');
    this.sliceXController = this.navgui.add(this.volume, 'indexX', 0,this.volume.range[0] - 1).name('Slice Index').listen();
    this.navgui.open();

    var _this = this;
    this.sliceXController.onChange(function(value){
        // Hide Y and Z slices
        _this.volume.children[1]['visible'] = false;
        _this.volume.children[2]['visible'] = false;
    });
}

xslicegui.prototype.setupslicegui = function(){ 
    // the following configures the gui for interacting with the X.volume
    this.volumegui = this.gui.addFolder('Volume');
    this.lowerThresholdController = this.volumegui.add(volume, 'lowerThreshold', volume.min, volume.max).name('Lower Threshold');
    this.upperThresholdController = this.volumegui.add(volume, 'upperThreshold', volume.min, volume.max).name('Upper Threshold');
    this.lowerWindowController = this.volumegui.add(volume, 'windowLow', volume.min, volume.max).name('Lower Window');
    this.upperWindowController = this.volumegui.add(volume, 'windowHigh', volume.min, volume.max).name('Lower Window');
    this.volumegui.open();
}

xslicegui.prototype.setupscenegui = function(){
    // UI
    this.scenegui = this.gui.addFolder('Slice Orientation');
    this.sceneOrientationController = this.scenegui.add(this, 'sceneOrientation', { 'Free':0, 'Sagittal':1, 'Coronal':2, 'Axial':3 } ).name('View');
    this.scenegui.open();

    // callbacks
    this.renderer.interactor.addEventListener(X.event.events.ROTATE, this.updateSceneView);

    var _this = this;
    this.sceneOrientationController.onChange(function(value){
        if(value == 1){
            // move camera
            _this.renderer.camera.position = [-400, 0, 0];
            _this.renderer.camera.up = [0, 0, 1];

            // update normals
            _this.volume.xNormX = 1; 
            _this.volume.xNormY = 0; 
            _this.volume.xNormZ = 0; 

        }
        else if(value == 2){
            // move camera
            _this.renderer.camera.position = [0, 400, 0];
            _this.renderer.camera.up = [0, 0, 1];

            // update normals
            _this.volume.xNormX = 0; 
            _this.volume.xNormY = 1; 
            _this.volume.xNormZ = 0; 
        }
        else if(value == 3){
            // move camera
            _this.renderer.camera.position = [0, 0, -400];
            _this.renderer.camera.up = [0, 1, 0];

            // update normals
            _this.volume.xNormX = 0; 
            _this.volume.xNormY = 0; 
            _this.volume.xNormZ = 1; 
        }

        // update slice and gui
        _this.volume.sliceInfoChanged(0);
        _this.sliceXController.__max = _this.volume.range[0] - 1;
    });
}

xslicegui.prototype.updateSceneView = function(){
    var _this = this;
    if (typeof this.xsliceguiref != 'undefined'){
        _this = this.xsliceguiref
    }

    // get mode
    if(_this.sliceMode.getValue() == 0 || _this.sliceMode.getValue() == 1){
        var _x = _this.renderer.camera.view[2];
        var _y = _this.renderer.camera.view[6];
        var _z = _this.renderer.camera.view[10];

        // normalize 
        var length = Math.sqrt(_x*_x + _y*_y+_z*_z);
        _this.volume.xNormX = _x/length;
        _this.volume.xNormY = _y/length;
        _this.volume.xNormZ = _z/length;

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
    this.bboxMode = this.modegui.add(this, 'bbox').name('Show Box');
    this.modegui.open();

    // callbacks
    var _this = this;

    this.bboxMode.onChange(function(value) {
        _this.box.visible = value;
    });
}

var Multiplanar = function() {
		    _webGLFriendly = true;
    try {
        // try to create and initialize a 3D renderer
        this.r = new X.renderer3D();
        this.r.container = 'scalar_index_multiplanar';
				this.r.bgColor = [.15, .15, .15];
        this.r.init();
    } catch (Exception) {

    // no webgl on this machine
    _webGLFriendly = false;

    }

		this.fa_volume = new X.volume();
		this.fa_volume.file = 'volumes/dti_FA.nii.gz';
		

}

Multiplanar.prototype.multiplanar_view = function() {


		//Add volume to render
		this.r.add(this.fa_volume);


//    // attach event!
//    // the onShowtime method gets executed after all files were fully loaded and
//    // just before the first rendering attempt
//    this.r.onShowtime = function() {
//        // Hide Y and Z slices
//        volume.children[1]['visible'] = false;
//        volume.children[2]['visible'] = false;

//        // CREATE Bounding Box
//        var res = [volume.bbox[0],volume.bbox[2],volume.bbox[4]];
//        var res2 = [volume.bbox[1],volume.bbox[3],volume.bbox[5]];

//        box = new X.object();
//        box.points = new X.triplets(72);
//        box.normals = new X.triplets(72);
//        box.type = 'LINES';
//        box.points.add(res2[0], res[1], res2[2]);
//        box.points.add(res[0], res[1], res2[2]);
//        box.points.add(res2[0], res2[1], res2[2]);
//        box.points.add(res[0], res2[1], res2[2]);
//        box.points.add(res2[0], res[1], res[2]);
//        box.points.add(res[0], res[1], res[2]);
//        box.points.add(res2[0], res2[1], res[2]);
//        box.points.add(res[0], res2[1], res[2]);
//        box.points.add(res2[0], res[1], res2[2]);
//        box.points.add(res2[0], res[1], res[2]);
//        box.points.add(res[0], res[1], res2[2]);
//        box.points.add(res[0], res[1], res[2]);
//        box.points.add(res2[0], res2[1], res2[2]);
//        box.points.add(res2[0], res2[1], res[2]);
//        box.points.add(res[0], res2[1], res2[2]);
//        box.points.add(res[0], res2[1], res[2]);
//        box.points.add(res2[0], res2[1], res2[2]);
//        box.points.add(res2[0], res[1], res2[2]);
//        box.points.add(res[0], res2[1], res2[2]);
//        box.points.add(res[0], res[1], res2[2]);
//        box.points.add(res[0], res2[1], res[2]);
//        box.points.add(res[0], res[1], res[2]);
//        box.points.add(res2[0], res2[1], res[2]);
//        box.points.add(res2[0], res[1], res[2]);
//        for ( var i = 0; i < 24; ++i) {
//            box.normals.add(0, 0, 0);
//        }
//        r.add(box);

//        var center = [volume.bbox[0] + (volume.bbox[1]-volume.bbox[0]),
//              volume.bbox[2] + (volume.bbox[3]-volume.bbox[2]),
//              volume.bbox[4] + (volume.bbox[5]-volume.bbox[4])
//              ]

//        // time to create the GUI!
//        gui = new xslicegui(r, volume, box);
//        gui.create();

//    };

//    // hide waiting screen after first render!
//    r.onRender = function(){
//        var loadingDiv = document.getElementById('loading');
//        loadingDiv.style.display = 'none';
//        
//    }

    // adjust the camera position a little bit, just for visualization purposes
    this.r.camera.position = [270, 250, 330];

    this.r.render();
};    
