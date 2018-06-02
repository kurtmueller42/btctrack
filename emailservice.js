

module.exports = {

    // The alert object contains the threshold, email address, and direction of the threshold
    TriggerThresholdEmail: function(oldPrice, newPrice, alert) {
        // TODO
        // For now console log
        console.log('This is an alert for ' + alert.email_address + ' that the price changed from ' + oldPrice + ' to ' + newPrice);
    }
}