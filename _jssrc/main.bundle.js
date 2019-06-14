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

    acc[i].onclick = function (e) {
      for (var i = 0; i < acc.length; i++) {
        if (this != acc[i]) {
          acc[i].children[1].children[0].innerHTML = "More";
          acc[i].children[1].children[1].classList.remove('fa-minus');
          acc[i].children[1].children[1].classList.add('fa-plus');
        }
      }

      var setClasses = !this.classList.contains('active');
      setClass(acc, 'active', 'remove');
      setClass(panel, 'active', 'remove');
      if (this.children[1].children[0].innerHTML == "More") {
        this.children[1].children[0].innerHTML = "Less";
        this.children[1].children[1].classList.add('fa-minus');
        this.children[1].children[1].classList.remove('fa-plus');
      } else {
        this.children[1].children[0].innerHTML = "More";
        this.children[1].children[1].classList.add('fa-plus');
        this.children[1].children[1].classList.remove('fa-minus');
        this.children[1].children[1].classList.remove('fa-minus');
      }
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

// Blog category filter

document.ready(function () {
  var optionFilter = document.getElementById('js-categoryfilter');
  if (optionFilter) {
    filterSetup(optionFilter);
  }

  function displayItems(filterValue, allItems) {
    var filteredItems = allItems.filter(function (image) {
      return image.getAttribute('data-filter') === filterValue;
    });
    var hiddenItems = allItems.filter(function (image) {
      return image.classList.contains('hidden');
    });

    document.getElementById("catDes_" + filterValue).style.display = "block";

    if (filterValue === 'all') {
      hiddenItems.forEach(function (image) {
        fade(image, 'in', 500);
      });
    } else {
      allItems.forEach(function (image) {
        image.classList.add('hidden');
      });

      filteredItems.forEach(function (image) {
        fade(image, 'in', 500);
      });
    }
  }

  function filterSetup(filter) {
    var allItems = [].slice.call(document.getElementsByClassName('filter-item'));
    var filterValue = void 0;
    function getUrlVars() {
      var vars = {};
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
      });
      return vars;
    }

    if (getUrlVars()["c"]) {
      var cat = getUrlVars()["c"];
      var categoryOptions = [].slice.call(document.getElementById('js-categoryfilter').getElementsByTagName("option"));
      categoryOptions.forEach(function (option) {
        option.removeAttribute("selected");
        if (option.value === cat) {
          option.setAttribute("selected", true);
        }
        displayItems(cat, allItems);
      });
    }

    filter.onchange = function (event) {
      displayItems(event.target.value, allItems);
    };
  }
  setTimeout(function () {
    var instagramWrap = document.getElementsByClassName("photo-list")[0];
    if (!instagramWrap.children.length) {
      document.getElementsByClassName("c-instagram-feed__list")[0].style.height = 0;
    }
  }, 1500);
});

// Pinterest Share

function pinterestShare(img, desc) {
  window.open("//www.pinterest.com/pin/create/button/" + "?url=" + window.location.href + "&media=" + img + "&description=" + desc, "pinIt", "toolbar=no, scrollbars=no, resizable=no, top=0, right=0");
  return false;
}

// JumpTo for SmoothScroll

function jump(target, options) {
  var start = window.pageYOffset,
      opt = {
    duration: options.duration,
    offset: options.offset || 0,
    callback: options.callback,
    easing: options.easing || easeInOutQuad
  },
      distance = typeof target === 'string' ? opt.offset + document.querySelector(target).getBoundingClientRect().top : target,
      duration = typeof opt.duration === 'function' ? opt.duration(distance) : opt.duration,
      timeStart,
      timeElapsed;

  requestAnimationFrame(function (time) {
    timeStart = time;
    loop(time);
  });

  function loop(time) {
    timeElapsed = time - timeStart;

    window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

    if (timeElapsed < duration) requestAnimationFrame(loop);else end();
  }

  function end() {
    window.scrollTo(0, start + distance);

    if (typeof opt.callback === 'function') opt.callback();
  }

  // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
}

//Initiate Smooth Scrolling

initSmoothScrolling();

function initSmoothScrolling() {

  var duration = 400;

  var pageUrl = location.hash ? stripHash(location.href) : location.href;

  delegatedLinkHijacking();
  //directLinkHijacking();

  function delegatedLinkHijacking() {
    if (document.body) {
      document.body.addEventListener('click', onClick, false);
    }

    function onClick(e) {
      if (!isInPageLink(e.target)) return;

      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration: duration,
        callback: function callback() {
          setFocus(e.target.hash);
        }
      });
    }
  }

  function directLinkHijacking() {
    [].slice.call(document.querySelectorAll('a')).filter(isInPageLink).forEach(function (a) {
      a.addEventListener('click', onClick, false);
    });

    function onClick(e) {
      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration: duration
      });
    }
  }

  function isInPageLink(n) {
    return n.tagName.toLowerCase() === 'a' && n.hash.length > 0 && stripHash(n.href) === pageUrl;
  }

  function stripHash(url) {
    return url.slice(0, url.lastIndexOf('#'));
  }

  function isCssSmoothSCrollSupported() {
    return 'scrollBehavior' in document.documentElement.style;
  }

  // Adapted from:
  // https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
  function setFocus(hash) {
    var element = document.getElementById(hash.substring(1));

    if (element) {
      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
        element.tabIndex = -1;
      }

      element.focus();
    }
  }
}
