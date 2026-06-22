jQuery(document).ready(function () {
    var $ = jQuery;

    $('.main .big-slider').slick({
        infinite: true,
        dots: false,
        arrows: true,
        asNavFor: '.main .small-slider',
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    $('.main .small-slider').slick({
        asNavFor: '.main .big-slider',
        dots: false,
        arrows: false,
        infinite: true,
        focusOnSelect: true,
        slidesToShow: 4,
        slidesToScroll: 1
    });

    const players = [
        jwplayer("player1")
    ];
    players[0].setup({
        width: "100%",
        height: "100%",
        aspectratio: '1:1',
        controls: false,
        mute: true,
        repeat: true,
        playsinline: true,
        autostart: true,
        playlist: "https://cdn.jwplayer.com/v2/media/kmexLScI"
    });
    $('.playbutton-overlay').each(function(index) {
        $(this).on('click', function() {
            $('.playbutton-overlay').show();
            players.forEach((player, i) => {
                if (i !== index) {
                    player.pause(true);
                }
            });
            $(this).hide();
            players[index].play().setMute(false);
        });
    });

    players[0].on('click', function () {

        if (players[0].getMute()) {

            players[0].setMute(false);
            $('.sound').hide();

        } else {

            if (players[0].getState() === 'playing') {
                players[0].pause();
            } else {
                players[0].play();
            }

        }
    });

    $('.scroll-up').on('click', function() {
        let destination = $('header').offset().top;

        $("html,body").animate({
            scrollTop: destination
        }, 500);
    });

    $('.to-offer').on('click', function() {
        let destination = $('#order').offset().top;

        $("html,body").animate({
            scrollTop: destination
        }, 500);
    });

    var $page = $('html, body');
    $('a[href*="#"]').click(function() {
        $('video').each(function() {
            $(this).get(0).pause();
        });
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top-80
        }, 1200);
        return false;
    });

    $(".faq-content .col").accordionjs({
        activeIndex: false
    });

});