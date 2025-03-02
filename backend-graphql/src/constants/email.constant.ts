const subject = "Reset Your Password - Secure Your Account Today";

const generateHtmlContent = (url:string) => {

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
            margin: 10px 0;
        }
        .btn:hover {
            background-color: #45a049;
        }
        .footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            Reset Your Password
        </div>
        <div class="content">
            <p>Hi there,</p>
            <p>We received a request to reset your password. If you made this request, please click the button below to securely reset your password:</p>
            <p style="text-align: center;">
                <a href="${url}" class="btn">Reset Password</a>
            </p>
            <p>If you didn’t request a password reset, you can safely ignore this email. Your account will remain secure.</p>
            <p>For your security, this link will expire in 30 minutes.</p>
            <p>Thank you,<br>The Shubham Uber</p>
        </div>
        <div class="footer">
            &copy; 2025 Shubham Uber. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
return htmlContent

}


export {
    subject,
    generateHtmlContent
}