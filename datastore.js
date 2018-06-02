
// Database
var pg = require('pg');
var conString = "postgres://postgres:test@localhost:5432/btc";
var client = new pg.Client(conString);
client.connect();



module.exports = {

    // Returns all alerts in the database
    // TODO: consider paginating
    GetAllAlerts: async function() {
        var query = await client.query('SELECT * from alert');
        return query.rows;
    },
    
    // Gets alerts triggered by moving from oldVal to newVal
    // Filters properly by direction using the sign of newVal - oldVal
    // TODO: consider paginating
    GetAlertsByThreshold: async function(oldVal, newVal) {
        var upflag = false;
        var downflag = false;
        var andString = '';
        if (newVal > oldVal) {
            andString = ' and trigger_up = true';
            botValue = oldVal;
            topValue = newVal;
        } else {
            andString = ' and trigger_down = true';
            botValue = newVal;
            topValue = oldVal;
        }
        var query = await client.query('SELECT * from alert where threshold > ' + botValue + ' and threshold < ' + topValue + andString);
        console.log(query.rows);
        return query.rows;
    },

    // Creates alert from object provided. Ignores ID field if set 
    CreateAlert: async function(alert) {

    },

    // Deletes alert by ID
    DeleteAlert: async function(alertId) {

    },

    // updates by the ID on the alert
    UpdateAlert: async function(alert) {

    }

}
