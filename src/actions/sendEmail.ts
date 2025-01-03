"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

const formSchema = z.object({
  fullname: z.string().min(1).max(100),
  topic: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});

export async function sendEmail(formData: z.infer<typeof formSchema>) {
  const result = formSchema.safeParse(formData);

  if (!result.success) {
    return { success: false, message: "Invalid form data" };
  }

  const { fullname, topic, email, message } = result.data;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New message from ${fullname}`,
      text: `
        Name: ${fullname}
        Email: ${email}
        Topic: ${topic}
        Message: ${message}
      `,
      html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
    <h2 style="color: #4CAF50; text-align: center;">You've Got a New Message</h2>
    <hr style="border: none; border-top: 2px solid #4CAF50; margin: 20px 0;">
    <p style="font-size: 16px; margin-bottom: 10px;"><strong>From:</strong> ${fullname}</p>
    <p style="font-size: 16px; margin-bottom: 10px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #1a0dab; text-decoration: underline;">${email}</a></p>
    <p style="font-size: 16px; margin-bottom: 10px;"><strong>Topic:</strong> ${topic}</p>
    <p style="font-size: 16px; margin-bottom: 20px;"><strong>Message:</strong></p>
    <div style="padding: 15px; background-color: #fff; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0px 2px 5px rgba(0,0,0,0.1);">
      <p style="margin: 0; font-size: 16px; line-height: 1.6;">${message}</p>
    </div>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    <footer style="text-align: center; font-size: 14px; color: #777;">
      <p>Sent via your website contact form</p>
      <p>&copy; ${new Date().getFullYear()} Your Company Name</p>
    </footer>
  </div>
      `,
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, message: "Failed to send email" };
  }
}
