const nodemailer = require('nodemailer');
exports.sendEMailFunction = (url, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.username,
            pass: process.env.password
        },
    });
    const mailOptions = {
        from: process.env.username,
        to: email,
        subject: 'Fundoo-app password reset link ',
        text: 'Please go through the e-mail verifaction link provided in this mail:\n\n' + url
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("is it is invalid");
            console.log("error on sending mail--", err)
        } else
            console.log('result of sending mail-- ', info);
    });
}