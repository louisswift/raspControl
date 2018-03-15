let log = require('js-logging/js-logging.umd.js').colorConsole({level:'debug'});
if (process.env.NODE_ENV == 'production') log.setLevel('error');

var util = require('util');
var bleno = require('bleno');
var wpa_cli = require('wireless-tools/wpa_cli');
var fs = require("fs");
var path = "passCode.txt";


var BlenoCharacteristic = bleno.Characteristic;
var chUUID = '97859d25-749c-479e-be85-1b7880550112';
var checkAdmin = function() {
	checkAdmin.super_.call(this, {
		uuid: chUUID,
		properties: ['read', 'write'],
		value: null
	});
this._value = new Buffer(0);
	this.sendCode = new Buffer(0);
	this._updateValueCallback = null;
};


//read passcode from passCode.txt
checkAdmin.prototype.onReadRequest = function(offset, callback) {
   var result = this.RESULT_SUCCESS;
   var dataC = new Buffer(0);
   var p2 = new Promise(function (resolve, reject) {
       var code = "";
       fs.readFile('passCode.txt', 'utf8', function(err, contents) {
          if(contents != ""){
             this.code = contents;
          }else{
             this.code = "no";
          }
          var dataC = new Buffer(this.code);
          this.sendCode = new Buffer(dataC);
          console.log('WifiCharacteristic - onReadRequest1: value = ' + this.sendCode);
          resolve(this.sendCode);
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

//write passcode to textfile passCode.txt
checkAdmin.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {
	this._value = data;
	var datachunks = data.toString();
    var result = checkAdmin.RESULT_SUCCESS;
    callback(result);
    fs.writeFile("passCode.txt", datachunks, function(err){
       if (err) throw err;
           console.log("success");
    });          
};



util.inherits(checkAdmin, BlenoCharacteristic);
module.exports = checkAdmin;
