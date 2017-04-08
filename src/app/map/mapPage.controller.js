export class MapPageController {
  constructor(map, $scope) {
    'ngInject';
    this.$scope = $scope;
    this.$scope.activeLocation = {};
    map.getLocations()
      .then(response => {
        map.getLocationOfUser()
          .then(responseUser => {
            let nearestLocation = map.chooseNearestLocation(response, responseUser);
            map.init(response, nearestLocation, 'map', $scope, 'activeLocation');
          });
      });
  }
}
