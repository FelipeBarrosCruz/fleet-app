(function construct() {
  'use strict';

  angular.module('FleetApp')
    .controller('HomeController', HomeController)

  /** @ngInject */
  function HomeController ($log, $translate, $location, _, HomeService, DEFAULT_FUEL_TYPES) {
    $log.info('HomeController initialized on date: %s', new Date().toISOString());
    var vm = this;
    vm.searchText = null;
    vm.list = [];
    vm.pageList = [];
    vm.pagination = {
      page: $location.search().page || 1,
      limit: $location.search().limit || 5,
      maxSize: 5
    };
    vm.doCreate = doCreate;
    vm.doUpdate = doUpdate;
    vm.doDelete = doDelete;
    vm.doPaginate = doPaginate;
    vm.getFuelTranslateByValue = getFuelTranslateByValue;
    vm.filterByNameAndFuel = filterByNameAndFuel;

    (function construct () {
      HomeService.getList(function onDone (err, list) {
        if (err) return;
        vm.list = _.orderBy(list, 'id', 'desc');
        return doPaginate();
      })
    }());

    function doPaginate () {
      $location.search({page: vm.pagination.page, limit: vm.pagination.limit});
      return vm.pageList = HomeService.paginate(vm.pagination, vm.list);
    }

    function doCreate () {
      return HomeService.openModal({
        title: 'CREATE_MODAL_TITLE',
        actionType: 'create'
      }, function onDone (err, result) {
        if (err) return;
        vm.list.unshift(result);
        return doPaginate();
      });
    }

    function doUpdate (data) {
      return HomeService.openModal({
        title: 'UPDATE_MODAL_TITLE',
        actionType: 'update',
        formData: data
      }, function onDone (err, result) {
        if (err) return;
        return _.merge(_.find(vm.pageList, { id: result.id }), result);
      })
    }

    function doDelete (data) {
      HomeService.deleteAlert(data, function onDelete (err) {
        if (err) return;
        return _.remove(vm.list, data);
      });
    }
    
    function getFuelTranslateByValue (value) {
      return $translate.instant(_.find(DEFAULT_FUEL_TYPES, { value: value}).name);
    }

    function filterByNameAndFuel (data) {
      if (!vm.searchText) return true;
      return data.fuel.toLowerCase().indexOf(vm.searchText) >= 0 
            || data.brand.toLowerCase().indexOf(vm.searchText) >= 0;
    }
  }
})();
