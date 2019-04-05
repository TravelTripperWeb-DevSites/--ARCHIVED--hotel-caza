function readyDoc(fn) {
 var d = document;
 (d.readyState == 'loading') ? d.addEventListener('DOMContentLoaded', fn): fn();
}
// Amenities slider
var forEachloop = (array, callback, scope) => {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};
// tiny-slider initialisation
readyDoc(() => {// If DOM is ready
  if(document.getElementsByClassName("amenities-slider")[0]) {
    var sliders = document.querySelectorAll('.amenities-slider');
    forEachloop(sliders, function (index, value) {
      var cont = value.nextElementSibling.children[1];
      var prevSlide = value.nextElementSibling.children[0];
      var nextSlide = value.nextElementSibling.children[2];
      let slider = tns({
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


  if(document.getElementsByClassName("rooms-slider")[0]) {
    var roomSlider = tns({
      container: '.rooms-slider',
      "items": 1,
      "slideBy": "page",
      "gutter": 12,
      "mouseDrag": true,
      "swipeAngle": false,
      "speed": 400,
      "edgePadding": 20,
      navContainer:"#roomSlider",
      prevButton: "#roomSliderPrev",
      nextButton: "#roomSliderNext",
      responsive: {
        768: {
          edgePadding: 100,
          gutter: 80,
        }
      }
    });
  }
  if(document.getElementsByClassName("offers-cs__slideitems")[0]) {
    var offerSlider = tns({
      container: '.offers-cs__slideitems',
      "items": 1.1,
      "slideBy": "page",
      "gutter": 12,
      "mouseDrag": true,
      "swipeAngle": false,
      "speed": 400,
      "edgePadding": 0,
      navContainer:"#offerSlider",
      prevButton: "#offerSliderPrev",
      nextButton: "#offerSliderNext",
      responsive: {
        640: {
          "items": 1.5,
          gutter: 24,
        }
      }
    });
  }

  if(document.getElementsByClassName("banner-carousel")[0]) {
    var bannerSlider = tns({
      container: '.banner-carousel',
      "items": 1,
      "slideBy": "page",
      "mouseDrag": true,
      "swipeAngle": false,
      "speed": 400,
      navContainer:"#bannerSlider",
      prevButton: "#bannerSliderPrev",
      nextButton: "#bannerSliderNext",
    });
  }

  // Attractions accordian mobile
  var acc = document.getElementsByClassName("attractions-mobile__link");
  var panel = document.getElementsByClassName('attractions-mobile__content');

  for (var i = 0; i < acc.length; i++) {

      acc[i].onclick = function(e) {
        for (var i = 0; i < acc.length; i++) {
          if(this != acc[i]){
            acc[i].children[1].children[0].innerHTML = "More";
            acc[i].children[1].children[1].classList.remove('fa-minus');
            acc[i].children[1].children[1].classList.add('fa-plus');
          }
        }

          var setClasses = !this.classList.contains('active');
          setClass(acc, 'active', 'remove');
          setClass(panel, 'active', 'remove');
          if(this.children[1].children[0].innerHTML == "More") {
            this.children[1].children[0].innerHTML = "Less";
            this.children[1].children[1].classList.add('fa-minus');
            this.children[1].children[1].classList.remove('fa-plus');
          }else {
            this.children[1].children[0].innerHTML = "More";
            this.children[1].children[1].classList.add('fa-plus');
            this.children[1].children[1].classList.remove('fa-minus');
            this.children[1].children[1].classList.remove('fa-minus');
          }
          if (setClasses) {
              this.classList.toggle("active");
              this.nextElementSibling.classList.toggle("active");
          }
      }
  }

  function setClass(els, className, fnName) {
      for (var i = 0; i < els.length; i++) {
          els[i].classList[fnName](className);
      }
  }




});// End of docready

// Blog category filter

document.ready(() => {
  const optionFilter = document.getElementById('js-categoryfilter');
  if (optionFilter) {
    filterSetup(optionFilter);
  }


  function displayItems(filterValue, allItems) {
    const filteredItems = allItems.filter(image => image.getAttribute('data-filter') === filterValue);
    const hiddenItems = allItems.filter(image => image.classList.contains('hidden'));

    if (filterValue === 'all') {
      hiddenItems.forEach((image) => {
        fade(image, 'in', 500);
      });
    } else {
      allItems.forEach((image) => {
        image.classList.add('hidden');
      });


      filteredItems.forEach((image) => {
        fade(image, 'in', 500);
      });
    }
  }

  function filterSetup(filter) {
    const allItems = [].slice.call(
      document.getElementsByClassName('filter-item'),
    );
    let filterValue;

    function getUrlVars() {
      let vars = {};
      let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
      });
      return vars;
    }

    if (getUrlVars()["c"]) {
      const cat = getUrlVars()["c"];
      const categoryOptions = [].slice.call(document.getElementById('js-categoryfilter').getElementsByTagName("option"));
      categoryOptions.forEach((option) => {
        option.removeAttribute("selected");
        if (option.value === cat) {
          option.setAttribute("selected", true);
        }
        displayItems(cat, allItems);
      });
    }

    filter.onchange = function(event) {
      displayItems(event.target.value, allItems);
    }
  }

});

// Pinterest Share

function pinterestShare(img, desc) {
  window.open("//www.pinterest.com/pin/create/button/" +
    "?url=" + window.location.href +
    "&media=" + img +
    "&description=" + desc, "pinIt", "toolbar=no, scrollbars=no, resizable=no, top=0, right=0");
  return false;
}

 
