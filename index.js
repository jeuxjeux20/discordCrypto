var stdin = process.openStdin();
var Discordie = require("discordie");
var colors = require("colors/safe");
var CryptoJS = require("crypto-js");
var fs = require('fs')
var ini = require('ini')

var config;

colors.setTheme({
    info: "cyan",
    ok: "green",
    warn: "yellow",
    debug: "blue",
    error: "red"
});
var client = new Discordie();
console.log("      _ _                       _  _____                  _        ");
console.log("     | (_)                     | |/ ____|                | |       ");
console.log("   __| |_ ___  ___ ___  _ __ __| | |     _ __ _   _ _ __ | |_ ___  ");
console.log("  / _` | / __|/ __/ _ \| '__/ _` | |    | '__| | | | '_ \| __/ _ \ ");
console.log(" | (_| | \__ \ (_| (_) | | | (_| | |____| |  | |_| | |_) | || (_) |");
console.log("  \__,_|_|___/\___\___/|_|  \__,_|\_____|_|   \__, | .__/ \__\___/ ");
console.log("                                               __/ | |             ");
console.log("                                              |___/|_|             ");
console.log("                     by FireC and cth103                           ");
var yourid = "Your id goes here";
var token = "Token goes here";
var personid = "Id of your friend goes here";
var encryptionKey = "Encryption key (the person that you will use this with has to use the same encryption key as you)";
console.log("Getting settings.ini");
config = ini.parse(fs.readFileSync('./settings.ini', 'utf-8'))
encryptionKey = config.crypt.key;
personid = config.client.destid;
token = config.client.token;
yourid = config.client.myid;
console.log("key: "+encryptionKey);
console.log("person id: "+personid);
console.log("your id: "+yourid);
console.log("\nConnecting...");
client.connect({ //connect
    token: token
});
client.Dispatcher.on("GATEWAY_READY", a => {
    console.log("Hello, " + colors.green(client.User.username) + " and welcome to the world of "+colors.red("CRYPTED MESSAGING!"));
    console.log("Taking you to the other line");
});
try {
    client.Dispatcher.on("MESSAGE_CREATE", e => {
        if (e.message.author.id == personid || e.message.author.id == yourid) {
            console.log(colors.green("<"+e.message.author.username+"> ")+ colors.cyan(e.message.content));

            if (e.message.content.startsWith("discCrypto: ")) {
                var bytes = CryptoJS.AES.decrypt(e.message.content.slice(12).toString(), encryptionKey);
                var plaintext = bytes.toString(CryptoJS.enc.Utf8);
                console.log(colors.green( "<") + colors.green(e.message.author.username) + colors.green("> ") + colors.cyan(plaintext) +colors.magenta(" (DECRYPTED)"));
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
