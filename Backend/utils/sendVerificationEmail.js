import nodemailer from 'nodemailer';


export const sendVerificationEmail = async(toEmail, verificationToken) => {
const transporter = nodemailer.createTransport({
   host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "90ee27001@smtp-brevo.com", // your Brevo email
      pass: "ZYrwpEaLd72zCSb0"       // your Brevo SMTP password
    }
  });


    const mailOptions = {
  from: '"FocusTrail" <mukeshgoyal573@gmail.com>',
    to: toEmail,
    subject: "Welcome to FocusTrail - Verification Code",
    html: `
      <h2>Welcome to FocusTrail</h2>
      <p>Your verification code is:</p>
      <h3>${verificationToken}</h3>
      <p>It will expire in 24 hours.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log("Verification email sent to:", toEmail); // ✅ helpful for debugging

};
