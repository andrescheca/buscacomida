angular.module('buscacomida.controladores', [])

.controller('AppCtrl', ['$rootScope', '$scope', '$ionicModal', '$cordovaOauth', 'Autenticacion', function ($rootScope, $scope, $ionicModal, $cordovaOauth, Autenticacion) {
  // Con el nuevo almacenamiento de cache de vistas en Ionic, los controladores
  // solo son llamados al momento de crearlos, en lugar de cada vez que 
  // se visita una página.
  // Para escuchar cuando la página está activa (por ejemplo, para refrescar
  // la información), se necesita escuchar el evento $ionicView.enter:
  //$scope.$on('$ionicView.enter', function (e) {
  //});
  $scope.registrar = false;
  $scope.error;
  $scope.modal;

  // Variable que almacena los datos de inicio de sesión
  $scope.dataInicioSesion = {};

  // Cierra el panel modal
  $scope.cerrarPanelInicioSesion = function () {
    $scope.modal.hide();
    $scope.dataInicioSesion = {};
    $scope.error = '';
  };

  // Abre el panel modal
  $scope.abrirPanelInicioSesion = function () {
    $scope.modal.show();
  };
  
  // Registra un usuario
  $scope.registrarUsuario = function (evento) {
    evento.preventDefault();
    $scope.error = '';
    $scope.registrar = true;
  }


}])

.controller('CategoriasCtrl', ['$scope', function ($scope) {
  var ref = firebase.database().ref('categorias').orderByChild('nombre');
}])

.controller('LocalesCtrl', ['$rootScope', '$scope', '$stateParams', '$firebaseObject', '$firebaseArray', function ($rootScope, $scope, $stateParams, $firebaseObject, $firebaseArray) {
  var refLocales = firebase.database().ref('locales').orderByChild('nombre');
  var refCategoria = firebase.database().ref('categorias/' + $stateParams.categoriaId).orderByChild('nombre');
  
  // Filtra los locales por categoría
  $scope.filtrarPorCategoria = function (local) {
    if ($stateParams.categoriaId) {
      return local.categorias.hasOwnProperty($stateParams.categoriaId);
    }
    return true;
  }

  // Retorna un arreglo con el total de campos de "numero".
  $scope.rango = function (numero) {
    return new Array(numero);
  }
}])
