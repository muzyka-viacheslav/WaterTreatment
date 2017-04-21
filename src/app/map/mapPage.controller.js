export class MapPageController {
  constructor(map, $scope, api) {
    'ngInject';
    this.$scope = $scope;
    this.map = map;
    this.api = api;
    this.$scope.activeLocation = {};
    $scope.objects = [];
    this.getDiseases();
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

  getDiseases() {
    this.api
      .get(`diseases`)
      .then(response => {
        this.diseases = response.data;
      })
  }

  sortObjects() {
    this.$scope.objects = this.$scope.allObjects.filter(x => x.diseases.find(x => x == this.chosenDisease));
  }

}
