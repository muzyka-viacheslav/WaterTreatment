export function MapService(api, $q, polygon) {
  'ngInject';
  let userCoords = {};
  let deferLocation = $q.defer();
  let map;

  function setCenter(location) {
    map.setCenter({lat: parseFloat(location.lat), lng: parseFloat(location.lng)});
  }

  function init(markers, nearestLocation, mapId, scope, activeLocationScopeVariable) {
    map = new google.maps.Map(document.getElementById(mapId), {
      zoom: 12,
      center: {
        lat: parseFloat(nearestLocation.lat),
        lng: parseFloat(nearestLocation.lng)
      }
    });
    scope.allObjects = angular.copy(markers);
    scope[activeLocationScopeVariable] = nearestLocation;
    var infowindow = new google.maps.InfoWindow, marker;
    angular.forEach(markers, location => {
      polygon
        .get(`${location.cityId}`)
        .then(response => {
          var town = new google.maps.Polygon({
            paths: response,
            strokeColor: '#5AADBB',
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: '#5AADBB',
            fillOpacity: 0.35
          });
          town.setMap(map);
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(location.lat, location.lng),
            map: map
          });

          var markerHtml = ``;

          town.addListener('click', function (event) {
            scope[activeLocationScopeVariable] = location;
            scope.$digest();
            var diseases = '';
            location.diseaseObject.forEach(function (item, key) {
              diseases += item.name;
              if (key != location.diseaseObject.length - 1) {
                diseases += ', ';
              }
            });
            markerHtml = `<div class="marker-content">
                          <div class="marker-name">
                            <span>Назва: </span><strong>${location.name}</strong>
                          </div>
                          <div class="marker-distance">
                            <span>Відстань: </span><strong>${Math.round(location.distance)} km.</strong>
                          </div>
                          <div class="marker-name">
                            <span>Хвороби, що лікуються: </span><strong>${diseases}</strong>
                          </div>
                          <div class="marker-name">
                            <span>Кількість лікувальних закладів: </span><strong>${location.existTreatAgency}</strong>
                          </div>
                        </div>`;
            infowindow.setContent(markerHtml);
            infowindow.setPosition(event.latLng);
            infowindow.open(map, marker);
          });

        });
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
      if (!mobileAndTabletcheck()) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        deferLocation.reject();
      }
      return deferLocation.promise;
    }
  }

  function mobileAndTabletcheck() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
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
      current.distance = calculateDistance(current.lat, current.lng, currentCoords.lat, currentCoords.long);
      current.location = current;
      if (prev.lng && prev.lat) {
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
    chooseNearestLocation,
    setCenter
  }
}
