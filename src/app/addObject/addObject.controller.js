export class AddObjectController {
  constructor($scope, api) {
    'ngInject';
    this.$scope = $scope;
    this.api = api;
    this.emptyLink = {link: 'http://example.com/img.png'};
    this.newObject = {
      images: [this.emptyLink]
    };
  }

  addImage() {
    this.newObject.images.push(angular.copy(this.emptyLink));
  }

  removeImage(index) {
    this.newObject.images.splice(index, 1);
  }

  addObject() {
    this.api
      .post(`waterObjects`, {
        name: this.newObject.name,
        lat: this.newObject.lat,
        lng: this.newObject.lng,
        desc: this.newObject.desc,
        images: this.newObject.images,
      })
      .then(response => {
        console.log(response);
      })
  }

}
