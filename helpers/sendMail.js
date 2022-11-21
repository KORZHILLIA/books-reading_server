const sgMail = require("@sendgrid/mail");
const { SENDGRID_KEY } = process.env;

const from = "kiev_drum2006@ukr.net";
sgMail.setApiKey(SENDGRID_KEY);

const sendMail = async (data) => {
  try {
    const mail = { ...data, from };
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;
