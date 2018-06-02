module.exports = { MakeServer: function () {

    var express = require('express');
    var application = require('./btcapplication');
    var app = express();
    var port = 8080;

    application.initialize();

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


    app.use('/btc', router);
    app.listen(port);
    console.log('Listening now');

}
};