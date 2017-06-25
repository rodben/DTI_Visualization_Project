window.onload = function() {
    
		var colormap_a = new Colormap('webgl_colormap_abs', 1);
    colormap_a.create();
		
		var colormap_b = new Colormap('webgl_colormap_boy', 2);
    colormap_b.create();
		
		var colormap_c = new Colormap('webgl_colormap_mirror', 3);
    colormap_c.create();

		var colormap_d = new Colormap('webgl_colormap_no_sym', 4);
    colormap_d.create();

		var colormap_e = new Colormap('webgl_colormap_rot_sym', 5);
    colormap_e.create();

		var colormap_f = new Colormap('webgl_colormap_raph', 6);
    colormap_f.create();

    var superquadric = new Superquadric();
    superquadric.create();

		var full_brain = new Tractography('threeD_fullbrain_visual', 1);
		full_brain.tractography_render_3d();

		var big_fibers = new Tractography('threeD_big_fibers_visual', 2);
		big_fibers.tractography_render_3d();
	
		var multiplanar = new Multiplanar();
		multiplanar.multiplanar_view();

		var render_grad = new Grad_render();   
    render_grad.load_grad_render();

		//var main_volume_renderer_grad = new Main_volume_renderer_grad();   
    //main_volume_renderer_grad.load_vol_render();

		document.getElementById("fa_x_slice_index").oninput = function() { multiplanar.FAsliceXHandler("fa_x_slice_index"); };
		document.getElementById("fa_y_slice_index").oninput = function() { multiplanar.FAsliceYHandler("fa_y_slice_index"); };
		document.getElementById("fa_z_slice_index").oninput = function() { multiplanar.FAsliceZHandler("fa_z_slice_index"); };

		document.getElementById("md_x_slice_index").oninput = function() { multiplanar.MDsliceXHandler("md_x_slice_index"); };
		document.getElementById("md_y_slice_index").oninput = function() { multiplanar.MDsliceYHandler("md_y_slice_index"); };
		document.getElementById("md_z_slice_index").oninput = function() { multiplanar.MDsliceZHandler("md_z_slice_index"); };
    
    document.getElementById("eigenvalue_01").oninput = function() { superquadric.eigenvalue01Handler("eigenvalue_01"); };
    document.getElementById("eigenvalue_02").oninput = function() { superquadric.eigenvalue02Handler("eigenvalue_02"); };
    document.getElementById("eigenvalue_03").oninput = function() { superquadric.eigenvalue03Handler("eigenvalue_03"); };

    document.getElementById("gradients_sel").onchange = function() { render_grad.select_grad_render("gradients_sel"); };

}
