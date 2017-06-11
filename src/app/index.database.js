(function construct() {
  'use strict';

  angular.module('FleetApp')
    .config(Configuration)

  /** @ngInject */
  function Configuration (ngDexieProvider, DATABASE_OPTIONS) {
    var $log = angular.injector(['ng']).get('$log');
    $log.info('Database config init', DATABASE_OPTIONS);
    var options = { name: DATABASE_OPTIONS.name, debug: DATABASE_OPTIONS.debug }
    ngDexieProvider.setOptions(options).setConfiguration(function(database) {
      database
        .version(DATABASE_OPTIONS.version)
        .stores(DATABASE_OPTIONS.stores);
      database
        .on('error', function(err) {
          return $log.error('Database connection error: ', err);
        })
        .on('ready', function() {
          return $log.info('Database connection established');
        })
    })
  }
})();
