window.onload = function() {
    
		var colormap = new Colormap();
    colormap.create();
	
    var superquadric = new Superquadric();
    superquadric.create();

		var tractography = new Tractography();
		tractography.tractography_render_3d();

		var multiplanar = new Multiplanar();
		multiplanar.multiplanar_view();

		var render_grad = new Grad_render();   
    render_grad.load_grad_render();

		//var main_volume_renderer_grad = new Main_volume_renderer_grad();   
    //main_volume_renderer_grad.load_vol_render();
    
    document.getElementById("eigenvalue_01").oninput = function() { superquadric.eigenvalue01Handler("eigenvalue_01"); };
    document.getElementById("eigenvalue_02").oninput = function() { superquadric.eigenvalue02Handler("eigenvalue_02"); };
    document.getElementById("eigenvalue_03").oninput = function() { superquadric.eigenvalue03Handler("eigenvalue_03"); };

    document.getElementById("gradients_sel").onchange = function() { render_grad.select_grad_render("gradients_sel"); };

}
