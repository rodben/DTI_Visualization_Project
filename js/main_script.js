window.onload = function() {
    
		var colormap = new Colormap('webgl_colormap', 1);
    colormap.create();
	
    var superquadric = new Superquadric();
    superquadric.create();

		var tractography = new Tractography();
		tractography.tractography_render_3d();

		var multiplanar = new Multiplanar();
		multiplanar.multiplanar_view();

		document.getElementById("fa_x_slice_index").oninput = function() { multiplanar.FAsliceXHandler("fa_x_slice_index"); };
		document.getElementById("fa_y_slice_index").oninput = function() { multiplanar.FAsliceYHandler("fa_y_slice_index"); };
		document.getElementById("fa_z_slice_index").oninput = function() { multiplanar.FAsliceZHandler("fa_z_slice_index"); };

		document.getElementById("md_x_slice_index").oninput = function() { multiplanar.MDsliceXHandler("md_x_slice_index"); };
		document.getElementById("md_y_slice_index").oninput = function() { multiplanar.MDsliceYHandler("md_y_slice_index"); };
		document.getElementById("md_z_slice_index").oninput = function() { multiplanar.MDsliceZHandler("md_z_slice_index"); };
    
    document.getElementById("eigenvalue_01").oninput = function() { superquadric.eigenvalue01Handler("eigenvalue_01"); };
    document.getElementById("eigenvalue_02").oninput = function() { superquadric.eigenvalue02Handler("eigenvalue_02"); };
    document.getElementById("eigenvalue_03").oninput = function() { superquadric.eigenvalue03Handler("eigenvalue_03"); };

	    
}
