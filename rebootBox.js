let log = require('js-logging/js-logging.umd.js').colorConsole({level:'debug'});
if (process.env.NODE_ENV == 'production') log.setLevel('error');

var util = require('util');
var bleno = require('bleno');
var wpa_supplicant = require('wireless-tools/wpa_supplicant');


var BlenoCharacteristic = bleno.Characteristic;
var chUUID = '97859d25-749c-479e-be85-1b7880550115';
var rebootBox = function() {
	rebootBox.super_.call(this, {
		uuid: chUUID,
		properties: ['read', 'write'],
		value: null
	});
this._value = new Buffer(0);
	this._wifilist = new Buffer(0);
	this._updateValueCallback = null;
};




//reboot or shutdown box
rebootBox.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {
	this._value = data;
	var mode = data.toString().trim();
	var cmd = '';
	var exec = require('child_process').execSync;
    
    var options = {
            encoding: 'utf8'
     };
     
     if(mode == "reboot"){
     
       cmd = 'sudo reboot';
     }else if(mode == "shutdown"){
     
        cmd = 'sudo shutdown -r now';
     }
     exec(cmd, options); 
     var result = rebootBox.RESULT_SUCCESS;
    callback(result);
	
	

};