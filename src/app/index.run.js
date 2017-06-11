(function construct() {
  'use strict';

  angular.module('FleetApp')
    .run(Run)

  /** @ngInject */
  function Run ($log) {
    $log.info('App running on date: %s', new Date().toISOString());
  }
})();


