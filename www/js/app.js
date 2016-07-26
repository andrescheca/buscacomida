// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'buscacomida' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'buscacomida.controladores' is found in controladores.js
angular.module('buscacomida', ['ionic',  'ngCordova', 'ngCordovaOauth', 'firebase', 'buscacomida.controladores', 'buscacomida.fabricas', 'buscacomida.servicios', 'buscacomida.filtros'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.cordova) {
        window.open = InAppBrowser.open;
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'plantillas/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.categorias', {
    url: '/categorias',
    views: {
      'contenidoMenu': {
        templateUrl: 'plantillas/categorias.html',
        controller: 'CategoriasCtrl'
      }
    }
  })

  .state('app.locales', {
    url: '/categorias/:categoriaId',
    views: {
      'contenidoMenu': {
        templateUrl: 'plantillas/locales.html',
        controller: 'LocalesCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/categorias');
});
