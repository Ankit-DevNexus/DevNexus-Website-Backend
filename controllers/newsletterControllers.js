import nodemailer from "nodemailer";
import NewsletterModel from "../model/newsLetterModel.js";

export const subscribeToNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    // Check existing email
    const existingEmail = await NewsletterModel.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    // Save email
    const newSubscription = new NewsletterModel({ email });

    await newSubscription.save();

    // SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send mail
    await transporter.sendMail({
      from: `"DevNexus Solutions" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to DevNexus Newsletter",
      html: `
        <h2>Welcome to Our Newsletter 🎉</h2>
        <p>Thank you for subscribing to DevNexus Solutions.</p>
        <p>You will now receive updates, news, and offers from us.</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Subscribed successfully!",
    });
  } catch (error) {
    console.log("NEWSLETTER ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to subscribe",
    });
  }
};