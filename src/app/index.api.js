(function construct() {
  'use strict';

  angular.module('FleetApp')
    .service('WebAPI', WebAPI);

  /** @ngInject */
  function WebAPI ($log, $state,  $q, ngDexie, async, DATABASE_BULK) {
    var DB_TABLE_NAME = 'fleets';

    (function construct() {
      $log.info('WebAPI running on date: %s', new Date().toISOString());
      if (angular.isArray(DATABASE_BULK) && DATABASE_BULK.length) {
        var Tasks = []
        DATABASE_BULK.forEach(function eachItem (item) {
          return Tasks.push(function onTask (next) {
            return create(item).then(function onCreated () {
              return next(null);
            }).catch(function onError (err) {
              return next(err);
            });
          });
        });
        async.parallel(Tasks, function onFinish (err) {
          if (err) return $log.error('Error on bulk in data', err);
          return $state.reload();
        });
      }
    })();

    function create (data) {
      var deferred = $q.defer();
      selectByIndex('license_plate', data.license_plate).then(function onSelected(result) {
        return deferred.resolve(result.id);
      }).catch(function onError() {
        ngDexie.add(DB_TABLE_NAME, data).then(function onCreated(id) {
          return deferred.resolve(id);
        }).catch(function onError(err) {
          return deferred.reject(err);
        })
      });
      return deferred.promise;
    }

    function select () {
      return ngDexie.list(DB_TABLE_NAME);
    }

    function update (data) {
      return ngDexie.put(DB_TABLE_NAME, data);
    }

    function remove (id) {
      return ngDexie.remove(DB_TABLE_NAME, id);
    }

    function selectByIndex (index, value) {
      return ngDexie.getByIndex(DB_TABLE_NAME, index, value);
    }

    return {
      create: create,
      select: select,
      update: update,
      remove: remove,
      selectByIndex: selectByIndex
    };
  }
})();

