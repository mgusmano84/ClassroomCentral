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
             // var post = "";
             // post = $('#postMain').val().trim();

            // console.log("this is it" + post);
            // post section
            $.post(currentURL + '/addPost', {
                post: $('#postMain').val().trim(),
            },

                function(data){
                    if(data){
                    $('#postModal').modal('hide');
                    console.log("new" + data);
                }
                });

            
            // return false;
    }); // end of post modal form


    $('#makePostone').on('click',function(){
        console.log($('#postHomework').val().trim());

                    $.post(currentURL + '/homework', {
                post: $('#postHomework').val().trim(),
            },

                function(data){
                    if(data){
                    console.log("new" + data);
                    }
                });
    });

    $('#makePosttwo').on('click',function(){
        console.log($('#postEvents').val().trim());
        $.post(currentURL + '/newEvents', {
            post: $('#postEvents').val().trim(),
        }).done(function(data){
            console.log("new" + data);
            
        });
    });


    $('#dPost').on('click',function(){
        var msg_id = $(this).attr('data-id');
        $(this).parent().parent().remove();
            $.post('/deletePost', {msg_id: msg_id},
            function(data){
                $(this).parent().parent().remove();
                
                if(data){
                console.log("new" + data);

            }
        });
    });  

        $('#dUser').on('click',function(){
        var userId = $(this).attr('data-id');
        $(this).parent().parent().remove();
            $.post('/deleteUser', {userId: userId},
            function(data){
                // $(this).parent().remove();
                
                if(data){
                console.log("new" + data);

            }
        });
    });  

         $('#dHome').on('click',function(){
        var hm_id = $(this).attr('data-id');
        $(this).parent().remove();
            $.post('/deleteHomework', {hm_id: hm_id},
            function(data){
                // $(this).parent().remove();
                
                if(data){
                console.log("new" + data);

            }
        });
    }); 
    

         $('#dEvent').on('click',function(){
        var ev_id = $(this).attr('data-id');
        $(this).parent().remove();
            $.post('/deleteEvent', {ev_id: ev_id},
            function(data){
                // $(this).parent().remove();
                
                if(data){
                console.log("new" + data);

            }
        });
    });        


})


