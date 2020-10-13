const nodemailer = require('nodemailer')

const mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sukawatd@gmail.com',
      pass: 'S@tctrl5'
    }
  })

const mailOptions = {
from: 'sukawatd@gmail.com',
to: 'goolakai@gmail.com, sukawatd@thaicom.net',
subject: 'Sending Email via Node.js',
text: 'That was easy!',
attachments:  [{
    filename: 'invoice.pdf',
    path: './invoice.pdf'
    }]
}
   
mail.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })