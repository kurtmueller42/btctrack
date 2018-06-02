
// Database
var pg = require('pg');
var conString = "postgres://postgres:test@localhost:5432/btc";



module.exports = {

    // Returns all alerts in the database
    // TODO: consider paginating
    GetAllAlerts: function() {

    },
    
    // Gets alerts triggered by moving from oldVal to newVal
    // Filters properly by direction using the sign of newVal - oldVal
    // TODO: consider paginating
    GetAlertsByThreshold: function(oldVal, newVal) {

    },

    // Creates alert from object provided. Ignores ID field if set 
    CreateAlert: function(alert) {

    },

    // Deletes alert by ID
    DeleteAlert: function(alertId) {

    },

    // updates by the ID on the alert
    UpdateAlert: function(alert) {

    }

}
