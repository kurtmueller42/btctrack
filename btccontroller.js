// Router / controller for managing btc alerts

var btcApplication;

function validateAlertWithId(alert) {
    if (!validateAlertWithoutId(alert)) {
        return false;
    }

    try{
        if (typeof alert.id !== 'number') {
            return false;
        }    
        if (alert.id <= 0) {
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
}

function validateAlertWithoutId(alert) {
    try {
        if (typeof alert.threshold !== 'number') {
            return false;
        }
        // TODO should I do a proper email check?
        if (typeof alert.email_address !== 'string') {
            return false
        }

        if (typeof alert.direction !== 'string') {
            return false;
        }

        if (alert.direction !== 'UP' 
            && alert.direction !== 'DOWN'
            && alert.direction !== 'BOTH') {
                return false;
        }

        return true;
    } catch (err) {
        return false;
    }
}

async function getAllAlerts(req) {
    return btcApplication.getAlerts(req);
}

function createAlert(req) {
    // Check the objects format
    if (!validateAlertWithoutId(req)) {
        return null;
    }

    btcApplication.createAlert(req);
}

module.exports = {
    GetRouter : function (btcapplication) {
        btcApplication = btcapplication;
        var express = require('express');
        var router = express.Router();
        router.get('/alerts', async (req, res) => {
            try {
                var retVal = await getAllAlerts(req);
                res.json(retVal);       
            } catch (err) {
                console.log(err);
                res.statusCode(500);
            }
        });
        router.post('/alerts', function(req, res) {
            var result = createAlert(req);
            if (result == null) {
                res.statusCode = 400;
                res.json('Malformed input');
            } else {
                res.json(result);   
            }
        });
        router.put('/alerts', function(req, res) {
            res.json({ message: 'TODO' });   
        });
        router.delete('/alerts', function(req, res) {
            res.json({ message: 'TODO' });   
        });
        router.get('/test', async (req, res) => {
            console.log('running test endpoint');
            var x = Promise.resolve('test');
            var y = await x;
            console.log(y);
            res.send(y);
        });
        return router;
    }
}