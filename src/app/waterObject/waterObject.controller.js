export class WaterObjectController {
  constructor($scope, api, $stateParams, $compile, $sce, $timeout) {
    'ngInject';
    this.api = api;
    this.$timeout = $timeout;
    $scope.$sce = $sce;
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$compile = $compile;
    $scope.animation = false;
    this.getData();
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
  }

  getData() {
    this.$scope.animation = true;
    this.api
      .get(`forestObjects?id=${this.$stateParams.id}`)
      .then(response => {
        this.object = response.data;
        this.$scope.bindHTML = this.$scope.$sce.trustAsHtml(this.object.desc);
        this.$timeout(() => {
          this.$scope.animation = false;
        }, 1000);
      })
  }
}
