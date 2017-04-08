export function DiplomApi($http, $log, API_URL) {
  'ngInject';
  const bearer = localStorage.getItem('userToken');
  const errorHandler =
    function (data, status) {
      if (status >= 500) {
        $log.log(`error 500. ${data}`);
      }
    };
  const request =
    function (url, config) {
      return $http(angular.extend({
        url: `${API_URL + url}`,
        headers: {
          "Authorization": `Bearer ${bearer}`
        }
      }, config)).error(errorHandler);
    };
  return {
    get: (url, params, config) => {
      return request(url, angular.extend({method: 'GET', params}, config));
    },
    post: (url, data, config) => {
      return request(url, angular.extend({method: 'POST', data}, config));
    },
    put: (url, data, config) => {
      return request(url, angular.extend({method: 'PUT', data}, config));
    },
    delete: (url, params, config) => {
      return request(url, angular.extend({method: 'DELETE', params}, config));
    }
  };
}
