
// Database
var pg = require('pg');
var conString = "postgres://postgres:test@localhost:5432/btc";
var client = new pg.Client(conString);
client.connect();

// Maps database layer representation to service layer representation
function dataAlertToJavascriptAlert(dataAlert) {
    var direction;
    if (dataAlert.trigger_up && dataAlert.trigger_down) {
        direction = 'BOTH';
    } else if (dataAlert.trigger_up) {
        direction = 'UP';
    } else {
        direction = 'DOWN';
    }
    dataAlert.direction = direction;
    dataAlert.trigger_up = undefined;
    dataAlert.trigger_down = undefined;
    return dataAlert;
}


module.exports = {

    // Returns all alerts in the database
    // TODO: consider paginating
    GetAllAlerts: async function() {
        try {
            var query = await client.query('SELECT * from alert');
            return query.rows.map(dataAlert => dataAlertToJavascriptAlert(dataAlert));    
        } catch (err) {
            console.log(err.stack);
            return null;
        }
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
        try {
            var query = await client.query('SELECT * from alert where threshold > ' + botValue + ' and threshold < ' + topValue + andString);
            return query.rows;    
        } catch(err) {
            console.log(err.stack);
            return null;
        }
    },

    // Creates alert from object provided. Ignores ID field if set 
    CreateAlert: async function(alert) {
        // Use prepared statements for easy sanitization
        var trigger_up;
        var trigger_down;
        if (alert.direction == 'UP') {
            trigger_up = true;
            trigger_down = false;
        } else if (alert.direction == 'DOWN') {
            trigger_up = false;
            trigger_down = true;
        } else if (alert.direction == 'BOTH') {
            trigger_up = true;
            trigger_down = true;
        }
        const query = {
            text : 'INSERT into alert (threshold, email_address, trigger_up, trigger_down) values ($1, $2, $3, $4)',
            values : [alert.threshold, alert.email_address, trigger_up, trigger_down]
        };
        try {
            var res = await client.query(query);
            console.log(res);
        } catch (err) {
            console.log(err.stack);
            return null;
        }
    },

    // Deletes alert by ID
    DeleteAlert: async function(alertId) {

    },

    // updates by the ID on the alert
    UpdateAlert: async function(alert) {

    }

}
