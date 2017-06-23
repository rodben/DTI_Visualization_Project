var container = document.getElementById("ellipse_placement");

// Get window size and set renderer size
var width = window.innerWidth/2;
var height = window.innerWidth/2;
var renderer = new THREE.WebGLRenderer({canvas: container, antialias: true });
renderer.setSize(width, height);

window.addEventListener( 'resize', onWindowResize, false );

var scene = new THREE.Scene;

// Draws cube just to test
var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x1ec876 });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.rotation.y = Math.PI * 45 / 180;
cube.position.x = 100;
cube.position.y = -100;
// scene.add(cube);

// It's not an ellipsoid yet, but it will be
var EllipseGeometry = new THREE.SphereGeometry( 10, 100, 100 );
EllipseGeometry.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 1.0, 1.5 ) );
var EllipseMaterial = new THREE.MeshLambertMaterial( {color: 0xd21212} );
var StrctEllipse = new THREE.Mesh( EllipseGeometry, EllipseMaterial );
var IsoEllipse = new THREE.Mesh( EllipseGeometry, EllipseMaterial );
StrctEllipse.position.x=-50;
StrctEllipse.position.y=0;
IsoEllipse.position.x = 100;
IsoEllipse.position.y = 0;
scene.add(IsoEllipse);
scene.add(StrctEllipse);


// Planos representando o volume que está sendo medido, tirei a ideia de um site
// mas não está muito claro pra explicar o que é, então acho que vou tirar
// var PlaneGeometry1 = new THREE.PlaneGeometry( 7, 100, 32 );// Left
// var PlaneMaterial1 = new THREE.MeshBasicMaterial( {color: 0x8b8b8b, side: THREE.DoubleSide} );
// var Plane1 = new THREE.Mesh( PlaneGeometry1, PlaneMaterial1 );
// Plane1.position.x=-97;
// Plane1.position.y=0;
// Plane1.position.z=-1;
// scene.add( Plane1 );
// var PlaneGeometry2 = new THREE.PlaneGeometry( 7, 100, 32 );//Right
// var PlaneMaterial2 = new THREE.MeshBasicMaterial( {color: 0x8b8b8b, side: THREE.DoubleSide} );
// var Plane2 = new THREE.Mesh( PlaneGeometry2, PlaneMaterial2 );
// Plane2.position.x=0;
// Plane2.position.y=0;
// Plane2.position.z=-1;
// scene.add( Plane2 );
// var PlaneGeometry3 = new THREE.PlaneGeometry( 100, 7, 32 );//Top
// var PlaneMaterial3 = new THREE.MeshBasicMaterial( {color: 0x8b8b8b, side: THREE.DoubleSide} );
// var Plane3 = new THREE.Mesh( PlaneGeometry3, PlaneMaterial3 );
// Plane3.position.x=-47;
// Plane3.position.y=47;
// Plane3.position.z=-1;
// scene.add( Plane3 );
// var PlaneGeometry4 = new THREE.PlaneGeometry( 100, 7, 32 );//Bottom
// var PlaneMaterial4 = new THREE.MeshBasicMaterial( {color: 0x8b8b8b, side: THREE.DoubleSide} );
// var Plane4 = new THREE.Mesh( PlaneGeometry4, PlaneMaterial4 );
// Plane4.position.x=-47;
// Plane4.position.y=-47;
// Plane4.position.z=-1;
// scene.add( Plane4 );

var PlanesWidth = 5;
var StrctPlaneGeometry1 = new THREE.PlaneGeometry( PlanesWidth, 300, 32 );
var StrctPlaneMaterial1 = new THREE.MeshLambertMaterial( {color: 0xd21212, side: THREE.DoubleSide} );
var StrctPlane1 = new THREE.Mesh( StrctPlaneGeometry1, StrctPlaneMaterial1 );
StrctPlane1.position.x=-150;
StrctPlane1.position.y=0;
scene.add( StrctPlane1 );

