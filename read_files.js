// Ejemplo de lectura de archivos

var fs = require('fs');

console.log('Este comando se ejecuta antes de abrir el archivo');

fs.readFile('APLIPAGO_ZENDBID_OPERADO_20170402_20170501_cgongoram.CSV','utf8', function(error, data) {
	console.log(data);
});

console.log('Este comando se ejecuta DESPUES de abrir el archivo');