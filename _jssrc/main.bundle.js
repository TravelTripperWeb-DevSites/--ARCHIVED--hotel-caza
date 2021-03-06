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

  // cendyn newsletter post data
  document.getElementById('newsletterForm').onsubmit = function () {
    var formId = document.getElementById('formID').value;
    var url = 'https://web2.cendynhub.com/FormsRest/submit/' + formId + '?format=json';
    var data = JSON.stringify({
      "PostData": {
        "emailAddress": document.getElementById('emailAddress').value
      }
    });
    makeRESTCall(url, data, function () {
      window.location = '/thankyou';
    });
    return false;
  };

  function makeRESTCall(url, data, callback) {
    var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        console.log(request.responseText);
        if (callback) {
          callback(request.responseText);
        }
      }
    };
    request.open('post', url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(data);
  }

  ttwebHotel.ready(function () {
    // dynamic offer details
    if (window.location.href.indexOf('/offers/offer/#') != -1) {
      var dynamicOfferCode = window.location.hash.toString().replace("#", "");
      var offerDetailComponentDivs = document.querySelectorAll('[data-dynamic-offer-details=true]');
      if (offerDetailComponentDivs && offerDetailComponentDivs.length > 0 && dynamicOfferCode && dynamicOfferCode != '') {
        var offers = ttwebHotel.offersList;

        var offerSlider = document.getElementById('offerSlider');
        var offerSliderNav = offerSlider.innerHTML.trim();

        if (offers.length > 1) {
          var updatedNav = '';
          for (var i = 0, ii = offers.length; i < ii; i++) {
            updatedNav = updatedNav + offerSliderNav;
          }
          offerSlider.innerHTML = updatedNav;
        }

        for (var i = 0, ii = offerDetailComponentDivs.length; i < ii; i++) {
          var props = {
            hotel: ttwebHotel,
            rateCode: dynamicOfferCode,
            innerHTML: offerDetailComponentDivs[i].innerHTML
          };
          var offerItem = TTRender.e(TTRender.Offer, props);
          TTRender.renderInElement(offerDetailComponentDivs[i], offerItem, runOfferSlider);
        }

        var nextOfferDetailComponentDivs = document.querySelectorAll('[data-dynamic-offer-next-details=true]');
        for (var i = 0, ii = nextOfferDetailComponentDivs.length; i < ii; i++) {
          if (nextOffer) {
            var props = {
              hotel: ttwebHotel,
              rateCode: nextOffer.ratePlanCode,
              innerHTML: nextOfferDetailComponentDivs[i].innerHTML
            };
            var offerItem = TTRender.e(TTRender.Offer, props);
            TTRender.renderInElement(nextOfferDetailComponentDivs[i], offerItem);
            window.setTimeout(function (e) {
              var links = e.querySelectorAll(".ttweb-offer-view-button");
              for (var k = 0, kk = links.length; k < kk; k++) {
                links[k].addEventListener('click', function (event) {
                  window.setTimeout(function () {
                    window.location.reload();
                  }, 500);
                }, false);
              }
            }.bind(this, nextOfferDetailComponentDivs[i]), 1000);
          } else {
            nextOfferDetailComponentDivs[i].remove();
          }
        }
      }
    }
  });
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

function runOfferSlider() {
  if (document.getElementsByClassName("offers-cs__slideitems")[0]) {
    var offerSlider = tns({
      container: '.offers-cs__slideitems',
      "items": 1,
      "slideBy": 1,
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
}
