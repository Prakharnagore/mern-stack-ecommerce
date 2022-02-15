const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  //------------------------

  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL, //simple mail transport protocol
      pass: process.env.SMTP_PASSWORD,
    },
  });
  //--------------------------

  await transporter.sendMail({
    from: process.env.SMTP_MAIL, // sender address
    to: options.email, // list of receivers
    subject: `${options.subject} ✔`, // Subject line
    text: options.message, // plain text body
  });
};
module.exports = sendEmail;
