(function construct() {
  'use strict';

  angular.module('FleetApp')
    .config(Configuration)

  /** @ngInject */
  function Configuration ($translateProvider, DEFAULT_LANGUAGE) {
    var langMap = {
      'en_*': 'en',
      'en-*': 'en',
      'pt_*': 'pt',
      'pt-*': 'pt'
    };

    $translateProvider
      .useLocalStorage()
      .useSanitizeValueStrategy('escape')
      .registerAvailableLanguageKeys(['en', 'pt'], langMap)
      .preferredLanguage(DEFAULT_LANGUAGE)
      .determinePreferredLanguage()
      .fallbackLanguage(DEFAULT_LANGUAGE);
  }
})();

