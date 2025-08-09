import nodemailer from "nodemailer";

export const ResetSuccessMail = async (toEmail, message) => {
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
    subject: "✅ Password Reset Successfully - FocusTrail",
    html: `
      <h2>Password Changed Successfully</h2>
      <p>${message}</p>
      <p>If you didn't request this change, please contact our support immediately.</p>
      <br/>
      <p>— FocusTrail Security Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log("Reset success email sent to:", toEmail);
};
