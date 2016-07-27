angular.module('buscacomida.controladores', [])

.controller('AppCtrl', ['$rootScope', '$scope', '$ionicModal', '$cordovaOauth', 'Autenticacion', function ($rootScope, $scope, $ionicModal, $cordovaOauth, Autenticacion) {
  var refUsuarios = firebase.database().ref('usuarios');
  // Variable que tiene la información de inicio de sesión
  $scope.autenticacion = Autenticacion;
  $scope.registrar = false;
  $scope.error;
  // Evento que escucha cuando cambia el estado
  $scope.autenticacion.$onAuthStateChanged(function (usuarioFirebase) {
    // Cerrar el panel modal
    $scope.cerrarPanelInicioSesion();
    $rootScope.usuarioFirebase = usuarioFirebase;
    // Escribir en los usuarios solo si existe uno
    if (usuarioFirebase != null) {
      refUsuarios.child(usuarioFirebase.uid).set({
        nombre: usuarioFirebase.displayName || usuarioFirebase.email,
        imagen: usuarioFirebase.photoURL || 'img/sin_usuario.png' 
      });
    }
  });

  // Con el nuevo almacenamiento de cache de vistas en Ionic, los controladores
  // solo son llamados al momento de crearlos, en lugar de cada vez que 
  // se visita una página.
  // Para escuchar cuando la página está activa (por ejemplo, para refrescar
  // la información), se necesita escuchar el evento $ionicView.enter:
  //$scope.$on('$ionicView.enter', function (e) {
  //});

  // Variable que almacena los datos de inicio de sesión
  $scope.dataInicioSesion = {};

  // Crear el panel modal que se utilizará para iniciar sesión.
  $ionicModal.fromTemplateUrl('plantillas/iniciar_sesion.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });

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
  
  // Iniciar sesión con Twitter
  $scope.iniciarSesionTwitter = function (evento) {
    evento.preventDefault();
    if (window.cordova) {
      // En dispositivos
      // TODO: Obtener credenciales de twitter
      $cordovaOauth.twitter('rHbB6ifRuVkH3LXzw3Bv68rZn', 'bW9a4Q9QwFGTFBkLMBGq8kKlwRMTT0sf5N9Vqp5DthtR50F2aJ').then(function (credenciales) {
        var proveedor = firebase.auth.TwitterAuthProvider.credential(credenciales.oauth_token, credenciales.oauth_token_secret);
        $scope.autenticacion.$signInWithCredential(proveedor).then(function (usuarioFirebase) {
          console.log("Iniciada la sesión con:", usuarioFirebase.uid);
        }).catch(function (error) {
          console.error("Falló la autenticación:", error);
        });
      }, function (error) {
        console.log(error);
      });
    } else {
      // Funciona en browser pero no en dispositivos
      $scope.autenticacion.$signInWithPopup('twitter').then(function (usuarioFirebase) {
        console.log("Iniciada la sesión con:", usuarioFirebase.user.uid);
      }).catch(function (error) {
        console.error("Falló la autenticación:", error);
      });
    }
  }

  // Registra un usuario
  $scope.registrarUsuario = function (evento) {
    evento.preventDefault();
    $scope.error = '';
    $scope.registrar = true;
  }

  // Enviar registro
  $scope.enviarRegistro = function (evento) {
    evento.preventDefault();
    if ($scope.dataInicioSesion.correo && $scope.dataInicioSesion.contrasena && $scope.dataInicioSesion.contrasenaNueva && $scope.dataInicioSesion.contrasena == $scope.dataInicioSesion.contrasenaNueva) {
      $scope.error = '';
      $scope.autenticacion.$createUserWithEmailAndPassword($scope.dataInicioSesion.correo, $scope.dataInicioSesion.contrasena)
      .then(function (usuarioFirebase) {
        console.log('Usuario ' + usuarioFirebase.uid + ' creado exitosamente!');
        $scope.cerrarPanelInicioSesion();
      }).catch(function (error) {
        console.error('Error:', error);
        $scope.error = obtenerError(error);
      });
    } else if (!$scope.dataInicioSesion.contrasena || !$scope.dataInicioSesion.contrasenaNueva || !$scope.dataInicioSesion.correo) {
      $scope.error = 'Todos los datos son requeridos.';
    } else if ($scope.dataInicioSesion.contrasena != $scope.dataInicioSesion.contrasenaNueva) {
      $scope.error = 'Las contraseñas no coinciden.';
    } 
  }

  // Realiza el proceso de iniciar sesión
  $scope.iniciarSesion = function (evento) {
    evento.preventDefault();
    if ($scope.dataInicioSesion.correo && $scope.dataInicioSesion.contrasena) {
      console.log('Iniciando sesión');
      firebase.auth().signInWithEmailAndPassword($scope.dataInicioSesion.correo, $scope.dataInicioSesion.contrasena)
      .then(function (usuarioFirebase) {
        $scope.cerrarPanelInicioSesion();
      }).catch(function (error) {
        console.error('Error: ', error);
        $scope.error = obtenerError(error);
        // Es necesario utilizar $scope.$apply(); ya que es una llamada asíncrona;
        $scope.$apply();
      });
    } else {
      $scope.error = 'Todos los datos son requeridos.';
    }
  };
}])

.controller('CategoriasCtrl', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {
  var ref = firebase.database().ref('categorias').orderByChild('nombre');
  $scope.categorias = $firebaseArray(ref);

  // Cada vez que hay un cambio, se reordena
  $scope.categorias.$watch(function () { $scope.categorias.sort(compararPorNombre); });
}])

