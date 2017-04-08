export class MainController {
  constructor ($timeout) {
    'ngInject';
    this.items = [
      {
        val: 'Allow add new objects'
      },
      {
        val: 'See objects on the map'
      },
      {
        val: 'Edit object'
      },
      {
        val: 'Calculating the nearest object to your location'
      },
      {
        val: 'Calculating the distance between your location and object'
      }
    ];
  }

}
