// Job Email templates


const StudentQRCodeEmail = (data: any) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Student QR Code</title>
        <style>
            /* Add inline CSS styles here for better email client compatibility */
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                padding: 20px;
            }
            .container {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333333;
            }
            p {
                font-size: 16px;
                color: #555555;
            }
            img {
                max-width: 100%;
                height: auto;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Student QR Code</h1>
            <p>Dear ${data.fullName},</p>
            <p>Here is your QR code for student ID:</p>
            <p>Here is your QR code for student ID:</p>

            <p>If image not display use this link: ${data.qrCode}</p>
           <img src="${data.qrCode}" alt="Student QR Code" style="max-width: 100%; height: auto;" />
            <p>Please use this QR code for student identification.</p>
            <p>Wellcome!</p>
        </div>
    </body>
    </html>
    `;
};


export default {
  StudentQRCodeEmail
};
