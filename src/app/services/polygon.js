export class PolygonsService {
  constructor(api, $q) {
    'ngInject';
    this.$q = $q;
    this.api = api;
  }
  get(id) {
    var deferred = this.$q.defer();

    this.api
      .get(`getPolygon?id=${id}`)
      .then(response => {
      var result = response.data.geometries[0].coordinates[0][0].map(item => ({
        lng: item[0],
        lat: item[1]
      }));
      deferred.resolve(result);
    }, response => {
      console.dir(response);
    });

    return deferred.promise;
  }
}
