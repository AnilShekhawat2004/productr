exports.otp = (otp, email) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verification Code</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      font-family: Arial, Helvetica, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .container {
      background-color: #ffffff;
      width: 500px;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    }

    .logo {
      margin-bottom: 30px;
    }

    .logo img {
      width: 140px;
      height: auto;
    }

    .text {
      font-size: 18px;
      color: #333;
      margin-bottom: 20px;
    }

    .code-box {
      background-color: #f1f1f1;
      padding: 20px;
      border-radius: 10px;
      font-size: 32px;
      letter-spacing: 4px;
      color: #333;
      text-align: left;
      margin-bottom: 25px;
      font-weight: bold;
    }

    .info {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
    }

    .info a {
      color: #007bff;
      text-decoration: none;
    }

    .info a:hover {
      text-decoration: underline;
    }

    .footer {
      margin-top: 30px;
      font-size: 14px;
      color: #666;
    }
  </style>
</head>

<body>

  <div class="container">

    <!-- Logo instead of OpenAI text -->
    <div class="logo">
      <img src="https://res.cloudinary.com/dlxddzakp/image/upload/v1778912628/products/w4wkmdvdmzklgry5nf84.png" alt="Logo" />
    </div>

    <div class="text">
      Enter this temporary verification code to continue:
    </div>

    <div class="code-box">
      ${otp}
    </div>

    <div class="info">
      Do not share this code with anyone
    </div>

    <div class="footer">
      <p>Best,</p>
      <p>The Productr Team</p>
    </div>

  </div>

</body>
</html>
`;
};
