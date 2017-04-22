export class MapPageController {
  constructor(map, $scope, api) {
    'ngInject';
    this.$scope = $scope;
    this.api = api;
    this.map = map;
    this.def = {
      cityId:'421866',
      lng: '30.6146803128848',
      lat: '50.4020865'
    };
    this.getRegions();
    this.chosenRegion = {};
    this.getData(this.def);
    this.$scope.activeLocation = {};
    $scope.objects = [];
  }

  sortObjects() {
    var region = this.regions.find(x => x._id == this.chosenRegion);
    this.$scope.objects = this.$scope.allObjects.filter(x => x.cityId == region._id);
    this.getData(region, true);
  }

  getData(obj, reset) {
    this.map.getLocations(obj.cityId)
      .then(response => {
        this.$scope.objects = response;
        this.$scope.allObjects = response;
        this.map.getLocationOfUser()
          .then(responseUser => {
            let nearestLocation = this.map.chooseNearestLocation(response, responseUser);
            this.map.init(response, nearestLocation, 'map', this.$scope, 'activeLocation', obj, reset);
          }, () => {
            this.map.init(response, this.$scope.objects[0], 'map', this.$scope, 'activeLocation', obj, reset);
          });
      });
  }

  getRegions() {
    this.api
      .get(`regions`)
      .then(response => {
        this.regions = response.data;
      });
  }

  handleLocationClick(obj) {
    this.map.setCenter(obj);
    this.$scope.activeLocation = obj;
  }
}
