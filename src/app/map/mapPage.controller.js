export class MapPageController {
  constructor(map, $scope) {
    'ngInject';
    this.$scope = $scope;
    this.map = map;
    this.$scope.activeLocation = {};
    $scope.objects = [];
    map.getLocations()
      .then(response => {
        $scope.objects = response;
        map.getLocationOfUser()
          .then(responseUser => {
            let nearestLocation = map.chooseNearestLocation(response, responseUser);
            map.init(response, nearestLocation, 'map', $scope, 'activeLocation');
          }, () => {
            map.init(response, $scope.objects[0], 'map', $scope, 'activeLocation');
          });
      });
  }
  handleLocationClick(obj) {
    this.map.setCenter(obj);
    this.$scope.activeLocation = obj;
  }
}
