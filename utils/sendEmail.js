const nodemailer = require('nodemailer');

const {
    EMAIL_HOST: HOST,
    EMAIL_PORT: PORT,
    EMAIL_USERNAME: USERNAME,
    EMAIL_PASSWORD: PASSWORD,
    EMAIL_FROM: FROM,
    EMAIL_NAME: NAME,
} = process.env;

// create Transporter
const transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    auth: {
        user: USERNAME,
        pass: PASSWORD,
    },
});

const sendEmail = async (options = { email, subject, message }) => {
    // set mail options
    const mailOptions = {
        from: `${NAME} <${FROM}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
