// 

var btcservice = require('./btcservice');
var datastore = require('./datastore');
var emailservice = require('./emailservice');



function handleBtcPriceChange(pricechange) {
    console.log('Handling a price change from ' + pricechange.oldPrice + ' to ' + pricechange.newPrice);
}


module.exports = {
    initialize : function () {
        btcservice.AddListener(handleBtcPriceChange);
    }
}
