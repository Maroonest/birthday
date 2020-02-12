/*****************************************
 **  Simple fullpage Parallax Scroll Effect
 **  with touch support
 **  https://codepen.io/franzk/pen/aNxQxP
 **
 **  based on work by Emily Hayman
 **  https://codepen.io/eehayman/pen/qdGZJr
 **
 *****************************************/

// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = 3

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function wheelScroll(evt) {
  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    delta = -evt.deltaY;
  } else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }
  if (ticking != true) {
      if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber != totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber != 0) {
        currentSlideNumber--;
        previousItem();
      }

      slideDurationTimeout(slideDurationSetting);
    }
  }
}

function touchScroll(ts, te) {
  delta = te - ts;
  console.log('para');
  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber != totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber != 0) {
        currentSlideNumber--;
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
var ts;

//window.addEventListener(mousewheelEvent, _.throttle(wheelScroll, 60), false);
window.addEventListener(mousewheelEvent, $.throttle(60, wheelScroll), false);
window.addEventListener("touchstart", function(e) {
  ts = e.touches[0].clientY;
}, false);
window.addEventListener("touchend", function(e) {
  var te = e.changedTouches[0].clientY;
  touchScroll(ts, te);
}, false);

// ------------- SLIDE MOTION ------------- //
function nextItem() {
  var $previousSlide = $(".background").eq(currentSlideNumber - 1);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
  var $currentSlide = $(".background").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}



$(document).ready(function() {
  animation()
}, 2000);

$(document).ready(function(){

  var containerTop = $('.container').offset().top;


  $(window).scroll(function(){
      var hei = $(document).scrollTop();
      if(hei < 1){
          animation();
      }

      $('.container').css('top', Number(window.innerHeight)/2 - hei/1.4 + 'px');

      // if(hei > area2PosTop){ // 현재 스크롤값이 두번째 div offset top값 보다 크면 실행
      //     $('#area2').css('background-position-y', hei - area2PosTop);
      // }else{ // 위의 조건문에 false​ 면 실행
      //     $('#area2').css('background-position-y','top');
      //
      // }
  });
});

function animation() {
  var title1 = new TimelineMax();
  //title1.to(".button", 0, {visibility: 'hidden', opacity: 0})

  title1.staggerFromTo(".title span", 0.5,
  {ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80},
  {ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0}, 0.2);

  // for (;$('#y1').text()!=20&&$('#y2').text()!=2&&$('#y3').text()!=14;)
  //   setTimeout(function(){
  //     $('#y3').html(Number($('#y3').text()+1));
  //   }, 1000);
  //
  //   if ($('#y3').text()==32){
  //     $('#y3').html(1);
  //     $('#y2').html(Number($('#y2').text()+1));
  //     if ($('#y2').text()==13){
  //       $('#y2').html(1);
  //
  //     }
  //   }

}
