(function construct() {
  'use strict';

  angular.module('FleetApp')
    .directive('navbarTop', navbarTopDirective);

  /** @ngInject */
  function navbarTopDirective () {
    return {
      templateUrl: 'app/components/navbar-top/navbar-top.html',
      controller: controller,
      controllerAs: 'navbar_top_vm'
    };
  }

  /** @ngInject */
  function controller ($log, $translate, $state, AVALIABLE_LANGUAGES, LANGUAGES_TRANSLATION_KEYS) {
    $log.info('NavBarController initialized on date: %s', new Date().toISOString());
    var vm = this;
    vm.avaliableLanguages = AVALIABLE_LANGUAGES;
    vm.mapLanguageTranslationByKey = LANGUAGES_TRANSLATION_KEYS;
    vm.switchLanguage = switchLanguage;

    function switchLanguage (language) {
      $translate.use(language);
      return $state.reload();
    }
  }
})();