var StrctPlaneGeometry2 = new THREE.PlaneGeometry( PlanesWidth, 300, 32 );
var StrctPlaneMaterial2 = new THREE.MeshLambertMaterial( {color: 0xd21212, side: THREE.DoubleSide} );
var StrctPlane2 = new THREE.Mesh( StrctPlaneGeometry1, StrctPlaneMaterial1 );
StrctPlane2.position.x=-100;
StrctPlane2.position.y=0;
scene.add( StrctPlane2 );

var HowMany = 200;
var AniSpheres = [];
var IsoSpheres = [];
var SphereRadius = 3;
var MaxSpanWidthX = Math.abs(StrctPlane1.position.x-StrctPlane2.position.x)
                -Math.abs(PlanesWidth+SphereRadius/2);
var AniCenterX = (StrctPlane1.position.x+StrctPlane2.position.x)/2;
var IsoCenterX = 30;
var MinLimitX = StrctPlane1.position.x+PlanesWidth/2+SphereRadius;
var MaxLimitX = StrctPlane2.position.x-PlanesWidth/2-SphereRadius;
var SpanWidthY = 5;
var SpanWidthX = 5;
var SphereGeometry = new THREE.SphereGeometry( SphereRadius, 32, 32 );
var SphereMaterial = new THREE.MeshLambertMaterial( {color: 0x7f9ad4} );
var sphere=null;

for (var i=0; i<2*HowMany; i++){
  sphere = new THREE.Mesh( SphereGeometry, SphereMaterial );
  sphere.position.y = Math.random()*SpanWidthY; // +CenterY=0
  if (i<HowMany) {
    sphere.position.x = Math.random()*SpanWidthX+AniCenterX;
    scene.add( sphere );
    AniSpheres.push(sphere);
  }
  else {
    sphere.position.x = Math.random()*SpanWidthX+IsoCenterX;
    scene.add( sphere );
    IsoSpheres.push(sphere);
  }
}

// Camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.y = 0;
camera.position.z = 400;
scene.add(camera);

// Code for drag controls
controls = new THREE.TrackballControls( camera );
				controls.rotateSpeed = 1.0;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;
				controls.noZoom = false;
				controls.noPan = false;
				controls.staticMoving = true;
				controls.dynamicDampingFactor = 0.3;

// Skybox background
var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xdfe3e3, side: THREE.BackSide });
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);

// Light
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 200, 200);
scene.add(pointLight);

var clock = new THREE.Clock;

var cubes = [];
cubes.push(cube);
var dragControls = new THREE.DragControls( cubes, camera, renderer.domElement );
dragControls.addEventListener( 'dragstart', function ( event ) { controls.enabled = false; } );
dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = true; } );

