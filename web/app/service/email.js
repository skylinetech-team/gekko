/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
const nodemailer = require('nodemailer');

// send mail with defined transport object
exports.sendMail = function (mailOptions) {
  // setup e-mail data with unicode symbols
  const transporter = nodemailer.createTransport({
    host: 'smtp.exmail.qq.com',
    port: 465,
    secureConnection: true,
    secure: true,
    auth: {
      user: 'admin@youthdorm.cn',
      pass: 'Pwcwelcome1'
    }
  });
  const staticMailOptions = {
    from: 'admin@youthdorm.cn',
    to: '781700868@qq.com',
    subject: 'Sky Line Technology Team Verify Code',
    text: 'your verify code is 6895',
    // html: '<b>Hello world ?</b>'
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(Object.assign(staticMailOptions, mailOptions), (error, info) => {
      if (error) {
        resolve(500);
      }
      resolve(200);
    });
  });
};

