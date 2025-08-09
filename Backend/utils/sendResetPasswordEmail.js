import nodemailer from "nodemailer";

export const sendResetPasswordEmail = async (toEmail, resetLink) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
      auth: {
      user: "90ee27001@smtp-brevo.com", // your Brevo email
      pass: "ZYrwpEaLd72zCSb0"       // your Brevo SMTP password
    },
  });

  const mailOptions = {
    from: '"FocusTrail" <mukeshgoyal573@gmail.com>',
    to: toEmail,
    subject: "🔐 Reset Your Password - FocusTrail",
    html: `
      <h2>Reset Your Password</h2>
      <p>We received a request to reset your password.</p>
      <p>Click the button below to reset it:</p>
      <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; border-radius: 6px; text-decoration: none; font-weight: bold;">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
      <br/>
      <p>This link will expire in 1 hour.</p>
      <p>– FocusTrail Support Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log("Reset password email sent to:", toEmail);
};
