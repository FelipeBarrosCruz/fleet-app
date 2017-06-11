(function construct() {
  'use strict';

  angular.module('FleetApp')
    .controller('CreateUpdateComponentController', controller);

  /** @ngInject */
  function controller ($log, $uibModalInstance, $translate, _, WebAPI, 
    DEFAULT_FUEL_TYPES, CAR_BRANDS_MODELS, options) {
    $log.info('CreateUpdateComponentController initialized on date: %s', new Date().toISOString());
    var vm = this;
    var DEFAULT_FORM_DATA = {
      license_plate: null,
      model: null,
      brand: null,
      picture: null,
      fuel: null,
      value: null
    };
    vm.title = $translate.instant(options.title);
    vm.actions = {
      create: create,
      update: update
    };
    vm.doAction = doAction;
    vm.cancel = cancel;
    vm.onChangeBrand = onChangeBrand;
    vm.actionType = options.actionType || 'create';
    vm.formData = _.clone(options.formData) || DEFAULT_FORM_DATA;
    vm.fuelTypes = DEFAULT_FUEL_TYPES;
    vm.brandTypes = CAR_BRANDS_MODELS.map(function (brand) {
      return _.pick(brand, ['title', 'value']);
    });
    vm.modelTypes = [];

    (function construct () {
      if (vm.formData.brand) {
        vm.onChangeBrand();
      }
    }());

    function doAction () {
      return angular.isFunction(vm.actions[vm.actionType]) && vm.actions[vm.actionType].call(vm);
    }

    function create () {
      WebAPI.create(vm.formData).then(function onCreated (id) {
        $log.info('Created with success id [%s]', id);
        return $uibModalInstance.close(_.merge({}, vm.formData, { id: id }));
      }).catch(function onError (err) {
        return $log.error('Error on create', err);
      })
    }

    function update () {
      WebAPI.update(vm.formData).then(function onUpdated () {
        $log.info('Update with success id [%s]', vm.formData.id, vm.formData);
        return $uibModalInstance.close(_.merge({}, vm.formData));
      }).catch(function onError (err) {
        return $log.error('Error on update', err);
      });
    }

    function cancel () {
      return $uibModalInstance.dismiss('cancel');
    }

    function onChangeBrand () {
      var brand = _.find(CAR_BRANDS_MODELS, { title: vm.formData.brand });
      return vm.modelTypes = brand && angular.isArray(brand.models) && brand.models || [];
    }
  }
})();