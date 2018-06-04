module.exports = { 

    MakeServer: function () {

    var express = require('express');
    var application = require('./btcapplication');
    var router = require('./btccontroller');
    var app = express();
    app.use(express.json());
    var port = 8080;

    application.initialize();

    app.use('/btc', router.GetRouter(application));
    app.listen(port);
    console.log('Listening now');

    },

MakeTestServer : function () {

    var express = require('express');
    var application = require('./btcapplication');
    var router = require('./btccontroller');
    var app = express();
    app.use(express.json());
    var port = 8080;

    application.initializeTest();

    app.use('/btc', router.GetRouter(application));
    app.listen(port);
    console.log('Listening now');
    }

};