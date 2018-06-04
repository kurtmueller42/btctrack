// Router / controller for managing btc alerts

var btcApplication;

function validateAlertWithId(alert) {
    if (!validateAlertWithoutId(alert)) {
        return false;
    }

    try{
        alert.id = parseInt(alert.id);
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
        alert.threshold = parseFloat(alert.threshold);
        if (typeof alert.threshold !== 'number' || isNaN(alert.threshold) || !isFinite(alert.threshold)) {
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

function getAllAlerts() {
    return btcApplication.getAlerts();
}

function createAlert(req) {
    // Check the objects format
    if (!validateAlertWithoutId(req)) {
        return null;
    }

    return btcApplication.createAlert(req);
}

function updateAlert(req) {
    // Check the objects format
    if (!validateAlertWithId(req)) {
        return null;
    }

    return btcApplication.updateAlert(req);
}

function deleteAlert(req) {
    // Check the objects format
    if (!validateAlertWithId(req)) {
        return null;
    }

    return btcApplication.deleteAlert(req.id);
}

module.exports = {
    GetRouter : function (btcapplication) {
        btcApplication = btcapplication;
        var express = require('express');
        var router = express.Router();
        router.get('/alerts', async (req, res) => {
            try {
                var retVal = await getAllAlerts();
                res.json(retVal);       
            } catch (err) {
                console.log(err);
                res.statusCode = 500;
                res.end();  
            }
        });
        router.post('/alerts', async (req, res) => {
            try {
                var result = await createAlert(req.body);
                if (result == null) {
                    res.statusCode = 400;
                    res.json('Malformed input');
                } else if (result <= 0) {
                    console.log('Failed to insert alert');
                    res.statusCode(500);
                    res.end();  
                } else {
                    res.statusCode = 200; //success
                    res.end();  
                }    
            } catch (err) {
                console.log(err);
                res.statusCode = 500;
                res.end();  
            }
        });
        // TODO this is throwing 500 on bad input updating nonexistant row
        router.put('/alerts', async (req, res) => {
            try {
                var result = await updateAlert(req.body);
                if (result == null) {
                    res.statusCode = 400;
                    res.json('Malformed input');
                } else if (result <= 0) {
                    console.log('Failed to update alert');
                    res.statusCode =500;
                    res.end();  
                } else {
                    res.statusCode = 200; //success
                    res.end();  
                }    
            } catch (err) {
                console.log(err);
                res.statusCode(500);
                res.end();  
            }
        });
        router.delete('/alerts', async (req, res) => {
            try {
                var result = await deleteAlert(req.body);
                if (result == null) {
                    res.statusCode = 400;
                    res.json('Malformed input');
                } else if (result <= 0) {
                    console.log('Failed to delete alert');
                    res.statusCode = 500;
                    res.end();  
                } else {
                    res.statusCode = 200; //success
                    res.end();  
                }    
            } catch (err) {
                console.log(err);
                res.statusCode = 500;
                res.end();  
            }
        });
          
        return router;
    }
}