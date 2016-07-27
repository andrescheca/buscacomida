angular.module('buscacomida.fabricas', [])

.factory('Autenticacion', ['$firebaseAuth', function ($firebaseAuth) {
  return $firebaseAuth();
}])

.factory('fabFavoritos', ['almacenamientoLocal', function (almacenamientoLocal) {
  var favoritosFabrica = {};
  var favoritos = almacenamientoLocal.obtenerObjeto('favoritos', '[]');

  favoritosFabrica.agregarAFavoritos = function (index) {
      for (var i = 0; i < favoritos.length; i++) {
          if (favoritos[i].id == index)
              return;
      }
      favoritos.push({id: index});
      almacenamientoLocal.almacenarObjeto('favoritos', favoritos);
  };
  favoritosFabrica.eliminarDeFavoritos = function (index) {
      for (var i = 0; i < favoritos.length; i++) {
          if (favoritos[i].id == index) {
              favoritos.splice(i, 1);
          }
      }
      almacenamientoLocal.almacenarObjeto('favoritos', favoritos);
  }

  favoritosFabrica.obtenerFavoritos = function () {
    console.log(favoritos);
      return favoritos;
  };
  return favoritosFabrica;
}])

.factory('almacenamientoLocal', ['$window', function ($window) {
  return {
    almacenar: function (indice, valor) {
      $window.localStorage[indice] = valor;
    },
    obtener: function (indice, valorPorDefecto) {
      return $window.localStorage[indice] || valorPorDefecto;
    },
    almacenarObjeto: function (indice, valor) {
      $window.localStorage[indice] = JSON.stringify(valor);
    },
    obtenerObjeto: function (indice, valorPorDefecto) {
      return JSON.parse($window.localStorage[indice] || valorPorDefecto);
    }
  }
}]);