const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    console.log("📩 Attempting to send email...");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Message:", text);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kidesakshi47@gmail.com", // Replace with your actual email
        pass: "ngjj iqch kyns galv", // Use a **Google App Password**, NOT your real password
      },
    });

    const mailOptions = {
      from: "kidesakshi47@gmail.com",
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);
    return { success: true };
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return { success: false, error };
  }
};

module.exports = sendEmail;
