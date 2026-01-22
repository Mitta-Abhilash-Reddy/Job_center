// Placeholder for transactional email integration (e.g., SES/SendGrid)
const sendEmail = async ({ to, subject, text }) => {
  console.log(`Email to ${to}: ${subject} - ${text}`);
};

module.exports = { sendEmail };


