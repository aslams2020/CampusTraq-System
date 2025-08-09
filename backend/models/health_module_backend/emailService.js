const nodemailer = require("nodemailer");
require("dotenv").config(); // Ensure .env is loaded

// ✅ Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Send Email Function
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `"Health Notification" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log(`📩 Email sent to ${to}:`, info.response);
    return { success: true, response: info.response };
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error);
    return { success: false, error: error.message };
  }
};

// ✅ Test Email Function (For Debugging)
const testEmail = async () => {
  return await sendEmail("your-email@gmail.com", "Test Email", "This is a test email.");
};

module.exports = { sendEmail, testEmail };
