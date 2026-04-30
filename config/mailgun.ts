import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgunApiKey = process.env.MAILGUN_API_KEY;
if (!mailgunApiKey) throw new Error("MAILGUN_API_KEY is not set");

const mailgun = new Mailgun(formData);
export const mg = mailgun.client({ username: "api", key: mailgunApiKey });
