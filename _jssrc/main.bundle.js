'use strict';

function readyDoc(fn) {
  var d = document;
  d.readyState == 'loading' ? d.addEventListener('DOMContentLoaded', fn) : fn();
}
// Amenities slider
var forEachloop = function forEachloop(array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};
// tiny-slider initialisation
readyDoc(function () {
  // If DOM is ready
  if (document.getElementsByClassName("amenities-slider")[0]) {
    var sliders = document.querySelectorAll('.amenities-slider');
    forEachloop(sliders, function (index, value) {
      var cont = value.nextElementSibling.children[1];
      var prevSlide = value.nextElementSibling.children[0];
      var nextSlide = value.nextElementSibling.children[2];
      var slider = tns({
        container: value,
        navPosition: "bottom",
        navContainer: cont,
        prevButton: prevSlide,
        nextButton: nextSlide,
        items: 1,
        loop: false,
        responsive: {
          640: {
            edgePadding: 20,
            gutter: 20,
            items: 2
          },
          700: {
            items: 3
          },
          900: {
            items: 4
          }
        }
      });
    });
  }
  // if(document.getElementsByClassName("location-slider")[0]) {
  //   var locSliders = document.querySelectorAll('.location-slider');
  //   forEachloop(locSliders, function (index, value) {
  //     var cont = value.nextElementSibling.children[1];
  //     var prevSlide = value.nextElementSibling.children[0];
  //     var nextSlide = value.nextElementSibling.children[2];
  //     var slider = tns({
  //       container: value,
  //       navPosition: "bottom",
  //       navContainer: cont,
  //       prevButton: prevSlide,
  //       nextButton: nextSlide,
  //       items: 1,
  //       loop: false
  //     });
  //   });
  //   console.log(slider.getInfo());
  // }
  //map sliders


  if (document.getElementsByClassName("rooms-slider")[0]) {
    var roomSlider = tns({
      container: '.rooms-slider',
      "items": 1,
      "slideBy": "page",
      "gutter": 12,
      "mouseDrag": true,
      "swipeAngle": false,
      "speed": 400,
      "edgePadding": 20,
      navContainer: "#roomSlider",
      prevButton: "#roomSliderPrev",
      nextButton: "#roomSliderNext",
      responsive: {
        768: {
          edgePadding: 100,
          gutter: 80
        }
      }
    });
  }
  if (document.getElementsByClassName("offers-cs__slideitems")[0]) {
    var offerSlider = tns({
      container: '.offers-cs__slideitems',
      "items": 1.1,
      "slideBy": "page",
      "gutter": 12,
      "mouseDrag": true,
      "swipeAngle": false,
      "speed": 400,
      "edgePadding": 0,
      navContainer: "#offerSlider",
      prevButton: "#offerSliderPrev",
      nextButton: "#offerSliderNext",
      responsive: {
        640: {
          "items": 1.5,
          gutter: 24
        }
      }
    });
  }

  if (document.getElementsByClassName("banner-carousel")[0]) {
    var bannerSlider = tns({
      container: '.banner-carousel',
      "items": 1,
      "slideBy": "page",
      "mouseDrag": true,
      "swipeAngle": false,
      "speed": 400,
      navContainer: "#bannerSlider",
      prevButton: "#bannerSliderPrev",
      nextButton: "#bannerSliderNext"
    });
  }

  // Attractions accordian mobile
  var acc = document.getElementsByClassName("attractions-mobile__link");
  var panel = document.getElementsByClassName('attractions-mobile__content');

  for (var i = 0; i < acc.length; i++) {
    acc[i].onclick = function () {
      var setClasses = !this.classList.contains('active');
      setClass(acc, 'active', 'remove');
      setClass(panel, 'active', 'remove');

      if (setClasses) {
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("active");
      }
    };
  }

  function setClass(els, className, fnName) {
    for (var i = 0; i < els.length; i++) {
      els[i].classList[fnName](className);
    }
  }
}); // End of docready
