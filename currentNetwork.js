let log = require('js-logging/js-logging.umd.js').colorConsole({level:'debug'});
if (process.env.NODE_ENV == 'production') log.setLevel('error');

var util = require('util');
var bleno = require('bleno');
var wpa_cli = require('wireless-tools/wpa_cli');
var fs = require('fs');
var os = require('os');
var ifconfig = require('wireless-tools/ifconfig');
var BlenoCharacteristic = bleno.Characteristic;
var chUUID = '97859d25-749c-479e-be85-1b7880550111';
var currentNetwork = function() {
	currentNetwork.super_.call(this, {
		uuid: chUUID,
		properties: ['read', 'write'],
		value: null
	});
this._value = new Buffer(0);
	this._wifilist = new Buffer(0);
	this._updateValueCallback = null;
};



currentNetwork.prototype.onReadRequest = function(offset, callback) {


var ip = "";


var exec = require('child_process').execSync;
var cmd = "ip addr show eth0 | grep "+'"\inet\\b\"'+" | awk '{print $2}' | cut -d/ -f1";
var options = {
                encoding: 'utf8'
            };
           
var c_e = exec(cmd, options); 
         

if(c_e.trim() == ""){
this.ip = "not connected";
}else{
  this.ip = c_e.trim();
  console.log(this.ip);
}
  

   var result = this.RESULT_SUCCESS;
   var wifidata = new Buffer(0);
   var p2 = new Promise(function (resolve, reject) {
       var test = "";
       var network = "";
       wpa_cli.status('wlan0', function(err, status) {
        fs.readFile("mode.txt", "utf8", function (error, data) {
    this.test = data.trim();
      if(this.test == "wifi"){
      

    if(status == null){
   
    
              this.network = "no network connected";
           }else{
           var cmd = "ip addr show wlan0 | grep "+'"\inet\\b\"'+" | awk '{print $2}' | cut -d/ -f1";
var options = {
                encoding: 'utf8'
            };
           
var c_w = exec(cmd, options); 
         

      



           this.network = status.ssid+"|"+c_w.trim()+"|"+this.ip;
              
           }
           var wifidata = new Buffer(this.network);
           this._wifilist = new Buffer(wifidata);
           console.log('WifiCharacteristic - onReadRequest1: value = ' + this._wifilist);
           resolve(this._wifilist);
       }else if(this.test == "adhoc"){
           this.network = "adhoc|192.168.1.1"+"|"+this.ip;
           var wifidata = new Buffer(this.network);
           this._wifilist = new Buffer(wifidata);
           console.log('WifiCharacteristic - onReadRequest1: value = ' + this._wifilist);
           resolve(this._wifilist);
       
       }
       });
    
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

util.inherits(currentNetwork, BlenoCharacteristic);
module.exports = currentNetwork;