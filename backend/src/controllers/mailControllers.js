const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");

const REFRESH_TOKEN =
  "1//04Z5vxk0ZqZ7DCgYIARAAGAQSNwF-L9IrmwOZ41pl5Mt7oIAwNIjQVqTmW3JHfiZB5F_HSVDqJ7EZVPW-8-L1iWopjUnkZbnhTV0";

const secret = process.env.SECRET_MAIL;
const payload = { sub: "okkkk" }; // recup data from user where email = email saisie sur la demande
const token = jwt.sign(payload, secret, { expiresIn: "1h" });

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const accessToken = oAuth2Client.getAccessToken();
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "Oauth2",
    user: process.env.AUTH_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accesssToken: accessToken,
  },
});

const sendMailById = (req, res) => {
  transport?.sendMail(
    {
      from: "Admin <nlopes93600@gmail.com>",
      to: `${req.body.email}`, // put the email of user depuis le payload//
      subject: "Reinitialisation du mot de passe",
      html: `Veuillez cliquer sur le lien si vous souhaitez mettre à jour votre mot de passe, si vous n'êtes pas à l'origine de la demande contactez dans les plus brefs délais votre administrateur.<a href="http://localhost:3000/resetpassword?token=${token}&id=${req.body.id}">Cliquez ici</a>.
      Vous trouverez ci joint un tutoriel en PDF pour vous accompagnez dans vos premiers pas.`,
      attachments: [
        {
          filename: "test.pdf",
          path: "/Users/nicolaslopes/Desktop/2023-02-JS-RemoteFR-DeVMX-P3-Sense-Makers/backend/public/uploads/test.pdf",
          contentType: "application/pdf",
        },
      ],
    },
    (err) => {
      if (err) console.error(err);
      else res.sendStatus(200);
    }
  );
};
const sendMailResetById = (req, res) => {
  transport?.sendMail(
    {
      from: "Admin <nlopes93600@gmail.com>",
      to: `${req.user.email}`, // put the email of user depuis le payload//
      subject: "Reinitialisation du mot de passe",
      html: `Veuillez cliquer sur le lien si vous souhaitez mettre à jour votre mot de passe, si vous n'êtes pas à l'origine de la demande contactez dans les plus brefs délais votre administrateur.<a href="http://localhost:3000/resetpassword?token=${token}&id=${req.user.id}">Cliquez ici</a>`,
    },
    (err) => {
      if (err) console.error(err);
      else res.sendStatus(200);
    }
  );
};
module.exports = {
  sendMailById,
  sendMailResetById,
};
