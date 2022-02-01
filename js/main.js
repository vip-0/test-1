$(document).ready(function () {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            $(".main-header").addClass("sticky");
        } else {
            $(".main-header").removeClass("sticky");
        }
    });

    if (window.matchMedia("(max-width: 767px)").matches) {

        $(".hamburger").click(function () {
            $(".hamburger").toggleClass("active");
            $(".navigation").toggleClass("active");
            $(".nav-items").removeClass("active");
        });
    }


    $('#heroSlider').owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        margin: 40,
        navText: ['', ''],
        autoplay: false,
        autoWidth:true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    });

    // smooth scrolling navigation
    $(".inner_banner_content a").click(function () {
        var target = $(this).attr("href");
        $("body, html").animate({
            scrollTop: $(target).offset().top - 80
        }, 300);
        return false;
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