.controller('LocalesCtrl', ['$rootScope', '$scope', '$stateParams', '$firebaseObject', '$firebaseArray', 'fabFavoritos', 'serFavorito', function ($rootScope, $scope, $stateParams, $firebaseObject, $firebaseArray, fabFavoritos, serFavorito) {
  var refLocales = firebase.database().ref('locales').orderByChild('nombre');
  var refCategoria = firebase.database().ref('categorias/' + $stateParams.categoriaId).orderByChild('nombre');
  var refFavoritos = firebase.database().ref('favoritos/' + ($rootScope.usuarioFirebase ? $rootScope.usuarioFirebase.uid : 'sin_usuario'));

  var objFavoritos = $firebaseObject(refFavoritos);
  $scope.arrFavoritos = $firebaseArray(refFavoritos);

  $scope.categoria = $firebaseObject(refCategoria);
  $scope.locales = $firebaseArray(refLocales);
  
  // Cada vez que hay un cambio, se reordena
  $scope.locales.$watch(function () { $scope.locales.sort(compararPorNombre); });

  // Filtra los locales por categoría
  $scope.filtrarPorCategoria = function (local) {
    if ($stateParams.categoriaId) {
      return local.categorias.hasOwnProperty($stateParams.categoriaId);
    }
    return true;
  }

  // Modifica el registro de favorito
  $scope.modificarFavorito = function (localId) {
    var local = $firebaseObject(refLocales.ref.child(localId));
    serFavorito.modificar(localId, local, $scope.arrFavoritos, objFavoritos);
  }

  // Retorna un arreglo con el total de campos de "numero".
  $scope.rango = function (numero) {
    return new Array(numero);
  }
}])

