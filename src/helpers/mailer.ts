import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import  User from "@/model/userModel";

export const sendEmail = async ({email, emailType, userId}) => {
    
    
    try {
        const hasedToken = await bcryptjs.hash((userId).toString(), 10);

        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hasedToken,
                verifyTokenExpiry: Date.now() + 3600000, // 1 hour
            })
        } else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hasedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
            })
        }
        

        const transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "30c5ca259909c7",
                    pass: "03eb97014970ff"
                }
            });

        const mailOptions = {
            from: 'pratikxyz@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
            <p>
                Click 
                <a href="${process.env.DOMAIN}/verifyemail?token=${hasedToken}">
                here
                </a> 
                to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
            </p>
            <p>
                Or you can copy this link and paste it into your browser:
                <br />
                ${process.env.DOMAIN}/verifyemail?token=${hasedToken}
            </p>
        `
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse
    } catch (error : any) {
        throw new Error(error.message)
    }
}