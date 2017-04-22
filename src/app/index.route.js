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
    .state('legislation', {
      url: '/legislation',
      templateUrl: 'app/legislation/legislation.html',
      controller: 'LegislationController',
      controllerAs: 'ctrl'
    })
    .state('control', {
      url: '/control',
      templateUrl: 'app/control/control.html'
    })
    .state('addObject', {
      url: '/addObject?{id}',
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