var count = 0; // Counts the time passed
var AniToGoX=[], AniToGoY=[], AniInitX=[], AniInitY=[];
var IsoToGoX=[], IsoToGoY=[], IsoInitX=[], IsoInitY=[];
var t = 0; // Position on the interpolation line
var Time = 0.00005; // Decreasing will speed up the spheres movement
var i =0, j=0; // Loop counters
var AniRamPosX=0, AniRamPosY=0; // Random Positions of X and Y
var IsoRamPosX=0, IsoRamPosY=0;
var AniSumX=0, AniSumY=0;
var IsoSumX=0, IsoSumY=0;
var RestartFlag = 0;
var aux=0;
function render() {
    renderer.render(scene, camera);
    cube.rotation.y -= clock.getDelta();
    count+=clock.getDelta();

    if ((count>=Time) && (count<2*Time)) {
      if (AniToGoX.length==0) {
        for (i=0; i<HowMany*2; i++) {
            if (i<HowMany) {
            // All the calculations should work for positive and negative positions values
            // but they were tested only for the negative ones.
            AniRamPosX = (Math.random()-0.5)*SpanWidthX+AniSpheres[i].position.x;
            AniRamPosY = (Math.random()-0.5)*SpanWidthY+AniSpheres[i].position.y;
            // Something like a conservation of momentum:
            if (AniRamPosX > MaxLimitX) {
              AniRamPosX = - Math.abs(AniRamPosX - MaxLimitX) + MaxLimitX;
              if (AniRamPosX < MinLimitX) { // But it stops in the second wall hit
                // to avoid a lot of calculations. This should only occur if the planes are very close
                // to each other
                AniRamPosX = MinLimitX;
              }
            }
            else if (AniRamPosX < MinLimitX) {
              AniRamPosX = Math.abs(MinLimitX-AniRamPosX) + MinLimitX;
              if (AniRamPosX > MaxLimitX) {
                AniRamPosX = MaxLimitX;
              }
            }
            AniToGoX.push(AniRamPosX);
            AniToGoY.push(AniRamPosY);
            AniInitX.push(AniSpheres[i].position.x);
            AniInitY.push(AniSpheres[i].position.y);
          }
          else {
            aux = i-HowMany;
            // SpanWidthY increases with no boundaries, so it can be reused
            IsoRamPosX = (Math.random()-0.5)*SpanWidthY+IsoSpheres[aux].position.x;
            IsoRamPosY = (Math.random()-0.5)*SpanWidthY+IsoSpheres[aux].position.y;
            IsoToGoX.push(IsoRamPosX);
            IsoToGoY.push(IsoRamPosY);
            IsoInitX.push(IsoSpheres[aux].position.x);
            IsoInitY.push(IsoSpheres[aux].position.y);
          }
        }
      }
      // It would be better to calculate a delta and only sum with the
      // current position instead of the linear interpolation on the fly
      t = (count-Time)/Time;
      for (j=0; j<HowMany*2; j++) {
        if (j<HowMany){
          AniSpheres[j].position.x = (1-t)*AniInitX[j] + t*AniToGoX[j];
          AniSpheres[j].position.y = (1-t)*AniInitY[j] + t*AniToGoY[j];
          AniSumX += Math.abs(AniSpheres[j].position.x-AniCenterX);
          AniSumY += Math.abs(AniSpheres[j].position.y);
        }
        else {
          aux = j-HowMany;
          IsoSpheres[aux].position.x = (1-t)*IsoInitX[aux] + t*IsoToGoX[aux];
          IsoSpheres[aux].position.y = (1-t)*IsoInitY[aux] + t*IsoToGoY[aux];
          IsoSumX += Math.abs(IsoSpheres[aux].position.x-IsoCenterX);
          IsoSumY += Math.abs(IsoSpheres[aux].position.y);
        }
      }

      StrctEllipse.scale.set(5*AniSumX/(AniSumX+AniSumY),5*AniSumY/(AniSumX+AniSumY),1.0);

      IsoEllipse.scale.set(5*IsoSumX/(IsoSumX+IsoSumY),5*IsoSumY/(IsoSumX+IsoSumY),1.0);

      if (AniSumY > AniSumX*10) {
        RestartFlag = 1;
        // alert("DEBUG - RESTART FLAG");
      }
      AniSumX=0;
      AniSumY=0;
      IsoSumX=0;
      IsoSumY=0;
    }
    else if (count>2*Time){
      SpanWidthY++;
      if (SpanWidthX<MaxSpanWidthX){
        SpanWidthX++;
      }
      count = 0;
      AniToGoX.length = 0; AniToGoY.length = 0; AniInitX.length = 0; AniInitY.length = 0;
      AniSumX = 0; AniSumY = 0;
      IsoToGoX.length = 0; IsoToGoY.length = 0; IsoInitX.length = 0; IsoInitY.length = 0;
      IsoSumX = 0; IsoSumY = 0;
    }

    if (cubes[0].position.x>=110) {
      cubes[0].position.x=100;
    }

    requestAnimationFrame(render);
}

function onWindowResize(){
  width = window.innerWidth/2;
  height = window.innerHeight/2;
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height );
}

render();
