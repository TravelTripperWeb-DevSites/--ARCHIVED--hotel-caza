if (document.getElementsByClassName('team-slider').length > 0) {
  //Slider With Images
  var slider = tns({
    container: '.team-slider',
    items: 1.5,
    gutter: 24,
    speed: 300,
    nav: false,
    "responsive": {
      "500": {
        items: 2.5
      }
    }
  });

  // Slider With Text
  var slider2 = tns({
    container: '.team-slider-text',
    items: 1,
    speed: 300,
    nav: false,
    controls: false
  });

  //To make only one slide active even if more than one slides are visible.
  var allActiveSlides = document.querySelectorAll(".team-slider .tns-slide-active");
  allActiveSlides[0].classList.add("active-slide");

  document.querySelector('.team-section__carousel .tns-controls').onclick = function() {
    var allSlides = document.querySelectorAll(".tns-item");
    for (var i = 0; i < allSlides.length; i++) {
      allSlides[i].classList.remove("active-slide");
    }
    setTimeout(function() {
      var allActiveSlides = document.querySelectorAll(".team-slider .tns-slide-active");
      var slideNumber = allActiveSlides[0].getAttribute("data-slide");
      slider2.goTo(slideNumber);
      allActiveSlides[0].classList.add("active-slide");
    }, 350);
  };

}
