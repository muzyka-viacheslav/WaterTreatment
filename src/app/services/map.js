export function MapService(api, $q) {
  'ngInject';
  let userCoords = {};
  let deferLocation = $q.defer();

  function init(markers, nearestLocation, mapId, scope, activeLocationScopeVariable) {
    var map = new google.maps.Map(document.getElementById(mapId), {
      zoom: 10,
      center: {
        lat: parseFloat(nearestLocation.lat),
        lng: parseFloat(nearestLocation.lng)
      }
    });
    var infowindow = new google.maps.InfoWindow, marker;
    angular.forEach(markers, location => {

      marker = new google.maps.Marker({
        position: new google.maps.LatLng(location.lat, location.lng),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
          scope[activeLocationScopeVariable] = location;
          scope.$digest();
          infowindow.setContent(location.name);
          infowindow.open(map, marker);
        }
      })(marker));
    })
  }

  function getLocations() {
    let defer = $q.defer();

    api
      .get(`waterObjects`)
      .then(response => {
        defer.resolve(response.data);
      }, response => {
        defer.reject(response);
      });

    return defer.promise;
  }

  function getLocationOfUser() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      return deferLocation.promise;
    }
  }

  function showPosition(position) {
    userCoords.long = position.coords.longitude;
    userCoords.lat = position.coords.latitude;
    deferLocation.resolve(userCoords);
  }

  function toRadians(val) {
    return parseFloat(val) * Math.PI / 180;
  }

  function chooseNearestLocation(locations, currentCoords) {
    let beginCoord = {};

    return locations.reduce((prev, current) => {
      current.distance = calculateDistance(current.lat, current.long, currentCoords.lat, currentCoords.long);
      current.location = current;
      if (prev.long && prev.lat) {
        if (current.distance < prev.distance) {
          return current;
        } else {
          return prev;
        }
      } else {
        return current;
      }
    }, beginCoord);
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371e3; // metres
    var φ1 = toRadians(lat1);
    var φ2 = toRadians(lat2);
    var Δφ = toRadians(lat2 - lat1);
    var Δλ = toRadians(lon2 - lon1);

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c) / 1000;
  }

  return {
    init,
    getLocations,
    getLocationOfUser,
    chooseNearestLocation
  }
}
