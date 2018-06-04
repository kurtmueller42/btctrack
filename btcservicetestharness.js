// Exports the same interface as btcservice, but provides fake data
// TODO: could be abstracted better since everything but "getCurrentPrice" is copy-pasted

var listeners = [ ];

// For now we're not going to keep a permanent record of prices, just the current price
// This is an object that holds both price and the time that price was queried
var curPrice;

function handlePriceChange(oldPrice, newPrice) {
    var pricechange = { 'oldPrice' : oldPrice, 'newPrice' : newPrice };
    for (var i =0; i < listeners.length; i++) {
        var listener = listeners[i];
        listener(pricechange);
    }
}

function getCurrentPrice() {
    var queryTime = new Date();
    var max = 10;
    var min = 1;
    var randomValue = Math.floor(Math.random() * (max - min + 1)) + min; 
    return Promise.resolve({
        price : randomValue,
        time : queryTime
    });
}


// Every minute, query BTC price
async function runServiceLoop() {
    console.log('Beginning price query');
    var newPrice = await getCurrentPrice();
    if (newPrice == null) {
        // Failure to update
        return;
    }
    // Check for out-of-order returns e.g. a call to the bitcoin API took an hour to return its value
    if (newPrice.time < curPrice.time) {
        return;
    }
    handlePriceChange(curPrice.price, newPrice.price);
    curPrice = newPrice;
}


async function initializeService() {
    var priceobj = await getCurrentPrice();
    if (priceobj == null) {
        //Failure to initialize server?
        // I guess we can just sleep and try again
        console.log('Failed to initialize server with starting btc price. Trying again.');
        setTimeout(initializeService, 1000);
        return;
    }
    curPrice = priceobj;
    var secondsToQuery = 10;
    console.log('Running btc alert service, checking bitcoin price every ' + secondsToQuery + ' seconds');
    setInterval(runServiceLoop, 1000 * secondsToQuery);
}

initializeService(); 


module.exports = {
    // Adds a listener
    // Whenever price changes, listeners are called with a PriceChange object, which is simply { 'oldPrice' : _ , 'newPrice' : _ }
    AddListener : function(listener) {
        listeners.push(listener);
    }
}