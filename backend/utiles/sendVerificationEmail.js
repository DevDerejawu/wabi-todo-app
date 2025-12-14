//I implemented email functionality because I wanted to send a verification email when users sign up. However, sending emails securely requires handling several security-related configurations, such as proper credential management, app passwords, and environment variables. Since this project is currently for learning purposes, I decided to temporarily leave the email feature aside and focus on the core functionality. I plan to revisit and implement it properly with full security measures later.
import nodemailer from "nodemailer";
async function sendVerificationEmail(otp, email) {
  try{
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    //below email is not real just for a placeholder
    auth: {
      user: process.env?.EMAIL_USER || "derej@gmail.com",
      pass: process.env?.EMAIL_PASSWORD || "flviifbvt", 
    },
  });

  const emailOptions = {
    from: "Derejawu Todo App derejawubaye09@gmail.com",
    to: email,
    subject: "Verifying your email",
    html: `<p>Verify your email, here is your OTP code: <strong>${otp}</strong></p>`,
  };

  await transporter.sendMail(emailOptions);
}catch(err){
  console.error("mail err", err)
  throw new Error("Failed to send email.")
}
}

export { sendVerificationEmail };
