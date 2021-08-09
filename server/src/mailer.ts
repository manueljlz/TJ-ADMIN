import nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'manueljl098@gmail.com', // generated ethereal user
      pass:'bcbqefgzdjtqrcyl', // generated ethereal password
    },
  });