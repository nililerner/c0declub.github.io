$(window).load(function() {
  "use strict";
  setTimeout(function() {
    $('.loader-overlay').addClass('loaded');
  }, 300);

});
$(function() {

  $('#countdown').countdown('2016/06/01', function(event) {
    $(this).html(event.strftime('%w weeks %d days <br /> %H:%M:%S'));
  });

  $('.social-nav ul li').mouseover(function() {
    $(this).animate({
      'padding-top': 130
    }, {
      queue: false,
      duration: 500
    });
  }).mouseleave(function() {
    $(this).animate({
      'padding-top': 100
    }, {
      queue: false,
      duration: 500
    });
  });

  $('.main-nav ul li a, .content.show a').click(function(e) {
    e.preventDefault();
    var link = $(this).attr('href').substr(1);

    if (!$('section.content.show, section#' + link).is(':animated')) {
      $('.main-nav ul li a').removeClass('active'); //remove active
      $('section.content.show').addClass('show').animate({
        'opacity': 0
      }, {
        queue: false,
        duration: 500,
        complete: function() {
          $('section.content.show').hide();
          $('a[href="#' + link + '"]').addClass('active'); // add active
          $('section#' + link).show();
          $('section#' + link).addClass('show').animate({
            'opacity': 1
          }, {
            queue: false,
            duration: 500
          });
        }
      });
    }
  });

  var geocoder;

  /*
   ██████   ██████   ██████   ██████  ██      ███████     ███    ███  █████  ██████  ███████
  ██       ██    ██ ██    ██ ██       ██      ██          ████  ████ ██   ██ ██   ██ ██
  ██   ███ ██    ██ ██    ██ ██   ███ ██      █████       ██ ████ ██ ███████ ██████  ███████
  ██    ██ ██    ██ ██    ██ ██    ██ ██      ██          ██  ██  ██ ██   ██ ██           ██
   ██████   ██████   ██████   ██████  ███████ ███████     ██      ██ ██   ██ ██      ███████
  */
  $(document).ready(function() {
    geocoder = initGeocoder();

    comingMap();


    map_height();
    $(window).resize(function() {
      map_height();
    });

  });

  function map_height() {
    $('#map').height('');
    var window_h = $(window).height();
    var html_h = $(document).height();
    $('#map').css({
      'height': window_h
    });
  }





  /*
   ██████  ███████  ██████   ██████  ██████  ██████  ███████ ██████
  ██       ██      ██    ██ ██      ██    ██ ██   ██ ██      ██   ██
  ██   ███ █████   ██    ██ ██      ██    ██ ██   ██ █████   ██████
  ██    ██ ██      ██    ██ ██      ██    ██ ██   ██ ██      ██   ██
   ██████  ███████  ██████   ██████  ██████  ██████  ███████ ██   ██
  */

  function initGeocoder() {
    var geocoder = new google.maps.Geocoder();

    return geocoder;
  }

  function geocode (options, callback) {
    return geocoder.geocode(options, function(results, status) {
      callback(results, status);
    })
  }

  function geocodeAddress(address, callback) {
    // var address = document.getElementById('address').value;
    return geocode({
      'address': address
    }, function(results, status) {
      callback(results, status);
      // if (status === google.maps.GeocoderStatus.OK) {
      //   resultsMap.setCenter(results[0].geometry.location);
      //   var marker = new google.maps.Marker({
      //     map: resultsMap,
      //     position: results[0].geometry.location
      //   });
      // } else {
      //   alert('Geocode was not successful for the following reason: ' + status);
      // }
    });
  }

  /*
   ██████  ██████  ███    ███ ██ ███    ██  ██████  ███    ███  █████  ██████
  ██      ██    ██ ████  ████ ██ ████   ██ ██       ████  ████ ██   ██ ██   ██
  ██      ██    ██ ██ ████ ██ ██ ██ ██  ██ ██   ███ ██ ████ ██ ███████ ██████
  ██      ██    ██ ██  ██  ██ ██ ██  ██ ██ ██    ██ ██  ██  ██ ██   ██ ██
   ██████  ██████  ██      ██ ██ ██   ████  ██████  ██      ██ ██   ██ ██
  */

  function comingMap() {
    var myOptions = {
      zoom: 4,
      center: new google.maps.LatLng(25.7738889, -80.1938889),
      navigationControlOptions: {
        style: google.maps.NavigationControlStyle.NORMAL,
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      streetViewControl: false,
      scrollwheel: false,
      zoomControl: false,
      panControl: false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.DEFAULT,
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      mapTypeControl: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.TOP_RIGHT,
        mapTypeIds: ["ptMap"]
      }
    };

    map = new google.maps.Map(document.getElementById('map'), myOptions);
    var mapStyle = (function() {
      return [{
        featureType: "administrative",
        elementType: "all",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [{
          color: '#3C3C3C'
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: "poi",
        elementType: "all",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: "road",
        elementType: "all",
        stylers: [{
          visibility: "on"
        }, {
          lightness: -30
        }]
      }, {
        featureType: "transit",
        elementType: "all",
        stylers: [{
          visibility: "off"
        }]
      }, {
        featureType: "water",
        elementType: "all",
        stylers: [{
          color: '#232323'
        }]
      }];
    })();

    var styledMapOptions = {
      name: "Map"
    };
    var ptMapType = new google.maps.StyledMapType(mapStyle, styledMapOptions);
    map.mapTypes.set("ptMap", ptMapType);
    map.setMapTypeId("ptMap");

    var circle = {
      path: google.maps.SymbolPath.CIRCLE,
      fillOpacity: 0.6,
      fillColor: '#319db5',
      strokeWeight: 0,
      scale: 12
    };

    if (false)
      var marker = getPrettyMarker(map, map.getCenter());

    /*
     ██████  ███████ ████████ ██████  ██████  ███████ ████████ ████████ ██    ██ ███    ███  █████  ██████  ██   ██ ███████ ██████
    ██       ██         ██    ██   ██ ██   ██ ██         ██       ██     ██  ██  ████  ████ ██   ██ ██   ██ ██  ██  ██      ██   ██
    ██   ███ █████      ██    ██████  ██████  █████      ██       ██      ████   ██ ████ ██ ███████ ██████  █████   █████   ██████
    ██    ██ ██         ██    ██      ██   ██ ██         ██       ██       ██    ██  ██  ██ ██   ██ ██   ██ ██  ██  ██      ██   ██
     ██████  ███████    ██    ██      ██   ██ ███████    ██       ██       ██    ██      ██ ██   ██ ██   ██ ██   ██ ███████ ██   ██
    */

    function getPrettyMarker(map, position) {

      var marker = new MarkerWithLabel({
        position: position,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 0
        },
        map: map,
        draggable: true,
        labelAnchor: new google.maps.Point(10, 10),
        labelClass: 'pulse-label'
      });

      return marker;
    }

    /*
     ██████  ███████ ████████ ██████   █████  ███    ██ ██████   ██████  ███    ███         ███    ███  █████  ██████  ██   ██ ███████ ██████
    ██       ██         ██    ██   ██ ██   ██ ████   ██ ██   ██ ██    ██ ████  ████         ████  ████ ██   ██ ██   ██ ██  ██  ██      ██   ██
    ██   ███ █████      ██    ██████  ███████ ██ ██  ██ ██   ██ ██    ██ ██ ████ ██         ██ ████ ██ ███████ ██████  █████   █████   ██████
    ██    ██ ██         ██    ██   ██ ██   ██ ██  ██ ██ ██   ██ ██    ██ ██  ██  ██         ██  ██  ██ ██   ██ ██   ██ ██  ██  ██      ██   ██
     ██████  ███████    ██    ██   ██ ██   ██ ██   ████ ██████   ██████  ██      ██ ███████ ██      ██ ██   ██ ██   ██ ██   ██ ███████ ██   ██
    */

    function getRandom_marker(bounds) {
      var lat_min = bounds.getSouthWest().lat(),
        lat_range = bounds.getNorthEast().lat() - lat_min,
        lng_min = bounds.getSouthWest().lng(),
        lng_range = bounds.getNorthEast().lng() - lng_min;



      return new google.maps.LatLng(lat_min + (Math.random() * lat_range),
        lng_min + (Math.random() * lng_range));
    }

    function getRandomWLimits(bounds, paddingV, paddingH) {
      if (!bounds) return;
      var lat_min = bounds.getSouthWest().lat(),
        lat_range = bounds.getNorthEast().lat() - lat_min,
        lng_min = bounds.getSouthWest().lng(),
        lng_range = bounds.getNorthEast().lng() - lng_min;

      var hRange = lng_range * paddingH;
      var vRange = lat_range * paddingV;
      var top = lat_min + (lat_range - vRange) / 2;
      var left = lng_min + (lng_range - hRange) / 2;
      // h = 25, h-min = 5
      // v = 13, v-min = 30
      // pad-h = 0.5, ef-h = 12.5 = 25 * 0.5
      // pad-v = 0.5, ef-v = 6.5 = 13 * 0.5
      // h-top = h-min + (h - ef-h) / 2 = 5 + (25 - 12.5) / 2 = 5 + 6.25 = 11.25
      // v-left = v-min + (v - ef-v) / 2 = 30 + (13 - 6.5) / 2 = 30 + 3.25 = 33.25
      //

      var latLng = new google.maps.LatLng(top + (Math.random() * vRange),
        left + (Math.random() * hRange));

      latLng.special = [
        {lat: top, lng: left},
        {lat: top, lng: left+hRange},
        {lat: top+vRange, lng: left+hRange},
        {lat: top+vRange, lng: left},
      ];

      return latLng;
      /*
  // Define the LatLng coordinates for the polygon's path.
  var triangleCoords = [
    {lat: 25.774, lng: -80.190},
    {lat: 18.466, lng: -66.118},
    {lat: 32.321, lng: -64.757},
    {lat: 25.774, lng: -80.190}
  ];

  // Construct the polygon.
  var bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  bermudaTriangle.setMap(map);
  */
    }


    var markers = [];


    var bermudaTriangle = new google.maps.Polygon({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });
    bermudaTriangle.setMap(map);
    console.log('bermudaTriangle:', bermudaTriangle);





    var putPointCallback = function (point) {
      // console.log('got result for radress:', res, status);
      // if (!res || !res.legth) return;
      // let point = res.length && res[Math.floor(Math.random()*res.length*10) % res.length].geometry.location;
      markers.push(getPrettyMarker(map, point));
      if (markers.length > 60) {
        let markerToRemove = markers.shift();
        console.log('markerToRemove', markerToRemove);
        markerToRemove.setMap(null);
      }
    };

    google.maps.event.addListener(map, 'tilesloaded', function() {
      if (true) return;
      var mapBounds = map.getBounds();
      console.log('mapBounds:', JSON.stringify(mapBounds));

      for (var i = 0; i < 1; i++) {
        var location = getRandomWLimits(mapBounds, 0.025, 0.025);
        // bermudaTriangle.setPaths(location.special);
        console.log('getting address for:', location.lat(), location.lng());
        putPointCallback(location);
      }

    });


    var moveABit = () => {
      let mapBounds = map.getBounds();
      if (!mapBounds) return;
      
      let latLng = getRandomWLimits(mapBounds, 0.05, 0.08);
      map.panTo(latLng);
    }

    var goTimeout = () => {
      moveABit();
      var delay = 3000+Math.floor(Math.random()*6000)
      setTimeout(goTimeout, delay);
    }
    setTimeout(goTimeout, 4000);


    var base58 = (function(alpha) {
      var alphabet = alpha || ' 123456789 abcdefghijkmnopqrstuvwxyz ABCDEFGHJKLMNPQRSTUVWXYZ-',
          base = alphabet.length;
      return {
          encode: function(enc) {
              if(typeof enc!=='number')
                  throw '"encode" only accepts integers.';
              var encoded = '';
              while(enc) {
                  var remainder = enc % base;
                  enc = Math.floor(enc / base);
                  encoded = alphabet[remainder].toString() + encoded;
              }
              return encoded;
          },
          decode: function(dec) {
              if(typeof dec!=='string')
                  throw '"decode" only accepts strings.';
              var decoded = 0;
              while(dec) {
                  var alphabetPosition = alphabet.indexOf(dec[0]);
                  if (alphabetPosition < 0)
                      throw '"decode" can\'t find "' + dec[0] + '" in the alphabet: "' + alphabet + '"';
                  var powerOf = dec.length - 1;
                  decoded += alphabetPosition * (Math.pow(base, powerOf));
                  dec = dec.substring(1);
              }
              return decoded;
          }
      };
  })();

  }
});