.controller('LocalCtrl', ['$rootScope', '$scope', '$stateParams', '$ionicModal', '$firebaseObject', '$firebaseArray', 'fabFavoritos', 'serFavorito', function ($rootScope, $scope, $stateParams, $ionicModal, $firebaseObject, $firebaseArray, fabFavoritos, serFavorito) {
  var refLocal = firebase.database().ref('locales/' + $stateParams.localId).orderByChild('nombre');
  var refFavoritos = firebase.database().ref('favoritos/' + ($rootScope.usuarioFirebase ? $rootScope.usuarioFirebase.uid : 'sin_usuario'));
  var refUsuarios = firebase.database().ref('usuarios');

  var local = $firebaseObject(refLocal);
  var objFavoritos = $firebaseObject(refFavoritos);
  var objUsuarios = $firebaseArray(refUsuarios);
  $scope.arrFavoritos = $firebaseArray(refFavoritos);
  
  // Mostrar en el dom
  $scope.local = local;
  // Unión de tres vias (Three-way data bindings)
  local.$bindTo($scope, "local");
  $scope.date = new Date();

  $scope.comentario = {};

  // Crear el panel modal que se utilizará para mostrar los comentarios
  $ionicModal.fromTemplateUrl('plantillas/comentarios.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
    // Iniciar variable de comentario
    $scope.comentario = {};
  });

  // Filtra los locales por categoría
  $scope.obtenerUsuario = function (idUsuario) {
    return objUsuarios.$getRecord(idUsuario);
  }

  $scope.enviarComentario = function () {
    if ($scope.comentario.mensaje.trim().length > 0) {
      var comentario = {
          mensaje: $scope.comentario.mensaje.trim(),
          fecha: Date.now(),
          usuario: $rootScope.usuarioFirebase.uid
      };

      // TODO: Ingreso de comentarios
    }
  }

  // Cierra el panel modal
  $scope.cerrarPanelComentarios = function () {
    $scope.modal.hide();
  };

  // Abre el panel modal
  $scope.abrirPanelComentarios = function () {
    $scope.modal.show();
  };

  // Retorna un arreglo con el total de campos de "numero".
  $scope.rango = function (numero) {
    return new Array(numero);
  }

  // Modifica el registro de favorito
  $scope.modificarFavorito = function (localId) {
    serFavorito.modificar(localId, local, $scope.arrFavoritos, objFavoritos);
  }
}])

.controller('FavoritosCtrl', ['$rootScope', '$scope', '$firebaseArray', '$firebaseObject', 'fabFavoritos', 'serFavorito', 'Autenticacion', function ($rootScope, $scope, $firebaseArray, $firebaseObject, fabFavoritos, serFavorito, Autenticacion) {
  var refLocales = firebase.database().ref('locales').orderByChild('nombre');
  var refFavoritos = firebase.database().ref('favoritos/' + ($rootScope.usuarioFirebase ? $rootScope.usuarioFirebase.uid : 'sin_usuario'));

  $scope.locales = $firebaseArray(refLocales);
  $scope.favoritos = $firebaseArray(refFavoritos);
  
  $scope.mostrarEliminar = false;

  // Refresca los datos si cambia el usuario
  Autenticacion.$onAuthStateChanged(function (usuarioFirebase) {
    $scope.mostrarEliminar = false;
    refFavoritos = firebase.database().ref('favoritos/' + ($rootScope.usuarioFirebase ? $rootScope.usuarioFirebase.uid : 'sin_usuario'));
    $scope.favoritos = $firebaseArray(refFavoritos);
  });

  // Filtra los locales por categoría
  $scope.filtrarPorCategoria = function (local) {
    return $scope.favoritos.$getRecord(local.$id)
  }

  // Cambia el estado de la bandera de eliminar
  $scope.cambiarEstadoEliminar = function () {
    $scope.mostrarEliminar = !$scope.mostrarEliminar;
  }

  // Elimina el favorito del listado
  $scope.eliminarFavorito = function (local) {
    var local = $firebaseObject(refLocales.ref.child(local.$id));
    var objFavoritos = $firebaseObject(refFavoritos);
    // Modifica el registro de favorito
    serFavorito.modificar(local.$id, local, $scope.favoritos, objFavoritos);
  }

  // Retorna un arreglo con el total de campos de "numero".
  $scope.rango = function (numero) {
    return new Array(numero);
  }
}]);
