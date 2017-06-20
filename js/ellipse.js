var container = document.getElementById("ellipse_placement");

var width = window.innerWidth/2;
var height = window.innerWidth/2;
var renderer = new THREE.WebGLRenderer({canvas: container, antialias: true });
renderer.setSize(width, height);

var scene = new THREE.Scene;

// Draws cube just to test
var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x1ec876 });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.rotation.y = Math.PI * 45 / 180;
scene.add(cube);


var material = new THREE.LineBasicMaterial({color:0xd21212, opacity:1});
var ellipse = new THREE.EllipseCurve(0, 0, 10, 50, 0, 2.0 * Math.PI, false);
var ellipsePath = new THREE.CurvePath();
ellipsePath.add(ellipse);
var ellipseGeometry = ellipsePath.createPointsGeometry(100);
ellipseGeometry.computeTangents();
var line = new THREE.Line(ellipseGeometry, material);
line.position.x = 10;
scene.add( line );

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

var StrctPlaneGeometry1 = new THREE.PlaneGeometry( 5, 120, 32 );
var StrctPlaneMaterial1 = new THREE.MeshBasicMaterial( {color: 0xd21212, side: THREE.DoubleSide} );
var StrctPlane1 = new THREE.Mesh( StrctPlaneGeometry1, StrctPlaneMaterial1 );
StrctPlane1.position.x=-87;
StrctPlane1.position.y=0;
scene.add( StrctPlane1 );

var StrctPlaneGeometry2 = new THREE.PlaneGeometry( 5, 120, 32 );
var StrctPlaneMaterial2 = new THREE.MeshBasicMaterial( {color: 0xd21212, side: THREE.DoubleSide} );
var StrctPlane2 = new THREE.Mesh( StrctPlaneGeometry1, StrctPlaneMaterial1 );
StrctPlane2.position.x=-10;
StrctPlane2.position.y=0;
scene.add( StrctPlane2 );

var SpanWidthX = Math.abs(StrctPlane1.position.x-StrctPlane2.position.x);
var CenterX = (StrctPlane1.position.x+StrctPlane2.position.x)/2;
var SpanWidthY = 5;

var HowMany = 20;
var objects = [];
var SphereGeometry = new THREE.SphereGeometry( 3, 32, 32 );
var SphereMaterial = new THREE.MeshBasicMaterial( {color: 0x7f9ad4} );
for (var i=0; i<HowMany; i++){
  var sphere = new THREE.Mesh( SphereGeometry, SphereMaterial );
  sphere.position.x = Math.random()*SpanWidthX+StrctPlane1.position.x;
  sphere.position.y = Math.random()*SpanWidthY;
  scene.add( sphere );
  objects.push(sphere);
}

var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);

controls = new THREE.TrackballControls( camera );
				controls.rotateSpeed = 1.0;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;
				controls.noZoom = false;
				controls.noPan = false;
				controls.staticMoving = true;
				controls.dynamicDampingFactor = 0.3;

camera.position.y = 100;
camera.position.z = 400;

scene.add(camera);

var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xdfe3e3, side: THREE.BackSide });
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

scene.add(skybox);

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 300, 200);

scene.add(pointLight);

camera.lookAt(cube.position);

var clock = new THREE.Clock;

var cubes = [];
cubes.push(cube);

var dragControls = new THREE.DragControls( cubes, camera, renderer.domElement );
dragControls.addEventListener( 'dragstart', function ( event ) { controls.enabled = false; } );
dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = true; } );

var count =0;
var ToGoX = [];
var ToGoY = [];
var initX = [];
var initY = [];
var t =0;
var Time=0.00001; // Decreasing will speed up the sphere movement
function render() {
    renderer.render(scene, camera);
    cube.rotation.y -= clock.getDelta();
    count+=clock.getDelta();

    if ((count>=Time) && (count<2*Time)) {

      if (ToGoX.length==0) {
        for (var i=0; i<HowMany; i++) {
          ToGoX.push((Math.random()-0.5)*SpanWidthX+CenterX);
          ToGoY.push((Math.random()-0.5)*SpanWidthY+objects[i].position.y);
          initX.push(objects[i].position.x);
          initY.push(objects[i].position.y);
        }
      }
      // It would be better to calculate a delta and only sum with the
      // current position instead of the linear interpolation on the fly
      t = (count-Time)/Time;
      for (var j=0; j<HowMany; j++) {
        objects[j].position.x = (1-t)*initX[j] + t*ToGoX[j];
        objects[j].position.y = (1-t)*initY[j] + t*ToGoY[j];
      }
    }
    else if (count>2*Time){
      SpanWidthY++;
      count = 0;
      ToGoX.length = 0;
      ToGoY.length = 0;
      initX.length = 0;
      initY.length = 0;
    }

    if (cubes[0].position.x>=110) {
      cubes[0].position.x=100;
    }
    requestAnimationFrame(render);
}

render();
