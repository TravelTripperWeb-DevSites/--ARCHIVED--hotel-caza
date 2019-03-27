"use strict";

/**
 * Leaflet plugin for Interactive Map
 * @author Mohammed Tufail <mtufail@traveltripper.com>
 *
 * @param {Object} options The option for all settings objects
 * @param {HTMLElement} options.target - The target element id where the map is loading  eg.(document.getElementById('leafletmap')).
 * @param {string} options.hotelTitle - The Hotel Title for base marker
 * @param {string} options.hotelAddress - The Hotel Address for base marker
 * @param {number} options.hotelLat - The Hotel latitude for base marker eg.(33.400356)
 * @param {number} options.hotelLong - The Hotel longitudes for base marker eg.(-111.918608)
 * @param {string} options.hotelMarker - The Hotel base marker image src
 * @param {number[]} options.markerSize - The Hotel base marker marker image size (exactly 2 entries) eg.([24,24])
 * @param {number} options.zoom - The default map zoom size
 * @param {number} options.minZoom - The minimum map zoom size
 * @param {number} options.maxZoom - The maximum map zoom size
 * @param {boolean} options.fitBounds - Default is true. If set to true, the map will auto fit
                                        and will show all markers inside map
 * @param {boolean} options.attrLabel - Default is false. The label on each marker will show/hide.
 * @param {boolean} options.markerLabelText - Default is false. If set to true It will show the attraction name as label on marker or else Numbers
 * @param {string} options.attrIconClass - Default is 'map-circle-icon'. It will add class name on marker icon.
 * @param {boolean} options.categorytypeIcon - Default is false. It will add class name on marker icon based on category.
 * @param {boolean} options.scrollWheelZoom - Default is false. To set the zoom on mouse scroll wheel.
 * @param {boolean} options.scrollOnClick - Default is true. To enable/disable the zoom if map is clicked.
 * @param {boolean} options.getDirectionBtn - Default is false. To enable/disable the Get Direction button on infobox.
 * @param {boolean} options.googleLink - Default is false. If set to true will attach the google map link based on the location address.
 * @param {boolean} options.websiteLink - Default is false. If set to true will attach the link on button for website from attractionsArray of 5th index.
 * @param {string} options.getDirectionBtnLabel - Default is 'Get Direction'. To print the Text on Button
 * @param {boolean} options.hideMarkerLabelHover - Default is false. If it is true it will hide the Title tag from each marker
 * @param {boolean} options.hoverActive - Default is false. If it is true it will add active class on marker icon on hover event
 * @param {boolean} options.showPopup - Default is true. It enables the map info window.
 * @param {function} options.markerClickAction - Default is false. Attach some function on each maker if the marker is clicked.
 * @param {string} options.TileStyle - Add leaflet title styles to it.
 * @param {string} options.attribution - Add leaflet title attribution for above styles or copyright.
 * @param {array} options.attractionsList - Add more attraction (markers) to the map. and will display if map element has attribute [data-attractions="show"]
 * @property {function} leafletMap.init - The baz function - Add more attraction (markers) to the map. and will display if map element has attribute [data-attractions="show"]

*/
function leafletMap(options) {
  // Default options
  var defaults = {
    target: document.getElementById('leafletmap'),
    hotelTitle: 'Default Hotel',
    hotelAddress: '9 Crosby St New York, NY 10013',
    hotelLat: 33.400356,
    hotelLong: -111.918608,
    hotelMarker: '/assets/img/marker.png',
    markerSize: [32, 32],
    zoom: 14,
    minZoom: 0,
    maxZoom: 20,
    fitBounds: true,
    attrLabel: false,
    markerLabelText: false,
    categorytypeIcon: false,
    attrIconClass: 'map-circle-icon',
    scrollWheelZoom: false,
    scrollOnClick: true,
    getDirectionBtn: false,
    googleLink: false,
    websiteLink: false,
    getDirectionBtnLabel: 'Get Direction',
    hideMarkerLabelHover: false,
    hoverActive: false,
    showPopup: true,
    markerClickAction: false,
    TileStyle: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  }; //private method

  /**
   * Merge two or more objects. Returns a new object.
   * @private
   * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
   * @param {Object}   objects  The objects to merge together
   * @returns {Object}          Merged values of defaults and options
   */

  var extend = function extend() {
    // Variables
    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length; // Check if a deep merge

    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
      deep = arguments[0];
      i++;
    } // Merge the object into the extended object


    var merge = function merge(obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          // If deep merge and property is an object, merge properties
          if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            extended[prop] = extend(true, extended[prop], obj[prop]);
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    }; // Loop through each object and conduct a merge


    for (; i < length; i++) {
      var obj = arguments[i];
      merge(obj);
    }

    return extended;
  }; // Pollyfill for those browsers who does not support trim() eg. ie6
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim


  if (!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
  } //
  // Global Variables
  //


  var publicMethods = {}; // Placeholder for public methods

  var attractionsfilter = {};
  var attractionsArray = options.attractionsList || [];
  var self = this;
  var formattedAttractionsList = [];
  var bound = [];
  var map; // Merge user options with defaults

  var settings = extend(defaults, options || {});

  publicMethods.init = function () {
    var mapID = settings.target;
    var isAttractions = mapID.dataset.attractions || false;

    if (mapID != null) {
      // Set hotel base marker icon style
      var hotelIcon = L.icon({
        iconUrl: settings.hotelMarker,
        iconSize: settings.markerSize
      }); // set enable/disable scrool zoom wheel on Scroll

      map = L.map(mapID, {
        scrollWheelZoom: settings.scrollWheelZoom
      }); // Enable/Disable scrolling zoom map after clicking on it

      map.on('click', function () {
        if (!settings.scrollWheelZoom && settings.scrollOnClick) {
          if (map.scrollWheelZoom.enabled()) {
            // if scroll is already enabled then clicking should disable it
            map.scrollWheelZoom.disable();
          } else {
            map.scrollWheelZoom.enable();
          }
        }
      }); // set default center latlong of the hotel and zoom

      map.setView([settings.hotelLat, settings.hotelLong], settings.zoom);
      L.tileLayer(settings.TileStyle, {
        attribution: settings.attribution,
        minZoom: settings.minZoom,
        maxZoom: settings.maxZoom
      }).addTo(map); // Set Base hotel marker on map

      var marker = L.marker([settings.hotelLat, settings.hotelLong], {
        title: settings.hotelTitle,
        alt: 'Hotel Map Marker',
        icon: hotelIcon
      }).bindPopup("<h4>".concat(settings.hotelTitle, "</h4> ").concat(settings.hotelAddress)).addTo(map);

      if (isAttractions) {
        loadAttractionMarkers(map, marker, settings);
        setCategoriesFilter();
        showAttractionsHTMLList();
      }
    } // eof if mapID

  }; // Set class to attractions marker icon


  var attractionMarkersIcon = function attractionMarkersIcon($value, $category) {
    var attractionIcon;
    var iconObj = {
      className: $category + settings.attrIconClass
    };

    if (settings.attrLabel) {
      iconObj = Object.assign({}, iconObj, {
        html: $value
      });
    }

    attractionIcon = L.divIcon(iconObj);
    return attractionIcon;
  }; // load all attractions markers in map


  var loadAttractionMarkers = function loadAttractionMarkers(map, marker, options) {
    var infoText = '';

    if (attractionsArray.length > 0) {
      for (var i = 0; i < attractionsArray.length; i++) {
        var category = attractionsArray[i][3];
        var iconClass = options.categorytypeIcon ? attractionsArray[i][3] : '';
        var iconLabel = options.markerLabelText ? attractionsArray[i][0] : i + 1;

        if (options.googleLink) {
          infoText = "<a href=\"http://maps.google.com/maps?q=".concat(attractionsArray[i][0], "+").concat(attractionsArray[i][4], "\" target=\"_blank\"><h4>").concat(attractionsArray[i][0], "</h4>").concat(attractionsArray[i][4], "</a>");
        } else if (!options.websiteLink && options.getDirectionBtn) {
          infoText = "<h4>".concat(attractionsArray[i][0], "</h4>").concat(attractionsArray[i][4], "<br>\n          <a class=\"btnDirection\" href=\"http://maps.google.com/maps?q=").concat(encodeURIComponent(attractionsArray[i][0]).replace(/ /g, '+'), "+").concat(encodeURIComponent(attractionsArray[i][4]).replace(/ /g, '+'), "\" target=\"_blank\">").concat(options.getDirectionBtnLabel, "</a>");
        } else if (options.websiteLink && !options.getDirectionBtn) {
          infoText = "<h4><a href=\"".concat(attractionsArray[i][5], "\">").concat(attractionsArray[i][0], "</a></h4>").concat(attractionsArray[i][4]);
        } else if (options.websiteLink && options.getDirectionBtn) {
          infoText = "<h4><a href=\"".concat(attractionsArray[i][5], "\">").concat(attractionsArray[i][0], "</a></h4>").concat(attractionsArray[i][4], "<br>\n          <a class=\"btnDirection\" href=\"http://maps.google.com/maps?q=").concat(encodeURIComponent(attractionsArray[i][0]).replace(/ /g, "+"), "+").concat(encodeURIComponent(attractionsArray[i][4]).replace(/ /g, '+'), "\" target=\"_blank\">").concat(options.getDirectionBtnLabel, "</a>");
        } else {
          infoText = "<h4>".concat(attractionsArray[i][0], "</h4>").concat(attractionsArray[i][4]);
        }

        attractionsfilter[category] = attractionsfilter[category] || [];
        marker = new L.marker([attractionsArray[i][1], attractionsArray[i][2]], {
          title: options.hideMarkerLabelHover ? '' : attractionsArray[i][0],
          name: attractionsArray[i][0],
          alt: attractionsArray[i][3],
          icon: attractionMarkersIcon(iconLabel, iconClass, options),
          marker_item: i + 1,
          riseOnHover: true
        }).bindPopup(infoText).addTo(map);
        var attractionObj = {
          lat: attractionsArray[i][1],
          lon: attractionsArray[i][2],
          marker: marker,
          li: self,
          category: attractionsArray[i][3]
        };
        bound.push([attractionsArray[i][1], attractionsArray[i][2]]);
        formattedAttractionsList.push(attractionObj);
        attractionsfilter[category].push(attractionObj);
        marker.on('click', margkerActiveClass); //on click add active class

        if (settings.hoverActive) {
          marker.on('mouseover', margkerActiveClass); //on click add active class
        } // Add custom action on click of Marker defined as per site's requirement


        if (settings.markerClickAction && settings.markerClickAction instanceof Function) {
          marker.on('click', settings.markerClickAction);
        }
      } //end for


      setTimeout(function () {
        if (settings.fitBounds) {
          map.fitBounds(bound); // fit bounds of all marker in map
        }
      }, 300);
    } //end if

  }; // attach click event to all marker


  var margkerActiveClass = function margkerActiveClass(e) {
    var all_markericon = document.querySelectorAll('.map-circle-icon.active');

    for (var m = 0; m < all_markericon.length; m++) {
      all_markericon[m].classList.remove('active');
    }

    e.target._icon.classList.toggle('active');
  }; // load categories in Ul tab list


  var setCategoriesFilter = function setCategoriesFilter() {
    var categories = Object.keys(attractionsfilter);
    var mapcategoryFilterEle = document.querySelector("[data-mapcategory-filter]");

    if (categories.length > 1) {
      // Setup list item / tabs
      if (mapcategoryFilterEle) {
        // First add 'All' option
        mapcategoryFilterEle.insertAdjacentHTML('beforeend', "<li class=\"nav-item\"><a class=\"nav-link active\" data-category='all'>All</a></li>"); // after add all categories

        for (var i = 0, ii = categories.length; i < ii; i++) {
          mapcategoryFilterEle.insertAdjacentHTML('beforeend', "<li class=\"nav-item ".concat(categories[i].toLowerCase().trim(), "\"><a class=\"nav-link\" data-category=\"").concat(categories[i], "\"> ").concat(categories[i], "</a></li>"));
        }
      }
    }
  }; //show all attraction item in ul listing


  var showAttractionsHTMLList = function showAttractionsHTMLList() {
    var mapCategoryHtmlListEle = document.querySelector("[data-mapcategory-list]"); // Show all attractions on page

    if (mapCategoryHtmlListEle) {
      // loop attractions category and print
      Object.keys(attractionsfilter).forEach(function (key1, value1) {
        mapCategoryHtmlListEle.insertAdjacentHTML('beforeend', '<div data-mappable-category="' + key1 + '"><h3>' + key1 + '</h3><ul class="attraction-lists list-' + key1 + '"></ul></div>');

        for (var i = 0; i < attractionsfilter[key1].length; i++) {
          //  console.dir(attractionsfilter[key1][i].category)
          document.querySelector('ul.list-' + key1).insertAdjacentHTML('beforeend', '<li data-mappable-item="' + i + '" data-mappable-category="' + attractionsfilter[key1][i].category + '">' + attractionsfilter[key1][i].marker.options.name + '</li>');
        }
      });
    }
  }; //handle category click event


  var handleCategory = function handleCategory(e) {
    var selectedCategory = e.target.dataset.category;
    bound.length = 0; //reset bounds

    bound.push([settings.hotelLat, settings.hotelLong]); // keep hotel marker in all category
    // Show/hide markers based on selected attractions category or 'All'

    for (var i = 0; i < formattedAttractionsList.length; i++) {
      if (formattedAttractionsList[i].category == selectedCategory || selectedCategory == "all") {
        formattedAttractionsList[i].marker.addTo(map);
        bound.push([formattedAttractionsList[i].lat, formattedAttractionsList[i].lon]);
      } else {
        map.removeLayer(formattedAttractionsList[i].marker);
      }
    }

    setTimeout(function () {
      if (settings.fitBounds) {
        map.fitBounds(bound);
      }
    }, 300);
  };

  var handleSingleAttraction = function handleSingleAttraction(e) {
    var categoryitem = e.target.dataset.mappableCategory;
    var itemID = e.target.dataset.mappableItem;
    var all_markericon = document.querySelectorAll('.map-circle-icon.active');

    for (var m = 0; m < all_markericon.length; m++) {
      all_markericon[m].classList.remove('active');
    }

    if (attractionsfilter[categoryitem][itemID].marker._icon) {
      attractionsfilter[categoryitem][itemID].marker._icon.classList.toggle("active");
    } // if (settings.fitBounds) {
    //   //map.fitBounds([attractionsfilter[categoryitem][itemID].marker.getLatLng()]);
    // }


    if (settings.showPopup) {
      var mlat = attractionsfilter[categoryitem][itemID].marker._latlng.lat;
      var mlng = attractionsfilter[categoryitem][itemID].marker._latlng.lng;
      map.panTo({
        lat: mlat,
        lng: mlng
      });
      attractionsfilter[categoryitem][itemID].marker.openPopup();
    }
  };

  window.onload = function () {
    var category_ele = document.querySelectorAll('[data-category]');
    var marker_li_ele = document.querySelectorAll('[data-mappable-item]');
    Array.from(category_ele).forEach(function (item) {
      return item.addEventListener('click', handleCategory);
    });
    Array.from(marker_li_ele).forEach(function (item) {
      return item.addEventListener('click', handleSingleAttraction);
    });

    if (settings.hoverActive) {
      Array.from(marker_li_ele).forEach(function (item) {
        return item.addEventListener('mouseover', handleSingleAttraction);
      });
    }
  }; // Return all public methods


  return publicMethods;
}

window.LeafletMap = leafletMap;
