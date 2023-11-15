const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
service: 'outlook',
auth: {
  user: 'appetyzer@outlook.com',
  pass: 'groupproject!2345',
},
});

const sendReferralEmail = async ({ friendName, friendEmail }) => {

try {
    const emailOptions = {
        from: 'appetyzer@outlook.com',
        to: friendEmail,
        subject: 'Referral from Appetyzer',
        text: `Hi ${friendName},\n\nYou've been referred to Appetyzer. Check it out!\n\nBest regards,\nAppetyzer`,
      };
    
        const info = await transporter.sendMail(emailOptions);
        console.log('Referral email sent:', info);
        return info;
      } catch (error) {
        console.error('Error sending referral email:', error);
        throw error;
      }
    
};

module.exports = {
  sendReferralEmail,
};
