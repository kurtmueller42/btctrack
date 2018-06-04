// 

var btcservice = require('./btcservice');
var datastore = require('./datastore');
var emailservice = require('./emailservice');



async function handleBtcPriceChange(pricechange) {
    console.log('Handling a price change from ' + pricechange.oldPrice + ' to ' + pricechange.newPrice);
    var alerts = await datastore.GetAlertsByThreshold(pricechange.oldPrice, pricechange.newPrice);
    for (var i = 0; i < alerts.length; i++) {
        var nextAlert = alerts[i];
        emailservice.TriggerThresholdEmail(pricechange.oldPrice, pricechange.newPrice, nextAlert);
    }
}


module.exports = {
    initialize : function () {
        btcservice.AddListener(handleBtcPriceChange);
    },

    // Normally the service layer adds business logic before calling the DAO layer but this is all basically straight crud so we essentially wrap the datastore
    createAlert : function(alert) {
        // We assume the alert object was validated already by the controller
        return datastore.CreateAlert(alert);
    },

    getAlerts : function() {
        return datastore.GetAllAlerts();
    },

    deleteAlert : function(alertId) {
        return datastore.DeleteAlert(alertId);
    },

    updateAlert : function(alert) {
        return datastore.UpdateAlert(alert);
    }
}
