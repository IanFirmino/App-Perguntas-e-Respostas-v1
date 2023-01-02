const nodemailer = require('nodemailer');
require('dotenv').config()

const MAIL_SETTINGS = {
    service: 'gmail',
    host: 'SMTP.gmail.com',
    port: 465,
    auth:{
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD
    }
}
const transporter = nodemailer.createTransport(MAIL_SETTINGS);

async function sendLoginMail(params){

    try{
        let info = await transporter.sendMail({

            from: MAIL_SETTINGS.auth.user,
            to: params.to, 
            subject: 'Email de login',
            html: `<div class="container" style= "max-width: 90%; margin: auto; padding-top: 20px">
            <h2 text-align:center> User Validation. </h2>
            <p style="font-size: 20px; margin-bottom: 30px;"> Utilize o código abaixo para efetuar o Login.</p>
            <h1 style="font-size: 20px; letter-spacing: 2px; text-align:center;"> ${params.token}</h1>
            </div>`
        });

        return info;

    }catch(error){
        error;
    }

}

module.exports = {sendLoginMail};


