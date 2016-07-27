angular.module('buscacomida.servicios', [])

.service('serFavorito', ['$rootScope', '$firebaseObject', '$ionicListDelegate', '$ionicPopup', '$cordovaVibration', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', 'fabFavoritos', function ($rootScope, $firebaseObject, $ionicListDelegate, $ionicPopup, $cordovaVibration, $ionicPlatform, $cordovaLocalNotification, $cordovaToast, fabFavoritos) {
  this.modificar = function (localId, local, arrFavoritos, objFavoritos) {
  	if ($rootScope.usuarioFirebase) {
      $ionicListDelegate.closeOptionButtons();
      if (arrFavoritos.$getRecord(localId)) {
        console.log('Eliminar');
        var ventanaConfirmar = $ionicPopup.confirm({
          title: 'Confirmar eliminación',
          template: '¿Está seguro de eliminar este favorito?'
        });

        ventanaConfirmar.then(function (res) {
          if (res) {
            arrFavoritos.$remove(arrFavoritos.$getRecord(localId)).then(function (respuesta) {
              local.favoritos = (local.favoritos - 1 >= 0) ? local.favoritos - 1 : 0;
              local.$save().then(function () {
                fabFavoritos.eliminarDeFavoritos(localId);
              }, function (error) {
                console.log('Error', error);
              });
            }).catch(function (error) {
              console.log(error);
            });
            if (window.cordova) {
              $cordovaVibration.vibrate(100);
            }
          } else {
            console.log('Cancelado');
          }
        });
      } else {
        console.log('Agregar');
        objFavoritos[localId] = true;
        objFavoritos.$save().then(function () {
          fabFavoritos.agregarAFavoritos(localId);
          local.favoritos += 1;
          local.$save().then(function () {
            $ionicPlatform.ready(function () {
              if (window.cordova) {
                $cordovaLocalNotification.schedule({
                  id: 1,
                  title: "Favorito agregado",
                  text: local.nombre
                }).then(function () {
                  console.log('Favorito agregado', local.nombre);
                },
                function () {
                  console.log('No se pudo mostrar la notificación');
                });

                $cordovaToast.show('Favorito agregado ' + local.nombre, 'long', 'bottom')
                .then(function (correcto) {
                  console.log(correcto);
                }, function (error) {
                  console.log(error);
                });
              }
            });
          }, function (error) {
            console.log('Error', error);
          })
        }, function (error) {
          console.log('Error', error);
        });
      }
    }
  }
}])