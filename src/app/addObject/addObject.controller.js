export class AddObjectController {
  constructor($scope, api, $stateParams) {
    'ngInject';
    this.$scope = $scope;
    this.$scope.animation = false;
    this.api = api;
    this.$stateParams = $stateParams;
    this.emptyLink = {link: 'http://example.com/img.png'};
    this.getDiseases();
    this.resetState();
    if ($stateParams.id) {
      this.getData();
    }
  }

  addImage() {
    this.newObject.images.push(angular.copy(this.emptyLink));
  }

  removeImage(index) {
    this.newObject.images.splice(index, 1);
  }

  getData() {
    this.api
      .get(`waterObjects?id=${this.$stateParams.id}`)
      .then(response => {
        this.newObject = response.data;
      })
  }


  getDiseases() {
    this.api
      .get(`diseases`)
      .then(response => {
        this.diseases = response.data;
      })
  }

  resetState() {
    this.newObject = {
      images: [this.emptyLink]
    };
  }

  addObject() {
    this.$scope.animation = true;
    let insertedObject = {
      name: this.newObject.name,
      lat: this.newObject.lat,
      lng: this.newObject.lng,
      desc: this.newObject.desc,
      images: this.newObject.images,
      cityId: this.newObject.cityId,
      diseases: this.newObject.diseases,
      existTreatAgency: this.newObject.existTreatAgency
    };
    if (this.$stateParams.id) {
      insertedObject.id = this.$stateParams.id;
    } else {
      this.canReset = true;
    }
    this.api
      .post(`waterObjects`, insertedObject)
      .then(() => {

        this.$scope.animation = false;
      })
  }

}
