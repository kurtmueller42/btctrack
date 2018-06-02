// 

var btcservice = require('./btcservice');
var datastore = require('./datastore');
var emailservice = require('./emailservice');



function handleBtcPriceChange(pricechange) {
    console.log('Handling a price change from ' + pricechange.oldPrice + ' to ' + pricechange.newPrice);
    var alerts = datastore.GetAlertsByThreshold(pricechange.oldPrice, pricechange.newPrice);
    for (var i = 0; i < alerts.length; i++) {
        var nextAlert = alerts[i];
        emailservice.TriggerThresholdEmail(pricechange.oldPrice, pricechange.newPrice, nextAlert);
    }
}


module.exports = {
    initialize : function () {
        btcservice.AddListener(handleBtcPriceChange);
    }
}
