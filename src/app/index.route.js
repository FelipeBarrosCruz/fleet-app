(function construct() {
  'use strict';

  angular.module('FleetApp')
    .config(Configuration)

  /** @ngInject */
  function Configuration ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('layout', {
        abstract: true,
        templateUrl: 'app/components/layout/layout.html',
        controller: 'LayoutAbstractController',
        controllerAs: 'layout_vm'
      })
      .state('layout.home', {
        url: '/',
        views: {
          layoutContent: {
            templateUrl: 'app/components/home/home.html',
            controller: 'HomeController',
            controllerAs: 'home_vm'
          }
        }
      })
    $urlRouterProvider.otherwise('/');
  }
})();


