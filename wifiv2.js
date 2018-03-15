let log = require('js-logging/js-logging.umd.js').colorConsole({level:'debug'});
if (process.env.NODE_ENV == 'production') log.setLevel('error');

var util = require('util');
var bleno = require('bleno');
var wpa_cli = require('wireless-tools/wpa_cli');
var wpa_supplicant = require('wireless-tools/wpa_supplicant');
var iwlist = require('wireless-tools/iwlist');
var ifconfig = require('wireless-tools/ifconfig');
var BlenoCharacteristic = bleno.Characteristic;
var chUUID = '97859d25-749c-479e-be85-1b7880550011';
var wifidevice = "wlan0";

var wifiv2 = function() {
	wifiv2.super_.call(this, {
		uuid: chUUID,
		properties: ['read', 'write'],
		value: null
	});

	this._value = new Buffer(0);
	this._wifilist = new Buffer(0);
	this._updateValueCallback = null;
};

//get wifi networks from scan
wifiv2.prototype.onReadRequest = function(offset, callback) {
	var result = this.RESULT_SUCCESS;
	var wifidata = new Buffer(0);
	var wifidata_array = new Array();
	var wifissids = new Array();
	var p2 = new Promise(function (resolve, reject) {
        iwlist.scan('wlan0', function(err, networks) {
        var wifidatensatz = new Array();
        this.wifidatensatz = [];
        if(networks != null){
           if(networks.length > 6){
              for (var i = 0; i < 6; i++) {
                      this.wifidatensatz.push(networks[i].ssid+"|"+networks[i].security+"|"+networks[i].quality);
              }
           }else{
              for (var i = 0; i < networks.length; i++) {
                   this.wifidatensatz.push(networks[i].ssid+"|"+networks[i].security+"|"+networks[i].quality);
              }
          }
          var wifidata = new Buffer(this.wifidatensatz.join("\n"));
          this._wifilist = new Buffer(wifidata);
          console.log('WifiCharacteristic - onReadRequest1: value = ' + this._wifilist);
          resolve(this._wifilist);
        } 
      });
});
p2.then(function (value) {
    if (offset > value.length) {
      result = this.RESULT_INVALID_OFFSET;
      value = null;
    } else {
      value = value.slice(offset);
    }
    callback(result, value);
  });
};

//connect to selected network
wifiv2.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {
	this._value = data;
	var datachunks = data.toString().split(",");
	var ssid = datachunks[0];
	var pass = datachunks[1];
	var options = {
		interface: wifidevice,
		ssid: ssid,
		passphrase: pass,
		driver: 'wext'
	};
    
    //set open network
    if(options.passphrase == ""){
	    wpa_supplicant.add2(options, function (err) {
            var exec = require('child_process').execSync;
            var cmd = "sudo ifdown wlan0 && sudo ifup wlan0";
            var options = {
                encoding: 'utf8'
            };
            var result = wifiv2.RESULT_SUCCESS;
            callback(result);
            exec(cmd, options);              
        });
	}else{
	   wpa_supplicant.add(options, function (err) {
           var exec = require('child_process').execSync;
           var cmd = "sudo ifdown wlan0 && sudo ifup wlan0";
           var options = {
               encoding: 'utf8'
           };
           var result = wifiv2.RESULT_SUCCESS;
           callback(result);
           exec(cmd, options);              
      });
    }
};

util.inherits(wifiv2, BlenoCharacteristic);
module.exports = wifiv2;