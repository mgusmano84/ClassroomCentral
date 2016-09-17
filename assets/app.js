$(document).ready(function(){
    	
		currentURL = window.location.origin;
		

    // Side Panel functionality
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

            $.post(currentURL + '/addPost', {
                post: $('#postMain').val().trim(),
            },

                function(data){
                    if(data){
                    $('#postModal').modal('hide');
                    console.log("new" + data);
                }
                });

    }); // end of post modal form

    // This will post homework
    $('#makePostone').on('click',function(){

        $.post('/homeworkk', {
            post: $('#postHomework').val().trim(),
        }).done(function(data){
            console.log("new" + data);
            
        });
    });

    // This will post Events
    $('#makePosttwo').on('click',function(){

        $.post('/newEvents', {
            post: $('#postEvents').val().trim(),
        }).done(function(data){
            console.log("new" + data);
            
        });
    });

    // Delete Posts
    $('.dPost').on('click',function(){
        var msg_id = $(this).attr('data-id');
        $(this).parent().parent().remove();
            $.post('/deletePost', {msg_id: msg_id},
            function(data){
                // $(this).parent().parent().remove();
                
                if(data){
                console.log("new" + data);

            }
        });
    });  

        // Delete Users
        $('.dUser').on('click',function(){
        var userId = $(this).attr('data-id');
        $(this).parent().parent().remove();
            $.post('/deleteUser', {userId: userId},
            function(data){
                
                if(data){
                console.log("new" + data);

            }
        });
    });  

        // Delete Homework
         $('.dHome').on('click',function(){
        var hm_id = $(this).attr('data-id');
        $(this).parent().remove();
            $.post('/deleteHomework', {hm_id: hm_id},
            function(data){
                
                if(data){
                console.log("new" + data);

            }
        });
    }); 
    
         // Delete Events
         $('.dEvent').on('click',function(){
        var ev_id = $(this).attr('data-id');
        $(this).parent().remove();
            $.post('/deleteEvent', {ev_id: ev_id},
            function(data){
                
                if(data){
                console.log("new" + data);

            }
        });
    });        


})


