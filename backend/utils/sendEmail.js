const nodemailer = require("nodemailer");

exports.sendMails = async (options) => {
  // console.log(options);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_SENDER_EMAIL,
      pass: process.env.SMTP_SENDER_PASSWORD,
    },
    logger: true,
  });
  await transport.sendMail({
    from: process.env.SMTP_SENDER_EMAIL,
    to: options.email,
    subject: options.subject,
    html: options.message,
  });
};
