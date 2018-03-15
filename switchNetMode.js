var fs = require('fs');


// set box to ad hoc mode
function setAdhoc(){
console.log("set adhoc");
writeFile("adhoc","mode.txt");
writeFile("source-directory /etc/network/interfaces.d\n"+"\nauto lo"+"\niface lo inet loopback"+"\niface eth0 inet dhcp"+"\nauto wlan0"+"\niface wlan0 inet static"+"\naddress 192.168.1.1"+"\nnetmask 255.255.255.0"+"\nwireless-channel 1"+"\nwireless-essid "+process.argv[2]+"\nwireless-mode ad-hoc","/etc/network/interfaces");
}

//set box to wifi mode
function setWifi(){
writeFile("wifi","mode.txt");
writeFile("source-directory /etc/network/interfaces.d\n"+"\nauto lo"+"\niface lo inet loopback"+"\niface eth0 inet manual"+"\nallow-hotplug wlan0"+"\niface wlan0 inet manual"+"\nwpa-conf /etc/wpa_supplicant/wpa_supplicant.conf"+"\nallow-hotplug wlan1"+"\niface wlan1 inet manual"+"\nwpa-conf /etc/wpa_supplicant/wpa_supplicant.conf","/etc/network/interfaces");
}


function writeFile(value,file){
fs.writeFile(file, value, function (err) {
    if (err) 
        return console.log(err);
   
 });
}


//read mode textfile and set mode
fs.readFile("mode.txt", "utf8", function (error, data) {

   var mode = data.trim();
  if(mode == "adhoc"){
     setWifi();
  }else if(mode == "wifi"){
     setAdhoc();
  }

});
