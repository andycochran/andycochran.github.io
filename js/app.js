'use strict';


$(document).foundation();


// Leaflet map
var layer = new L.StamenTileLayer('watercolor');

var map = new L.Map('map', {
  center: new L.LatLng(38.245, -85.745),
  zoom: 12,
  scrollWheelZoom: false
});
map.addLayer(layer);

var heartIcon = L.icon({
    iconUrl: 'images/marker-heart-444.png',
    iconSize:     [50, 48],
    iconAnchor:   [25, 24],
    popupAnchor:  [0, -24]
});


// Map attribution toggle
$('.leaflet-control-attribution').wrapInner( '<div class="leaflet-control-attribution-toggle"><div class="hide"></div></div>');

$('.leaflet-control-attribution').click(function() {
  $('.leaflet-control-attribution-toggle').addClass('toggled').find('div.hide').removeClass('hide');
});


// Map toggle
$('<div class="map-after"><i class="fa fa-chevron-down" aria-hidden="true"></i></div>').insertAfter($('#map'));
$('.map-after').click(function() {
  $('.map-container').addClass('toggled');
  map.invalidateSize(true);
  var markerLouisville = new L.marker([38.245, -85.745], {
    icon: heartIcon,
    bounceOnAdd: true,
    bounceOnAddOptions: {duration: 1200, height: 250},
    bounceOnAddCallback: function() {
      markerLouisville.bindPopup(
            '<p class="text-center"><strong>Home is where the &hearts; is.</strong><br/><small>(I&apos;m from Louisville. But I live in NYC.)</small></p>', { closeButton: false, closeOnClick: false }
          ).on('click', function(){
            map.fitBounds(group.getBounds(),{padding: [100,100]});
            markerAstoria.openPopup();
          }).on('mouseover', function(){
            this.openPopup();
          });
    }
  }).addTo(map);
  var markerAstoria = new L.marker([40.78, -73.92], {
    icon: heartIcon,
    bounceOnAdd: true,
    bounceOnAddOptions: {duration: 1200, height: 250},
    bounceOnAddCallback: function() {
      markerAstoria.bindPopup(
            '<p class="text-center"><strong>Home is where the &hearts; is.</strong><br/><small>(I live in NYC. But I&apos;m from Louisville.)</small></p>', { closeButton: false, closeOnClick: false }
          ).on('click', function(){
            map.fitBounds(group.getBounds(),{padding: [100,100]});
            markerLouisville.openPopup();
          }).on('mouseover', function(){
            this.openPopup();
          });
    }
  }).addTo(map);
  var group = new L.featureGroup([markerLouisville, markerAstoria]);
});


// Spotify Modals
$('.spotify-link').click(function() {
  var iframeSrc = $(this).attr('data-src');
  $('#spotifyModal iframe').attr('src', iframeSrc);
  $('#spotifyModal').foundation('open');
});

function bindSpotifyModalUnload() {
  $(window).on(
    'closed.zf.reveal', function () {
      $('#spotifyModal iframe').attr('src', '');
    }
  );
}
bindSpotifyModalUnload();
