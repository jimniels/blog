jQuery(document).ready(function($){

    // initiate highlight text in highlight.pack.js
    
    // remove pageload class that rpevents css transitions before page load
    $('body').removeClass('preload');

    // Set images to full-width with captions
    $('.article p img').each(function(){
		
        var _parent = $(this).parents('p');
        _parent.addClass('image-container');

        // Get title text
        var caption = $(this).attr('title');

        if (caption) 
            _parent.append( caption ); 

	});


    // Menu
    _nav = $('.navigation');

    $('html').click(function() {
        if( _nav.hasClass('show') )
            _nav.removeClass('show').addClass('hide'); 
    });
    _nav.click(function(event){
        event.stopPropagation();

        if (event.target.id == 'top')
            $(this).removeClass('show').addClass('hide');
    });
    $('.avatar').click(function(event){
        

        if( _nav.hasClass('hide') )
            _nav.removeClass('hide').addClass('show');
        else 
            _nav.removeClass('show').addClass('hide');
    });
    
    // reposition scriptogram dashboard link
    var styles = {
        right : "auto",
        left: "20px",
        top: "20px"    
    };
    $('body > a[href$="dashboard/"]').css(styles);
});