const nodemailer = require('nodemailer');
exports.sendEMailFunction = (url, email) => {
    var info1 = {};
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD
        },
    });
    const mailOptions = {
        from: process.env.USERNAME,
        to: email,
        subject: 'Fundoo-app password reset link ',
        text: 'Please go through the e-mail verification link provided in this mail:\n\n' + url
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("is it is invalid");
            console.log("error on sending mail--", err)
        } else
            console.log('result of sending mail-- ', info);
        info1 = info;
    });
    return info1;
}