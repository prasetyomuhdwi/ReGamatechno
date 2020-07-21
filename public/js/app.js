$(document).ready(function () {

    let $btns = $(".project .btn-group button")

    $btns.click(function (e) {

        $('.project .btn-group button').removeClass('active');
        e.target.classList.add('active');

        let selector = $(e.target).attr('data-filter');
        $('.project .grid').isotope({
            filter: selector
        });
        return false;
    })
    $('.site-main .aboutme .owl-carousel').owlCarousel({
        loop: true, autoplay: true, dots: true, responsive: {
            0: {
                items: 1
            }
        }
    });
    $('.project .btn-group #btn1').trigger("click");

    $('.project .grid .popup-link').magnificPopup({
        type: 'image',
        gallery: { enabled: true }
    });

    let nav = $('#navbarNav ul.navbar-nav li');
    nav.click(function (e) {
        console.log(e.classList)
    })
    var btnSe = $(".site-main .aboutus #aboutus");
    var content = $(".site-main .aboutus .about-title > div");
    btnSe.click(selengkapnya);
    let count = 0;

    function selengkapnya() {
        count = count + 1;
        if (count % 2 != 0) {
            content.removeClass("overflow-hidden");
            btnSe.text("Sembunyikan");
        } else {
            content.addClass("overflow-hidden");
            btnSe.text("Baca Selengkapnya");
        }
    }

});