var nodemailer = require("nodemailer");
var CONFIG = require("./config.json");
var fs = require("fs");
var script;
var canContinue = true;

var transporter = nodemailer.createTransport({
  service: CONFIG.service,
  auth: {
    user: CONFIG.user,
    pass: CONFIG.password,
  },
});

var mailOptions = {
  from: CONFIG.user, // Same as user
  to: CONFIG.receiver, // Need to look this up. Go to https://www.freecarrierlookup.com/. Use SMS Gateway Address
};

fs.readFile("beeMovie.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return [];
  }
  script = data
    .split(/\s+/)
    .reverse()
    .filter((word) => word.search(/^[a-z0-9]+$/i) != -1);
});

sendText = () => {
  if (canContinue) {
    canContinue = false;
    var word = script.pop();
    mailOptions.text = word;
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        script.push(word);
        canContinue = true;
      } else {
        console.log("Email sent: " + info.response);
        canContinue = true;

        if (script.length == 0) {
          clearInterval(interval);
        }
      }
    });
  }
};

var interval = setInterval(sendText, 3500);
