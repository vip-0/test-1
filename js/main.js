$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
        $(".main-header").addClass("sticky");
    } else {
        $(".main-header").removeClass("sticky");
    }
});

$(document).ready(function () {

    if (window.matchMedia("(max-width: 767px)").matches) {
        
        $(".hamburger").click(function(){
            $(".hamburger").toggleClass("active");
            $("navigation").toggleClass("active");
            $(".nav-items").removeClass("active");
        });
    
        $('.m_nav').click(function(){
            $(this).toggleClass("rotateArrow")
            $(this).next().toggleClass("active");
        });

           $(".search_container").toggle();
        });
        
        $('.footer_links h3').click(function(){
            $(this).next().slideToggle();
            $(this).toggleClass("rotateArrow");
        }); $('.search_icon').click(function(){
		

    }

    $('.search_icon a').click(function(){
        $(".search_container").toggle();
    });

    $('#heroSlider').owlCarousel({
        loop: false,
        nav: false,
        dots: true,
        margin: 0,
        navText: ['', ''],
        autoplay: false,
        items: 1
    });

    $('#ruPaySlider').owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        margin: 0,
        navText: ['', ''],
        autoplay: false,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });

    $('#ruPayCardSlider').owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        margin: 10,
        navText: ['', ''],
        autoplay: false,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    $('#articleSlider').owlCarousel({
        loop: false,
        nav: false,
        dots: false,
        margin: 0,
        navText: ['', ''],
        autoplay: false,
        responsive: {
            0: {
                items: 1,
                dots: true
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    $('.logo_slider').owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        margin: 20,
        navText: ['', ''],
        autoplay: true,
        responsive: {
            0: {
                items: 2,
                dots: true
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });

    $('#categoryOffers').owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        margin: 20,
        navText: ['', ''],
        autoplay: false,
        responsive: {
            0: {
                items: 3,
                nav: false,
                dots: true
            },
            600: {
                items: 3,
                nav: false,
                dots: true
            },
            1000: {
                items: 6
            }
        }
    });

    //Input Fields
    (function () {
        $('.input_container')
            .find('.floatlabel')
            .each(function () {
                $(this).on('blur', function () {
                    $this = $(this);
                    if (this.value !== "") {
                        $this.addClass('filled');
                    }
                    else {
                        $this.removeClass('filled');
                    }
                });
            });
    })();

    // smooth scrolling navigation
    $(".inner_banner_content a").click( function() {
        var target = $(this).attr("href");
        $("body, html").animate({
            scrollTop: $(target).offset().top - 80
        }, 300);
        return false;
    });

    //Filter
    $('.filters ul li').click(function(){
        $('.filters ul li').removeClass('active');
        $(this).addClass('active');

        var data = $(this).attr('data-filter');
        $grid.isotope({
            filter: data
        })
    });

    var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: true,
        masonry: {
            columnWidth: ".all"
        }
    });

});

function EmailSubscriptionValidation() {
    var errorcount = 0;
    if ($("#txtSubscriptionEmail").val() == "" || !ValidateEmailID($("#txtSubscriptionEmail").val())) {
        $("#txtSubscriptionEmail").siblings(".error_msg").show();
        errorCount++;
    }
    else {
        $("#txtSubscriptionEmail").siblings(".error_msg").hide();
    }

    if (errorcount == 0) {
        SubmitEmailSubscription();
    }
}

function SubmitEmailSubscription() {
    $.ajax({
        type: "POST",
        url: "/rupay_api/EmailSubscription/Subscribe",
        data: {
            email: $("#txtSubscriptionEmail").val(),
            __RequestVerificationToken: $("input[name='__RequestVerificationToken']").val()
        },
        async: false,
        success: function (result) {
            if (result.status == "UNAUTHORISED") {

            }
            else if (result.status == "success") {
                $("#txtSubscriptionEmail").siblings(".success").show();
                $("#txtSubscriptionEmail").val("");
            }
            else if (result.status == "INVALID") {
                $("#spnErrorMsg").html(result.message);
            }
            else {
                //alert("Something Went Wrong!!!");
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function ValidateEmailID(e) {
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(e);
}
