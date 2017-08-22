var stdin = process.openStdin();
var Discordie = require("discordie");
var colors = require("colors/safe");
var CryptoJS = require("crypto-js");
colors.setTheme({
    info: "cyan",
    ok: "green",
    warn: "yellow",
    debug: "blue",
    error: "red"
});
var client = new Discordie();
var yourid = "Your id goes here";
var token = "Token goes here";
var personid = "Id of your friend goes here";
var encryptionKey = "Encryption key (the person that you will use this with has to use the same encryption key as you)";
console.log("Connecting...");
client.connect({ //connect
    token: token
});
client.Dispatcher.on("GATEWAY_READY", a => {
    console.log("Connected as: " + client.User.username);
});
try {
    client.Dispatcher.on("MESSAGE_CREATE", e => {
        if (e.message.author.id == personid || e.message.author.id == yourid) {
            console.log(colors.green(e.message.author.username) + colors.yellow(": ") + colors.cyan(e.message.content));

            if (e.message.content.startsWith("discCrypto: ")) {
                var bytes = CryptoJS.AES.decrypt(e.message.content.slice(12).toString(), encryptionKey);
                var plaintext = bytes.toString(CryptoJS.enc.Utf8);
                console.log(colors.green(e.message.author.username) + colors.yellow(": ") + colors.cyan(plaintext) + colors.magenta(" (DECRYPTED)"));
            }
        }
    });

    //start a user input listner
    stdin.addListener("data", function (d) {
        var ididid = client.Users.find(fn => fn.id == personid).openDM().then(function (ledm) {
            ledm.sendMessage("discCrypto: " + CryptoJS.AES.encrypt(d.toString().trim(), encryptionKey))
        });
    });

} catch (err) {
    console.log("Error: \n" + err);
}
