export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'ctrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'app/about/about.html',
      controller: 'AboutController',
      controllerAs: 'ctrl'
    })
    .state('map', {
      url: '/map',
      templateUrl: 'app/map/map.html',
      controller: 'MapPageController',
      controllerAs: 'ctrl'
    })
    .state('addObject', {
      url: '/addObject',
      templateUrl: 'app/addObject/addObject.html',
      controller: 'AddObjectController',
      controllerAs: 'ctrl'
    })
    .state('waterObject', {
      url: '/waterObject?{id}',
      templateUrl: 'app/waterObject/waterObject.html',
      controller: 'WaterObjectController',
      controllerAs: 'ctrl'
    });

  $urlRouterProvider.otherwise('/');
}
