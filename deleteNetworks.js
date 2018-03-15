let log = require('js-logging/js-logging.umd.js').colorConsole({level:'debug'});
if (process.env.NODE_ENV == 'production') log.setLevel('error');

var util = require('util');
var bleno = require('bleno');
var wpa_cli = require('wireless-tools/wpa_cli');


var BlenoCharacteristic = bleno.Characteristic;
var chUUID = '97859d25-749c-479e-be85-1b7880550113';
var deleteNetworks = function() {
	deleteNetworks.super_.call(this, {
		uuid: chUUID,
		properties: ['read', 'write'],
		value: null
	});
this._value = new Buffer(0);
	this._wifilist = new Buffer(0);
	this._updateValueCallback = null;
};



deleteNetworks.prototype.onReadRequest = function(offset, callback) {
  
    var result = deleteNetworks.RESULT_SUCCESS;
    var exec = require('child_process').execSync;
    var cmd = 'nodejs echo.js  > /etc/wpa_supplicant/wpa_supplicant.conf && sudo ifdown wlan0 && sudo ifup wlan0';
         var options = {
            encoding: 'utf8'
     };
     exec(cmd, options); 

callback(result);
   
   
};

util.inherits(deleteNetworks, BlenoCharacteristic);
module.exports = deleteNetworks;