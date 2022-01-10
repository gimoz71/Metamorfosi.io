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

    var font_settings = "<style type='text/css'> @font-face {font-family: 'cocogooseregular'; src: url('assets/fonts/cocogoose-webfont.woff2') format('woff2'),url('assets/fonts/cocogoose-webfont.woff') format('woff');font-weight: normal;font-style: normal;</style>";
    $("head").append(font_settings);

    $("button").on( "click", function() {
        $('html,body').animate({
            scrollTop: $("#contatti").offset().top},
            'slow');
    });

    $("#metaform").on('submit', function(event) {
        event.preventDefault(); 
        var formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/subscribeform.php',
            dataType: "json",
            data: formData,
            beforeSend: function () {
                $('#sendMail').prop("disabled", true).html("Attendere");;
                //$('#loader').removeClass('d-none');
                $('#feedback').css("display", "none");
            },
            success: function(response) { 
                console.log(response.success); 
                $('#sendMail').prop("disabled", false).html("Invia");;
                //$('#loader').addClass('d-none');
                $('#feedback').css("display", "block").html('Email inviata con successo. Controlla la tua casella di posta').delay(4000).fadeOut(function () {
                    $(this).css("display", "none");
                });
                $("#metaform").trigger("reset");
            },
            error: function(xhr, status, error){
                console.log(xhr); 
                $('#sendMail').prop("disabled", false).html("Invia");
                //$('#loader').addClass('d-none');
                $('#feedback').css("display", "block").html("C'è stato un problema nell'invio. Riprova più tardi").delay(4000).fadeOut(function () {
                    $(this).css("display", "none");
                });
                
            }
        });
    });

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

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
