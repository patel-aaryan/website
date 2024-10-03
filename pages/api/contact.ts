import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

const sendGridApiKey = process.env.SENDGRID_API_KEY;
if (!sendGridApiKey) throw new Error("SENDGRID_API_KEY is not defined");
sgMail.setApiKey(sendGridApiKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;

    const msg = {
      to: "a52patel@uwaterloo.ca",
      from: "aaryan.patel.website@gmail.com",
      subject: `New message from ${name} - ${subject}`,
      text: message,
      html: `<p>You have a new contact form submission</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>`,
    };

    try {
      await sgMail.send(msg);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error sending email", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
