// This is for when i thought we'd do it as a SPA

jQuery(document).ready(function($){

    // Scrolling enhancements for sidebar nav
    // should be on desktop only!
    // $('.nav').mouseenter(function(){
    //   $("body").css("overflow","hidden");
    // });
    // $('.nav').mouseleave(function(){
    //   $("body").css("overflow","scroll");
    // });

    // Set images to full-width with captions
    // $('.content__body p img').each(function(){
    //
    //     var _parent = $(this).parents('p');
    //     _parent.addClass('image-container');
    //
    //     // Get title text
    //     var caption = $(this).attr('title');
    //
    //     if (caption) {
    //       _parent.append( caption );
    //     }
	  // });

    // Apply active class to highlighted element
    //HighlightActiveItemInSidebar()
    // $('.nav-header .nav__list--tags a').on('click', function(){
    //   console.log($(this).attr('data-url'));
    //   HighlightActiveItemInSidebar();
    // });


    /*
    var oldUrl = location.pathname;
    var newUrl = '';

    // add jim-nielsen.com selector too
    $(document).on('click', 'a[href^="/blog/"]', function(e){
      e.preventDefault();

      // If it's an 'active' link, stop execution
      var $clickedEl = $(this);
      newUrl = $clickedEl.attr('href');

      console.log(oldUrl, newUrl);
      if (oldUrl === newUrl ||
          oldUrl === newUrl + '/') {
        console.log('stop execution, current doc is visible');
        return false;
      } else {
        console.log('request and load new document');
      }

      var $elActive = $('active');
      var elActiveId = $elActive.length ? $elActive.attr('id') : '';


      if ($clickedEl.attr('id') === elActiveId) {
        return false;
      }

      // Get vars
      var $content = $('#content');
      var href = $clickedEl.attr('href');

      $content.toggleClass('content--loading');
      $('nav .active').removeClass('active');

      // Split it into two if there's a hash
      // http://jim-nielsen.com/blog/2015/post-name -> ['http://jim-nielsen.com/blog/2015/post-name']
      // http://jim-nielsen.com/blog/tags#design -> ['http://jim-nielsen.com/blog/tags', 'design']
      var url = href.split('#')
      // If it doesn't have a hash, load the '#post' frag
      if (url.length === 1) {
        url.push('post');
      }
      console.log(url)

      setTimeout(function(){
        $content.html('').load(url[0] + ' #' + url[1], function(response, status, xhr){
          if (status == 'error') {
            console.log('there was an error');
            $content.html('' +
              '<div style="text-align:center">' +
                '<img src="/blog/assets/img/error.gif" alt="Page not found" class="m-b" />' +
                '<h2 class="highlight bold m-b-sm">Your treat, err, page cannot be found.</h2>' +
                '<p class="m-b-sm">Sorry about that, but apparently there was some kind of network error. Go ahead and try again. Or, try loading a something else.</p>' +
                '<p>If you think something is seriously wrong, <a href="http://twitter.com/jimniels">contact me</a>.</p>' +
              '</div>');
          } else {
            $clickedEl.addClass('active');
          }
          $content.toggleClass('content--loading');
          oldUrl =
        });
      }, 1000)
    });
    */
});

function HighlightActiveItemInSidebar() {
  // slight delay needed to update location.hash
  setTimeout(function(){
    console.log(location.hash);
    var url = location.pathname + location.hash;

    // If it's the homepage, select the first one and make active
    // Otherwise, find the correspondingly active post and make it active
    if (url === '/blog/') {
      $('.nav__list--posts ul li:first-child').addClass('active');
    } else {
      $('.active').removeClass('active');
      $('a[data-url="' + url + '"]').parent().addClass('active');
    }
  }, 100)
}
