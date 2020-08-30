var nodemailer = require("nodemailer");
var CONFIG = require("./config.json");

var fs = require("fs");

var script;

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

fs.readFile("beeMovie.txt", "utf8")
  .then((data) => {
    var script = data.split();
  })
  .catch((err) => {
    console.log("err");
  });
/*
function sendText(word) {
    mailOptions.text = word;
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        i++;
      }
    });
  }
  */
