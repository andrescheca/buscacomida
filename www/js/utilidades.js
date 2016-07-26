// Obtiene el error de acuerdo a un código.
function obtenerError(error) {
  switch (error.code) {
    case 'email-already-in-use': return 'El correo ya existe.';
    case 'auth/argument-error' : return 'Los campos son obligatorios.';
    case 'auth/invalid-email' : return 'El correo no es válido.';
    case 'auth/weak-password' : return 'Mínimo 6 caracteres para la contraseña.';
    case 'auth/wrong-password' : return 'La contraseña no es válida.';
    case 'auth/too-many-requests' : return 'Se ha bloqueado el usuario, intente luego.';
    case 'auth/user-not-found' : return 'No existe el usuario.';
  }
  return error.message || 'Existe un error';
}

// Compara por la propiedad Nombre.
function compararPorNombre(a, b) {
  return a.nombre.localeCompare(b.nombre);
}