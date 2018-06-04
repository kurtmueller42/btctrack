var nodemailer = require('nodemailer');

// Pass these by environment variable I guess?
// WARNING: only do this with real credentials if you've locked down your server
var email = process.env.EMAIL;
var pass = process.env.EMAILPASS;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: pass
    }
  });


async function sendAlert(destEmail, oldPrice, newPrice) {
    var mailOptions = {
        from: email,
        to: destEmail,
        subject: 'BTC price change alert',
        text: 'Bitcoin has changed in price from ' + oldPrice + ' to ' + newPrice + '.'
      };      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email successfully sent to ' + destEmail);
        }
      });      
}
  
module.exports = {

    // The alert object contains the threshold, email address, and direction of the threshold
    TriggerThresholdEmail: function(oldPrice, newPrice, alert) {
        console.log('Sending an alert to ' + alert.email_address);
        sendAlert(alert.email_address, oldPrice, newPrice);
    }
}