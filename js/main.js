function EmailSubscriptionValidation(){""!=$("#txtSubscriptionEmail").val()&&ValidateEmailID($("#txtSubscriptionEmail").val())?$("#txtSubscriptionEmail").siblings(".error_msg").hide():($("#txtSubscriptionEmail").siblings(".error_msg").show(),errorCount++),SubmitEmailSubscription()}function SubmitEmailSubscription(){$.ajax({type:"POST",url:"/rupay_api/EmailSubscription/Subscribe",data:{email:$("#txtSubscriptionEmail").val(),__RequestVerificationToken:$("input[name='__RequestVerificationToken']").val()},async:!1,success:function(i){"UNAUTHORISED"==i.status||("success"==i.status?($("#txtSubscriptionEmail").siblings(".success").show(),$("#txtSubscriptionEmail").val("")):"INVALID"==i.status&&$("#spnErrorMsg").html(i.message))},error:function(i){console.log(i)}})}function ValidateEmailID(i){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(i)}$(document).ready(function(){$(window).scroll(function(){$(window).scrollTop()>=50?$(".main-header").addClass("sticky"):$(".main-header").removeClass("sticky")}),window.matchMedia("(max-width: 767px)").matches&&$(".hamburger").click(function(){$(".hamburger").toggleClass("active"),$(".navigation").toggleClass("active"),$(".nav-items").removeClass("active")}),$("#heroSlider").owlCarousel({loop:!0,nav:!0,dots:!1,margin:40,navText:["",""],autoplay:!1,autoWidth:!0,responsiveClass:!0,responsive:{0:{items:1,nav:!1,dots:!0},600:{items:1,nav:!1,dots:!0},1000:{items:3}}}),$(".nav-items a").click(function(){var i=$(this).attr("href");return $("body, html").animate({scrollTop:$(i).offset().top-50},300),!1}),$(".hamburger span").click(function(){$("body").toggleClass("overlay")})});