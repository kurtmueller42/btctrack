// Router / controller for managing btc alerts


module.exports = {
    GetRouter : function () {
        var express = require('express');
        var router = express.Router();
        router.get('/alerts', function(req, res) {
            res.json({ message: 'TODO' });   
        });
        router.post('/alerts', function(req, res) {
            res.json({ message: 'TODO' });   
        });
        router.put('/alerts', function(req, res) {
            res.json({ message: 'TODO' });   
        });
        router.delete('/alerts', function(req, res) {
            res.json({ message: 'TODO' });   
        });
        return router;
    }
}