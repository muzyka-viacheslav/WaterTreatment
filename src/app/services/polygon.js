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
      var begin = new Date();
      var result = response.data.geometries[0].coordinates[0][0].map(item => ({
        lng: item[0],
        lat: item[1]
      }));
      console.info(`Array (szie: ${result.length}) parsing: ${+new Date()} ${+begin}.`);
      deferred.resolve(result);
    }, response => {
      console.dir(response);
    });

    return deferred.promise;
  }
}
