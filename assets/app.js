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
    $('#postSubmit').on('click',function(){
       
            // var post = "";
             var posty = "";
             posty = $('#postMain').val().trim();

            console.log("this is it" + posty);
            // post section
            $.post(currentURL + '/addPost', posty,
                function(data){
                    if(data){
                    $('#postModal').modal('hide');
                    console.log("new" + data);
                }
                });

            
            // return false;
    }); // end of post modal form





})