import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (toEmail, name) => {
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
    subject: "🎉 Welcome to FocusTrail!",
    html: `
      <h1>Welcome aboard, ${name}!</h1>
      <p>We're thrilled to have you join <strong>FocusTrail</strong> — your personal productivity and wellness companion.</p>
      <hr/>
      <p>Start exploring your dashboard and take control of your focus, planning, and emotional wellness today!</p>
      <p>If you have any questions, feel free to reply to this email.</p>
      <br/>
      <p>— The FocusTrail Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log("Welcome email sent to:", toEmail);
};
