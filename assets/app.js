$(document).ready(function(){
    	
		currentURL = window.location.origin;
		


    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });


    $('#makePost').on('click',function(){
		$('#postModal').modal('show');
	return false;
	});



    //submits modal form and stores input in group object
    $('#makePost').on('click',function(){
       
            // var post = "";
             // var post = "";
             // post = $('#postMain').val().trim();

            // console.log("this is it" + post);
            // post section
            $.post(currentURL + '/addPost', {
                post: $('#postMain').val().trim(),
            },

                function(data){
                    if(data){
                    // $('#postModal').modal('hide');
                    console.log("new" + data);
                }
                });

            
            // return false;
    }); // end of post modal form





})