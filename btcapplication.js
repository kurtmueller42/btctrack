// 

var btcservice = require('./btcservice');
var datastore = require('./datastore');
var emailservice = require('./emailservice');



function handleBtcPriceChange() {

}


module.exports = {
    initialize : function () {
        btcservice.AddListener(handleBtcPriceChange);
    }
}
