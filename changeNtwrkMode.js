let log = require('js-logging/js-logging.umd.js').colorConsole({level:'debug'});
if (process.env.NODE_ENV == 'production') log.setLevel('error');

var util = require('util');
var bleno = require('bleno');
var wpa_supplicant = require('wireless-tools/wpa_supplicant');
var fs = require('fs');

var BlenoCharacteristic = bleno.Characteristic;
var chUUID = '97859d25-749c-479e-be85-1b7880550114';
var changeNtwrkMode = function() {
	changeNtwrkMode.super_.call(this, {
		uuid: chUUID,
		properties: ['read', 'write'],
		value: null
	});
this._value = new Buffer(0);
	this._wifilist = new Buffer(0);
	this._updateValueCallback = null;
};







changeNtwrkMode.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {
	this._value = data;
	var mode = data.toString().trim();

	wpa_supplicant.switchMode(mode, function (err) {
           
            var result = changeNtwrkMode.RESULT_SUCCESS;
            console.log(result);
            callback(result);
                        
    });
	

};


changeNtwrkMode.prototype.onReadRequest = function(offset, callback) {
   var result = this.RESULT_SUCCESS;
   var wifidata = new Buffer(0);
   var p2 = new Promise(function (resolve, reject) {
       var test = "";
       
           
    
    fs.readFile("mode.txt", "utf8", function (error, data) {
    this.test = data.trim();
       var wifidata = new Buffer(this.test);
           this._wifilist = new Buffer(wifidata);
   resolve(this._wifilist);

    
           
       });
   });
   p2.then(function (value) {
      if (offset > value.length) {
          result = this.RESULT_INVALID_OFFSET;
          value = null;
      }else{
          value = value.slice(offset);
      }
      callback(result, value);
   });
};

util.inherits(changeNtwrkMode, BlenoCharacteristic);
module.exports = changeNtwrkMode;