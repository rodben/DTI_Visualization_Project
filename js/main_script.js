window.onload = function() {
    
	var colormap = new Colormap();
    colormap.create();
	
    var superquadric = new Superquadric();
    superquadric.create();
    
    document.getElementById("eigenvalue_01").oninput = function() { superquadric.eigenvalue01Handler("eigenvalue_01"); };
    document.getElementById("eigenvalue_02").oninput = function() { superquadric.eigenvalue02Handler("eigenvalue_02"); };
    document.getElementById("eigenvalue_03").oninput = function() { superquadric.eigenvalue03Handler("eigenvalue_03"); };

		multiplanar_view();
		tractography_render_3d();
    
}
