 var csv = require('csv-array');
 csv.parseCSV("APLIPAGO_ZENDBID_OPERADO_20170402_20170501_cgongoram.CSV", function(data){
   console.log(JSON.stringify(data, null, '\t'));
 });