let log = require('js-logging/js-logging.umd.js').colorConsole({level:'debug'});
if (process.env.NODE_ENV == 'production') log.setLevel('error');

var util = require('util');
var bleno = require('bleno');
var wpa_cli = require('wireless-tools/wpa_cli');


var BlenoCharacteristic = bleno.Characteristic;
var chUUID = '97859d25-749c-479e-be85-1b7880550115';
var reboot = function() {
	reboot.super_.call(this, {
		uuid: chUUID,
		properties: ['read', 'write'],
		value: null
	});
this._value = new Buffer(0);
	this.sendCode = new Buffer(0);
	this._updateValueCallback = null;
};



//write passcode to textfile passCode.txt
reboot.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {
	var mode = data.toString().trim();
	 var result = reboot.RESULT_SUCCESS;
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
    
    callback(result);
};



util.inherits(reboot, BlenoCharacteristic);
module.exports = reboot;