import { Resend } from "resend";

import welcomeEmailTemplate from "./welcomeEmailTemplate.js";

const resendClient = new Resend(process.env.RESEND_API_KEY);

const sendWelcomeEmail = async (email, name) => {
    if (!email || !name) {
        return { success: false, error: "Missing email or name" };
    }

    try {
        const result = await resendClient.emails.send({
            from: `${process.env.EMAIL_FROM_NAME}  <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: `Welcome to ${process.env.BRAND_NAME}`,
            html: welcomeEmailTemplate(name, email),
        });

        const { data, error } = result;

        if (error) {
            console.error("\nError sending welcome email:", error);
            return { success: false, error };
        }

        console.log("\nWelcome Email sent successfully", data);
        return { success: true, data };
    } catch (error) {
        console.error("\nException while sending welcome email:", error);
        return { success: false, error: error };
    }
};
export default sendWelcomeEmail;
