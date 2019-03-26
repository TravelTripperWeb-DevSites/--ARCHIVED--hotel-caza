function readyDoc(fn) {
 var d = document;
 (d.readyState == 'loading') ? d.addEventListener('DOMContentLoaded', fn): fn();
}
// Amenities slider
var forEachloop = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};
// tiny-slider initialisation
readyDoc(function(){// If DOM is ready

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

});// End of docready
