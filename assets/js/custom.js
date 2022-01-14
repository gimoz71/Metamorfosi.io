/*
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform))) {
 
    var mobile = true;
}*/

const isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/)) && window.matchMedia("only screen and (max-width: 760px)").matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform));

$(function() {

    /* PARALLASSE IMMAGINI
    /*----------------------------------------------------------------------*/

    /** change value here to adjust parallax level */
    var parallax = 0.2;

    var $bg_images = $(".block-cover-image");
    var offset_tops = [];
    $bg_images.each(function (i, el) {
    offset_tops.push($(el).offset().top);
    });

    $(window).on("scroll", function () {
        var dy = $(this).scrollTop();
        $bg_images.each(function (i, el) {
            var ot = offset_tops[i];
            $(el).css(
            "background-position",
            "50% " + (dy - ot * 1.15) * parallax + "px"
            );
        });
    });



    /* ATTIVAZIONE VOCI MENU ALLO SCORRERE LE  SEZIONI */
    /*----------------------------------------------------------------------*/

    // Cache selectors
    var lastId,
    topMenu = $(".navbar-nav"),
    topMenuHeight = topMenu.outerHeight() ,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
        return item;
        }
    });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.on('click',function (e) {
        var href = $(this).attr("href"), offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $("html, body").stop().animate(
            {
            scrollTop: offsetTop,
            },
            300
        );
        e.preventDefault();
    });



    /* MENU STICKY */
    /*----------------------------------------------------------------------*/
    
    var sticky = $('#navbar_top');
    var navbar_height = sticky.outerHeight();
    $('.dummie').hide().css('height', navbar_height+48);

    $(window).on("scroll", function(){

        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight + 50;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop) return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
            .parent()
            .removeClass("active")
            .end()
            .filter("[href='#" + id + "']")
            .parent()
            .addClass("active");
        }

        

        var stickyClass = 'container navbar-fixed mt-0 px-4 px-sm-5 py-3',
        scroll = $(window).scrollTop();
    
        if (scroll >= navbar_height-10)
        {
            sticky.addClass(stickyClass);
            $('.dummie').show();
        } else { 
            sticky.removeClass(stickyClass);
            $('.dummie').hide();

        }
    });


    
    /* INVIO EMAIL */
    /*----------------------------------------------------------------------*/

    $("#metaform").on("submit", function (event) {
        event.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
        type: "POST",
        url: "subscribeform.php",
        dataType: "json",
        data: formData,
        beforeSend: function () {
            $("#sendMail").prop("disabled", true).html("Attendere");
            //$('#loader').removeClass('d-none');
            $("#feedback").css("display", "none");
        },
        success: function (response) {
            console.log(response.success);
            $("#sendMail").prop("disabled", false).html("Invia");
            //$('#loader').addClass('d-none');
            $("#feedback")
            .css("display", "block")
            .html("Email inviata con successo. Controlla la tua casella di posta")
            .delay(4000)
            .fadeOut(function () {
                $(this).css("display", "none");
            });
            $("#metaform").trigger("reset");
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            $("#sendMail").prop("disabled", false).html("Invia");
            //$('#loader').addClass('d-none');
            $("#feedback")
            .css("display", "block")
            .html("C'è stato un problema nell'invio. Riprova più tardi")
            .delay(4000)
            .fadeOut(function () {
                $(this).css("display", "none");
            });
        },
        });
    });



    /* RECAPTCHA GOOGLE V3 */
    /*----------------------------------------------------------------------*/

    grecaptcha.ready(function() {
        // do request for recaptcha token
        // response is promise with passed token
        grecaptcha.execute('6LcUJAoeAAAAACXOMJBbTOMoDgJ1k0epU6ZtGD5F', {action:'validate_captcha'}).then(function(token) {
            // add token value to form
            document.getElementById('g-recaptcha-response').value = token;
        });
    });



    /* MENU TOGGLER ANIMATO */
    /*----------------------------------------------------------------------*/

    $('.menu-anim').on('click touch', function () {
        $(this).toggleClass('change');
        $('.blob').toggleClass('d-none')
    });



    /* VIDEO BACKGROUND */
    /*----------------------------------------------------------------------*/

    if (!isMobile) {
         // youtube background
        jQuery("[data-vbg]").youtube_background();
    }



     /* VARIE */
    /*----------------------------------------------------------------------*/
    
   
    // effetti particellari
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.js loaded - callback');
    });

    // caricamento font alla fine del caricamento della DOM
    var font_settings ="<style type='text/css'> @font-face {font-family: 'cocogooseregular'; src: url('assets/fonts/cocogoose-webfont.woff2') format('woff2'),url('assets/fonts/cocogoose-webfont.woff') format('woff');font-weight: normal;font-style: normal;</style>";
    $("head").append(font_settings);

    // scroll verso il form
    $(".cta").on( "click", function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#contatti").offset().top
        },'slow');

        return false;
    });



    /* LAZY LOAD IMMAGINI */
    /*----------------------------------------------------------------------*/
    
    const observer = lozad('.lozad', {
        rootMargin: '10px 0px', // syntax similar to that of CSS Margin
        threshold: 0.1, // ratio of element convergence
        enableAutoReload: true // it will reload the new image when validating attributes changes
    });
    observer.observe();
    


    /* COOKIE CONSENT */
    /*----------------------------------------------------------------------*/

    $('#cookieConsent').cookieConsent();
    
});


