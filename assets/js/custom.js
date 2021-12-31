(function($) {
    /** change value here to adjust parallax level */
    var parallax = .2;

    var $bg_images = $(".block-cover-image");
    var offset_tops = [];
    $bg_images.each(function(i, el) {
        offset_tops.push($(el).offset().top);
    });

    $(window).scroll(function() {
        var dy = $(this).scrollTop();
        $bg_images.each(function(i, el) {
            var ot = offset_tops[i];
            $(el).css("background-position", "50% " + (dy - ot*1.4) * parallax + "px");
        });
    });

    
    jQuery('[data-vbg]').youtube_background();

    var font_settings = "<style type='text/css'> @font-face {font-family: 'cocogooseregular'; src: url('../assets/fonts/cocogoose-webfont.woff2') format('woff2'),url('../assets/fonts/cocogoose-webfont.woff') format('woff');font-weight: normal;font-style: normal;</style>";
    $("head").append(font_settings);

})(jQuery);


particlesJS.load('particles-js', 'particles.json', function() {
    console.log('particles.js loaded - callback');
});

$('.menu-anim').on('click touch', function () {
    $(this).toggleClass('change');
    $('.blob').toggleClass('d-none')
});
  
const observer = lozad('.lozad', {
    rootMargin: '10px 0px', // syntax similar to that of CSS Margin
    threshold: 0.1, // ratio of element convergence
    enableAutoReload: true // it will reload the new image when validating attributes changes
});
observer.observe();

