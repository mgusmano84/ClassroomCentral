    $(document).ready(function(){
    	var app = {
		currentURL: window.location.origin,
		}


    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });


    $('#makeComment').on('click',function(){
		$('#commentModal').modal('show');
	return false;
	});





})