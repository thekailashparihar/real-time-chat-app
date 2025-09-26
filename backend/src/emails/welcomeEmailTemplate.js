import "dotenv/config";

const welcomeEmailTemplate = (name, email) => {
    return `
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Welcome</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                background: #f4f6f8;
                font-family: Arial, Helvetica, sans-serif;
                color: #111;
            }
            .wrap {
                max-width: 600px;
                margin: 24px auto;
                background: #fff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
            }
            .pad {
                padding: 20px;
            }
            h1,
            h2,
            h3,
            h4,
            h5 {
                margin: 8px 0;
            }
            p {
                margin: 10px 0;
                color: #444;
                line-height: 1.4;
            }
            .btn {
                display: inline-block;
                padding: 10px 16px;
                background: #a3a7d7;
                color: #fff;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
            }
            .muted {
                color: #6b7280;
                font-size: 13px;
            }
            .footer {
                padding: 14px 20px;
                font-size: 12px;
                color: #8b8f96;
                border-top: 1px solid #eee;
            }
            .info {
                background: #fbfdff;
                border: 1px solid #eef2f6;
                padding: 12px;
                border-radius: 6px;
                margin-top: 12px;
            }
            @media screen and (max-width: 480px) {
                .pad {
                    padding: 16px;
                }
            }
        </style>
    </head>
    <body>
        <!-- preheader (inbox preview) -->
        <div
            style="
                display: none;
                max-height: 0;
                overflow: hidden;
                color: #fff;
                opacity: 0;
                font-size: 1px;
                line-height: 1px;
            "
        >
            Welcome to ${process.env.BRAND_NAME} — Your account is ready.
        </div>

        <div class="wrap" role="article" aria-roledescription="email">
            <div class="pad">
                <h2>Welcome to ${process.env.BRAND_NAME}!</h2>
                <p class="muted">Hi ${name},</p>

                <p>
                    Your account has been created successfully. Click the button
                    below to sign in and get started.
                </p>

                <p>
                    <a
                        href="${process.env.CLIENT_URL}"
                        class="btn"
                        target="_blank"
                        rel="noopener"
                        >Sign in to your account</a
                    >
                </p>

                <div class="info">
                    <strong>Account details</strong>
                    <p class="muted">
                        Email:
                        <span style="color: #111; font-weight: 600"
                            >${email}</span
                        >
                    </p>
                </div>

                <p class="muted" style="margin-top: 12px">
                    If you did not sign up, contact us at
                    <a
                        href="mailto:${process.env.SUPPORT_EMAIL}"
                        style="color: #0b69ff; text-decoration: none"
                        >${process.env.SUPPORT_EMAIL}</a
                    >.
                </p>

                <p style="margin-top: 18px">
                    Thanks,<br /><strong>Team ${process.env.BRAND_NAME}</strong>
                </p>
            </div>

            <div class="footer">${process.env.COMPANY_ADDRESS || ""}</div>
        </div>
    </body>
</html>

    `;
};
export default welcomeEmailTemplate;
