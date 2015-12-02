$(function() {

    $('#stihl-button').on('mouseover', function(){
        $(this).attr('src','images/stihl/en_button_small_a.png');
    }).on('mouseout', function(){
        $(this).attr('src','images/stihl/en_button_small_na.png');
    });    

    var currentYear = new Date();
    $('#footer-date').html("&copy;" + currentYear.getFullYear() + " Willoe Rentals");

    var width = 576;
    var animationSpeed = 2000;
    var pause = 5000;
    var currentSlide = 2;

    //cache the DOM
    var $slider = $('#slider');
    var $slides = $slider.find('.slides');
    var $slide = $slides.find('.slide');
    
    var interval;

    $('.slide-id').text(currentSlide);

    function slideRight() {
        $slides.animate({'margin-left': '-=' + width}, animationSpeed, function() {
            currentSlide++;
            $('.slide-id').text(currentSlide);
            if (currentSlide == $slide.length)  {//if the current slide is the same as the length aka the last slide    
                $('.slide-id').text(currentSlide);
                currentSlide = 2;
                $slides.css('margin-left',-576);
            }
        });
    }

    function slideLeft() {
        $slides.animate({'margin-left': '+=' + width}, animationSpeed, function() {
            currentSlide--;
            if (currentSlide == 1)  {//if the current slide is the first slide
                currentSlide = $slide.length - 1;
                $slides.css('margin-left',-4032);
            }
        });
    }

    function startSlider() {
        interval = setInterval(function() {
            slideRight();
        }, pause);  
    }

    function pauseSlider() {
        clearInterval(interval);
    }

    startSlider();

    $slide.on('mouseenter', pauseSlider).on('mouseleave', startSlider);

    // #Launch Form
    $('#form-launch').on('click', function(e){
        if ($(window).width() < 720) {
            return
        } else {
            e.preventDefault();
            $('.form-container').css('display', 'block');
            $('#name').val('');
            $('#email').val('');
            $('#phone').val('');
            $('#inquiry').val('');
            $('.overlay').css('display', 'block');
            pauseSlider();
        }
    });

    // #Form-Close Button
    $('.fa-times').on('click', function(e) { 
        e.preventDefault();
        $('.form-container').css('visibility', 'hidden');
        $('.form-container').css('display', 'none');
        $('.overlay').css('visibility', 'hidden');
        $('.overlay').css('display', 'none');
        startSlider();    
    });

    // #Form-Submit Button
    $('#submit-form').on('click', function(e){
            e.preventDefault();
            if(!$('#name').val() || !$('#email').val() || !$('#phone').val() || !$('#inquiry').val()){
                  $('.missing-fields-message').css('visibility','visible');
                  return;
            }
            $('.form-container').css('visibility', 'hidden');
            $('.form-container').css('display', 'none');
            $('.overlay').css('visibility', 'hidden');
            $('.overlay').css('display', 'none');
            startSlider();
    });

    // cache the DOM
    var $rentalRatesTable = $('.rental-rates-table');
    var $backToRentalsMenu = $('.back-to-rentals-menu');

    $(function() {
      $('.rental-side-nav li').on('click',function(e) {
        e.preventDefault();
        var data =  $(this).data('content');
        var contentDiv = '#content-' + data;
        $rentalRatesTable.css('visibility','hidden');
        $(contentDiv).css('visibility','visible');
        $(this).siblings().css('color','#204288');
        $(this).css('color','#00aa00');
        if($rentalRatesTable.css('left') == '0px') {
            $(this).parent().parent().css('visibility','hidden');
            $backToRentalsMenu.css('visibility','visible');
        }
      });
    });

    $backToRentalsMenu.on('click',function() {
        $backToRentalsMenu.css('visibility','hidden');
        $('.rental-side-nav').css('visibility','visible').find('li').css('color','#204288');
        $rentalRatesTable.css('visibility','hidden');
    });

    var mql = window.matchMedia("(min-width: 720px)");

    var handleMediaChange = function (mediaQueryList) {
    
        if (mediaQueryList.matches) {
            $('.rental-side-nav').css('visibility','visible').find('li').css('color','#204288');
            $backToRentalsMenu.css('visibility','hidden');
            $rentalRatesTable.css('visibility','hidden');
            $('#content-air-compressors').css('visibility','visible');
            $('#cat-nav-one').css('color','#00aa00');
        }
        else {
            $('.rental-side-nav').css('visibility','visible').find('li').css('color','#204288');
            $rentalRatesTable.css('visibility','hidden');
            $backToRentalsMenu.css('visibility','hidden')
        }

    };
 
    mql.addListener(handleMediaChange);
    handleMediaChange(mql);


}); //end document object function