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
console.log("All the data is sent to discord's servers, you're safe.");
console.log("Enter your id. (NOT USERNAME#0000) ")
stdin.addListener("data", function (d) {
       yourid = d.toString().trim();
});
console.log("Enter your token. ")
stdin.addListener("data", function (d) {
       token = d.toString().trim();
});
console.log("Enter the person's id. (NOT USERNAME#0000) ")
stdin.addListener("data", function (d) {
       personid = d.toString().trim();
});
console.log("Enter the encryption key (both persons uses the same encryption key) ")
stdin.addListener("data", function (d) {
       encryptionKey = d.toString().trim();
});
console.log("Connecting...");
client.connect({ //connect
    token: token
});
client.Dispatcher.on("GATEWAY_READY", a => {
    console.log("Hello, " + client.User.username + " to the world of CRYPTED MESSAGING!");
});
try {
    client.Dispatcher.on("MESSAGE_CREATE", e => {
        if (e.message.author.id == personid || e.message.author.id == yourid) {
            console.log(colors.green(e.message.author.username) + colors.yellow(": ") + colors.cyan(e.message.content));

            if (e.message.content.startsWith("discCrypto: ")) {
                var bytes = CryptoJS.AES.decrypt(e.message.content.slice(12).toString(), encryptionKey);
                var plaintext = bytes.toString(CryptoJS.enc.Utf8);
                console.log(colors.green( "<") + colors.green(e.message.author.username) + colors.green("> ") + colors.cyan(plaintext));
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
