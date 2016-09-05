    $(document).ready(function(){
    	var app = {
		currentURL: window.location.origin,
		}


    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });


    $('#makePost').on('click',function(){
		$('#postModal').modal('show');
	return false;
	});



    //submits modal form and stores input in group object
    $('#postSubmit').on('click',function(){
       
            var post = "";
            post = $('#postMain').val().trim();
            //post section
            $.post(app.currentURL + "/addPost", post,
                function(data){
                    if(data){
                    $('#postModal').modal('hide');
                }
                });

            console.log(group);
            return false;
    }); // end of post modal form





})