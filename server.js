module.exports = { MakeServer: function () {

    var express = require('express');
    var application = require('./btcapplication');
    var router = require('./btccontroller');
    var app = express();
    var port = 8080;

    application.initialize();

    app.use('/btc', router.GetRouter(application));
    app.listen(port);
    console.log('Listening now');

}
};