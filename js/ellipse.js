var container = document.getElementById("ellipse_placement");

// Get window size and set renderer size
var width = window.innerWidth;
var height = window.innerHeight;
var renderer = new THREE.WebGLRenderer({canvas: container, antialias: true });
renderer.setSize(width, height);


window.addEventListener( 'resize', onWindowResize, false );

var scene = new THREE.Scene;
scene.background = new THREE.Color( 0xdfe3e3 );


// It's not an ellipsoid yet, but it will be
var EllipseGeometry = new THREE.SphereGeometry( 10, 100, 100 );
EllipseGeometry.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 1.0, 1.5 ) );
var EllipseMaterial = new THREE.MeshLambertMaterial( {color: 0xd21212} );
var StrctEllipse = new THREE.Mesh( EllipseGeometry, EllipseMaterial );
var IsoEllipse = new THREE.Mesh( EllipseGeometry, EllipseMaterial );
StrctEllipse.position.x=-width/2 + 0.4*width;
StrctEllipse.position.y=0;
IsoEllipse.position.x = +0.3*width;
IsoEllipse.position.y = 0;
scene.add(IsoEllipse);
scene.add(StrctEllipse);

// Structure Planes, produces an anisotropic diffusion
var PlanesWidth = 5;
var StrctPlaneGeometry1 = new THREE.PlaneGeometry( PlanesWidth, 300, 32 );
var StrctPlaneMaterial1 = new THREE.MeshLambertMaterial( {color: 0xd21212, side: THREE.DoubleSide} );
var StrctPlane1 = new THREE.Mesh( StrctPlaneGeometry1, StrctPlaneMaterial1 );
StrctPlane1.position.x=-width/2 + 0.2*width;
StrctPlane1.position.y=0;
scene.add( StrctPlane1 );

var StrctPlaneGeometry2 = new THREE.PlaneGeometry( PlanesWidth, 300, 32 );
var StrctPlaneMaterial2 = new THREE.MeshLambertMaterial( {color: 0xd21212, side: THREE.DoubleSide} );
var StrctPlane2 = new THREE.Mesh( StrctPlaneGeometry1, StrctPlaneMaterial1 );
StrctPlane2.position.x= StrctPlane1.position.x+width*0.06;
StrctPlane2.position.y=0;
scene.add( StrctPlane2 );

var HowMany = 200;
var AniSpheres = [];
var IsoSpheres = [];
var SphereRadius = 3;
var MaxSpanWidthX = Math.abs(StrctPlane1.position.x-StrctPlane2.position.x)
                -Math.abs(PlanesWidth+SphereRadius/2);
var AniCenterX = (StrctPlane1.position.x+StrctPlane2.position.x)/2;
var IsoCenterX = width*0.1;
var MinLimitX = StrctPlane1.position.x+PlanesWidth/2+SphereRadius;
var MaxLimitX = StrctPlane2.position.x-PlanesWidth/2-SphereRadius;
var IniSpanWidth = 5;
var SpanWidthY = IniSpanWidth;
var SpanWidthX = IniSpanWidth;
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
var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
camera.position.y = 0;
camera.position.z = 1000;
scene.add(camera);

// Light
var pointLight = new THREE.PointLight(0xffffff);
var zpos = 5000;
pointLight.position.set(0, 0, zpos);
scene.add(pointLight);

var clock = new THREE.Clock;

var count = 0; // Counts the time passed
var AniToGoX=[], AniToGoY=[], AniInitX=[], AniInitY=[];
var IsoToGoX=[], IsoToGoY=[], IsoInitX=[], IsoInitY=[];
var t = 0; // Position on the interpolation line
var Time = 10; // Decreasing will speed up the spheres movement
var i =0, j=0; // Loop counters
var AniRamPosX=0, AniRamPosY=0; // Random Positions of X and Y
var IsoRamPosX=0, IsoRamPosY=0;
var AniSumX=0, AniSumY=0;
var IsoSumX=0, IsoSumY=0;
var RestartFlag = 0;
var aux=0;
StrctEllipse.scale.set(2.5,2.5,1.0);

IsoEllipse.scale.set(2.5,2.5,1.0);
function render() {

    renderer.render(scene, camera);
    count++;

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

      if (AniSumY > AniSumX*5) {
        RestartAnimation();
      }
      AniSumX=0;
      AniSumY=0;
      IsoSumX=0;
      IsoSumY=0;
    }
    else if (count>=2*Time){
      SpanWidthY++;
      if (SpanWidthX<MaxSpanWidthX){
        SpanWidthX++;
      }
      count = Time;
      AniToGoX.length = 0; AniToGoY.length = 0; AniInitX.length = 0; AniInitY.length = 0;
      AniSumX = 0; AniSumY = 0;
      IsoToGoX.length = 0; IsoToGoY.length = 0; IsoInitX.length = 0; IsoInitY.length = 0;
      IsoSumX = 0; IsoSumY = 0;
    }


    requestAnimationFrame(render);
}

function RestartAnimation(){
  SpanWidthX = IniSpanWidth;
  SpanWidthY = IniSpanWidth;
  for (i=0; i<2*HowMany;i++){
    if (i<HowMany) {
      AniSpheres[i].position.x = Math.random()*SpanWidthX+AniCenterX;
      AniSpheres[i].position.y = Math.random()*SpanWidthY;
    }
    else{
      IsoSpheres[i-HowMany].position.x = Math.random()*SpanWidthX+IsoCenterX;
      IsoSpheres[i-HowMany].position.y = Math.random()*SpanWidthY;
    }
  }
  count = 0; // Counts the time passed
  AniToGoX.length=0; AniToGoY.length=0; AniInitX.length=0; AniInitY.length=0;
  IsoToGoX.length=0; IsoToGoY.length=0; IsoInitX.length=0; IsoInitY.length=0;
  t = 0; // Position on the interpolation line
  i =0; j=0; // Loop counters
  AniRamPosX=0; AniRamPosY=0; // Random Positions of X and Y
  IsoRamPosX=0; IsoRamPosY=0;
  AniSumX=0; AniSumY=0;
  IsoSumX=0; IsoSumY=0;
  RestartFlag = 0;
  aux=0;
  StrctEllipse.scale.set(2.5,2.5,1.0);
  IsoEllipse.scale.set(2.5,2.5,1.0);

}

function onWindowResize(){
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
  renderer.setSize( width, height );
}

render();
