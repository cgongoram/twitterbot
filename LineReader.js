

ReadFile();

function ReadFile () {
	var lineReader = require('line-reader');
	var sleep = require('system-sleep');

	lineReader.eachLine('APLIPAGO_ZENDBID_OPERADO_20170402_20170501_cgongoram.CSV', function(line, last) {
		
	 console.log(line);
	 sleep(1000);
	
	// do whatever you want with line...
	  	if(last){
	    	// or check if it's the last one
	    	console.log('Se llego al fin del archivo');
	  	}
	})
}

