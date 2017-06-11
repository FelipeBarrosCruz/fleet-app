(function construct() {
  'use strict';

  angular.module('FleetApp')
    .service('HomeService', HomeService)

  /** @ngInject */
  function HomeService ($log, $uibModal, _, SweetAlert, WebAPI) {
    $log.info('HomeService initialized on date: %s', new Date().toISOString());

    function getList (done) {
      WebAPI.select().then(function onSelected (result) {
        return done(null, result)
      }).catch(function onError(err) {
        $log.error('Error when select list', err);
        return done(err)
      });
    }

    function paginate (options, list) {
      var paginate = _.clone(options);
      return list.slice(((--paginate.page) * paginate.limit), (++paginate.page) * paginate.limit);
    }

    function openModal (options, done) {
      $uibModal.open({
        templateUrl: 'app/components/create-update/create-update.html',
        controller: 'CreateUpdateComponentController',
        controllerAs: 'create_update_component_vm',
        resolve: {
          options: function () {
            return options;
          }
        }
      }).result.then(function onResult (result) {
        $log.info('Modal result', result);
        return done(null, result);
      }).catch(function onError(err) {
        $log.error('Modal error', err);
        return done(err);
      })
    }

    function deleteAlert (data, done) {
      SweetAlert.swal({
        title: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d9534f",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
      }, function onConfirm () {
        WebAPI.remove(data.id).then(function onRemoved() {
          $log.info('Delete with success id [%s]', data.id);
          return done(null);
        }).catch(function onError (err) {
          $log.error('Error on remove', err);
          return done(err);
        });
      });
    }

    return {
      getList: getList,
      paginate: paginate,
      openModal: openModal,
      deleteAlert: deleteAlert
    };
  }

})();
