const nodemailer = require('nodemailer');
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // Create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        // Define the correct route mapping
        const route = emailType === "VERIFY" ? "verifyemail" : "resetpassword";

        // Update user with the token
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        // Create a transporter
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "ea21470f0aadb6",
                pass: "4bc832aa4ca19e",
            },
        });

        // Define email content with correct route
        const mailOptions = {
            from: "rohitgoyal4220@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="http://localhost:3000/${route}?token=${hashedToken}">here</a> 
            to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
            or copy and paste the link below in your browser: <br> 
            http://localhost:3000/${route}?token=${hashedToken}</p>`,
        };

        // Send the email
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error("Error sending email");
    }
};
