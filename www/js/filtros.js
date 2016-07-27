angular.module('buscacomida.filtros', [])

// filtra favoritos
.filter('filtroFavoritos', function () {
  return function (locales, favoritos) {
    var salida = [];
    console.log(locales, favoritos);
    for (var i = 0; i < favoritos.length; i++) {
      for (var j = 0; j < locales.length; j++) {
        if (locales[j].id === favoritos[i].id)
          salida.push(locales[j]);
      }
    }
    return salida;
  }
})
// Filtrar locales por atributo
.filter('buscarLocal', function() {
  return function(locales, busqueda, atributos) {
    if (!locales) return locales;
    if (!busqueda) return locales;
    if (!atributos) return locales;
    var esperado = ('' + busqueda).toLowerCase();
    var resultado = {};
    var arregloAtributos = atributos.split(',');
    angular.forEach(locales, function(local, llave) {
      angular.forEach(arregloAtributos, function (atributo) {
        var actual = ('' + local[atributo]).toLowerCase();
        if (actual.indexOf(esperado) !== -1) {
          resultado[llave] = local;
        }
      })
    });
    return resultado;
  };
});