const nodemailer = require('nodemailer');


exports.transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
        user: 'yoganoreply70@gmail.com',
        pass: 'iqga bxnz uxbm qgek', // יש להכניס את הסיסמה שלך
    },
});


exports.generatePassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
};