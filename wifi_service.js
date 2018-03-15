var util = require('util');
var bleno = require('bleno');
var wifiv2 = require('./wifiv2');
var currentNetwork = require('./currentNetwork');
var reboot = require('./reboot');
var checkAdmin = require('./checkAdmin');
var deleteNetworks = require('./deleteNetworks');
var changeNtwrkMode = require('./changeNtwrkMode');




var serviceUUID = '97859d25-749c-479e-be85-1b7880550010';

function WifiService() {
	bleno.PrimaryService.call(this, {
		uuid: serviceUUID,
		characteristics: [
		    new checkAdmin(),
			new wifiv2(),
			new currentNetwork(),
			new deleteNetworks(),
			new changeNtwrkMode(),
			new reboot()
			
		]
	});
};

util.inherits(WifiService, bleno.PrimaryService);
module.exports = WifiService;
