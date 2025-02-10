import nodemailer from 'nodemailer';

const sendMail = async(req, res) => {

    const { name, email, message } = req.body;

    // Nodemailer setup
    let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    // debug: true, // Add this to enable debug logs
    });

    // transporter.verify((error, success) => {
    //   if (error) {
    //     console.log('Nodemailer verification failed:', error);
    //   } else {
    //     console.log('Server is ready to send messages');
    //   }
    // });


    let mailOptions = {
    from: email, // Email of the sender (from form)
    to: process.env.RECEIVER_EMAIL, // Receiver email address
    subject: `Contact Form Message from ${name}`,
    text: message,
    html: `<p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br>${message}</p>`,
    };

    try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({message: 'Message sent successfully!'});
    } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending message');
    }
}

export { sendMail }