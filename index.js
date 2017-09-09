'use strict';
var stdin = process.openStdin();
var Discordie = require("discordie");
var colors = require("colors/safe");
var CryptoJS = require("crypto-js");
var fs = require('fs')
var ini = require('ini')
//This solution is terrible but whatever.
function sleep(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}
var config;

colors.setTheme({
    info: "cyan",
    ok: "green",
    warn: "yellow",
    debug: "blue",
    error: "red"
});
var client = new Discordie();

console.log("Discord Crypto");
console.log("by FireC and cth103");
console.log("Hi, sorry for interrupting but\n");
console.log("If you like this project and would like to donate\n Here, " + colors.yellow(
    "Bitcoin adress: 3BRRcuocUKpMZFVvbWRWWwzopqhUDh7vjL\nOr Dogecoin adress: ADE9yEvvvk4XaJ85NBQZtKFykkA4nPQdAn"));
console.log("Even a penny could help!");
console.log("Anyways, starting the program, sorry for interrupting.");
//fuck man fuck
sleep(2000);
console.log('\x1Bc'); //oh man
console.log("Discord Crypto");
console.log("by FireC and cth103");
var yourid = "Your id goes here";
var token = "Token goes here";
var personid = "Id of your friend goes here";
var encryptionKey = "Encryption key (the person that you will use this with has to use the same encryption key as you)";
console.log("\nGetting settings.ini");
try {
    config = ini.parse(fs.readFileSync('./settings.ini', 'utf-8'))
    encryptionKey = config.crypt.key;
    personid = config.client.destid;
    token = config.client.token;
    yourid = config.client.myid;
    console.log("Connecting...");
    client.connect({ //connect
        token: token
    });
    client.Dispatcher.on("GATEWAY_READY", a => {
        console.log("Hello, " + client.User.username + " to the world of "+colors.red("CRYPTED MESSAGING!"));
        console.log("Taking you to the other line");
    });
    client.Dispatcher.on("MESSAGE_CREATE", e => {
        
        if (e.message.author.id == personid || e.message.author.id == yourid) {
            if (e.message.content.startsWith("discCrypto: ")) {
                
                var bytes = CryptoJS.AES.decrypt(e.message.content.slice(12).toString(), encryptionKey);
                var plaintext = bytes.toString(CryptoJS.enc.Utf8);
                console.log(colors.green("<") + colors.green(e.message.author.username) + colors.green("> ") + colors.cyan(plaintext));   
                } else {
                console.log(colors.green(e.message.author.username) + colors.yellow(": ") + colors.cyan(e.message.content));
            }
        }
    });
    stdin.addListener("data", function (d) {

        var ididid = client.Users.find(fn => fn.id == personid).openDM().then(function (ledm) {
            ledm.sendMessage("discCrypto: " + CryptoJS.AES.encrypt(d.toString().trim(), encryptionKey))
        });
    });

} catch (err) {
    console.log(color.red("Error: \n" + err));
}
