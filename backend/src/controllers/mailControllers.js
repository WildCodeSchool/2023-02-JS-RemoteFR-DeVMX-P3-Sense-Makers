const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_MAIL;
const payload = { sub: "okkkk" }; // recup data from user where email = email saisie sur la demande
const token = jwt.sign(payload, secret, { expiresIn: "1h" });

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
const accessToken = oAuth2Client.getAccessToken();
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "Oauth2",
    user: process.env.AUTH_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accesssToken: accessToken,
  },
});

const sendMailById = (req) => {
  transport?.sendMail(
    {
      from: "Admin <nlopes93600@gmail.com>",
      to: `${req.body.email}`, // put the email of user depuis le payload//
      subject: "Reinitialisation du mot de passe",
      html: `Veuillez cliquer sur le lien si vous souhaitez mettre à jour votre mot de passe, si vous n'êtes pas à l'origine de la demande contactez dans les plus brefs délais votre administrateur.<a href="http://localhost:3000/resetpassword?token=${token}&id=${req.body.id}">Cliquez ici</a>`,
    },
    (err, info) => {
      if (err) console.error(err);
      else console.warn(info);
    }
  );
};
const sendMailResetById = (req) => {
  transport?.sendMail(
    {
      from: "Admin <nlopes93600@gmail.com>",
      to: `${req.user.email}`, // put the email of user depuis le payload//
      subject: "Reinitialisation du mot de passe",
      html: `Veuillez cliquer sur le lien si vous souhaitez mettre à jour votre mot de passe, si vous n'êtes pas à l'origine de la demande contactez dans les plus brefs délais votre administrateur.<a href="http://localhost:3000/resetpassword?token=${token}&id=${req.user.id}">Cliquez ici</a>`,
    },
    (err, info) => {
      if (err) console.error(err);
      else console.warn(info);
    }
  );
};
module.exports = {
  sendMailById,
  sendMailResetById,
};
