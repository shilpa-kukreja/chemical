import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // e.g., smtp.gmail.com
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Email templates
export const emailTemplates = {
  // Admin notification email
  adminNotification: (enquiry) => ({
    subject: `New Enquiry: ${enquiry.productName} - ${enquiry.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Enquiry Received</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 600;
          }
          .header p {
            font-size: 16px;
            opacity: 0.9;
          }
          .content {
            padding: 30px;
          }
          .enquiry-details {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .detail-item {
            display: flex;
            padding: 12px 0;
            border-bottom: 1px solid #e9ecef;
          }
          .detail-item:last-child {
            border-bottom: none;
          }
          .detail-label {
            width: 120px;
            font-weight: 600;
            color: #495057;
          }
          .detail-value {
            flex: 1;
            color: #212529;
          }
          .requirement-box {
            background: white;
            border-left: 4px solid #dc2626;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            font-style: italic;
          }
          .status-badge {
            display: inline-block;
            background: #fef3c7;
            color: #92400e;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
          }
          .button {
            display: inline-block;
            background: #dc2626;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 500;
            margin-top: 20px;
          }
          .button:hover {
            background: #b91c1c;
          }
          .footer {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            border-top: 1px solid #e9ecef;
            font-size: 14px;
            color: #6c757d;
          }
          .footer a {
            color: #dc2626;
            text-decoration: none;
          }
          @media (max-width: 600px) {
            .container {
              margin: 10px;
              border-radius: 8px;
            }
            .header {
              padding: 20px;
            }
            .content {
              padding: 20px;
            }
            .detail-item {
              flex-direction: column;
            }
            .detail-label {
              width: 100%;
              margin-bottom: 4px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 New Enquiry Received</h1>
            <p>A customer has submitted a new enquiry</p>
          </div>
          
          <div class="content">
            <div style="margin-bottom: 20px;">
              <span class="status-badge">${enquiry.status || 'pending'}</span>
              <span style="float: right; color: #6c757d;">
                ${new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>

            <div class="enquiry-details">
              <div class="detail-item">
                <div class="detail-label">Product:</div>
                <div class="detail-value"><strong>${enquiry.productName}</strong></div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">Name:</div>
                <div class="detail-value">${enquiry.name}</div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">Email:</div>
                <div class="detail-value">
                  <a href="mailto:${enquiry.email}" style="color: #dc2626; text-decoration: none;">
                    ${enquiry.email}
                  </a>
                </div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">Phone:</div>
                <div class="detail-value">
                  <a href="tel:${enquiry.phone}" style="color: #dc2626; text-decoration: none;">
                    ${enquiry.phone}
                  </a>
                </div>
              </div>
            </div>

            <div class="requirement-box">
              <div style="font-weight: 600; margin-bottom: 8px; color: #495057;">📋 Requirement:</div>
              <div style="color: #212529;">${enquiry.requirement}</div>
            </div>

            
          </div>

       
        </div>
      </body>
      </html>
    `,
  }),

  // Customer acknowledgment email
  customerAcknowledgment: (enquiry) => ({
    subject: `Thank you for your enquiry about ${enquiry.productName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Enquiry</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            font-size: 32px;
            margin-bottom: 10px;
            font-weight: 600;
          }
          .header p {
            font-size: 18px;
            opacity: 0.95;
          }
          .content {
            padding: 40px 30px;
          }
          .greeting {
            font-size: 18px;
            margin-bottom: 20px;
          }
          .greeting strong {
            color: #2563eb;
          }
          .message-box {
            background: #f0f9ff;
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
            border: 1px solid #bae6fd;
          }
          .details-summary {
            background: #f8fafc;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border: 1px solid #e2e8f0;
          }
          .detail-row {
            display: flex;
            padding: 8px 0;
          }
          .detail-label {
            width: 100px;
            font-weight: 600;
            color: #475569;
          }
          .detail-value {
            flex: 1;
            color: #0f172a;
          }
          .next-steps {
            background: white;
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          }
          .step-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding: 10px;
            background: #f8fafc;
            border-radius: 8px;
          }
          .step-number {
            width: 30px;
            height: 30px;
            background: #2563eb;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 15px;
            flex-shrink: 0;
          }
          .contact-info {
            background: #f1f5f9;
            border-radius: 8px;
            padding: 20px;
            margin-top: 30px;
            text-align: center;
          }
          .contact-info a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
          }
          .footer {
            text-align: center;
            padding: 30px;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            font-size: 14px;
            color: #64748b;
          }
          .social-links {
            margin-top: 15px;
          }
          .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #475569;
            text-decoration: none;
          }
          @media (max-width: 600px) {
            .container {
              margin: 10px;
              border-radius: 8px;
            }
            .header {
              padding: 30px 20px;
            }
            .content {
              padding: 30px 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ Thank You!</h1>
            <p>We've received your enquiry</p>
          </div>
          
          <div class="content">
            <div class="greeting">
              Dear <strong>${enquiry.name}</strong>,
            </div>
            
            <p style="font-size: 16px; color: #334155;">
              Thank you for reaching out to us. We have received your enquiry and appreciate your interest in our products/services.
            </p>

            <div class="message-box">
              <div style="font-weight: 600; color: #1e40af; margin-bottom: 10px;">📋 Your Enquiry Summary:</div>
              <div style="font-style: italic; color: #1e293b;">
                "${enquiry.requirement}"
              </div>
            </div>

            <div class="details-summary">
              <h3 style="color: #0f172a; margin-bottom: 15px;">Enquiry Details:</h3>
              <div class="detail-row">
                <div class="detail-label">Product:</div>
                <div class="detail-value"><strong>${enquiry.productName}</strong></div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Name:</div>
                <div class="detail-value">${enquiry.name}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Email:</div>
                <div class="detail-value">${enquiry.email}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Phone:</div>
                <div class="detail-value">${enquiry.phone}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Date:</div>
                <div class="detail-value">${new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</div>
              </div>
            </div>
            
         </div>
      </body>
      </html>
    `,
  }),
};

// Send email function
export const sendEmail = async ({ to, subject, html, from = process.env.EMAIL_FROM }) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: from || process.env.EMAIL_FROM,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send enquiry emails (both admin and customer)
export const sendEnquiryEmails = async (enquiry) => {
  const results = [];

  // Send email to admin
  if (process.env.ADMIN_EMAIL) {
    const adminEmail = emailTemplates.adminNotification(enquiry);
    const adminResult = await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: adminEmail.subject,
      html: adminEmail.html,
    });
    results.push({ recipient: 'admin', ...adminResult });
  }

  // Send acknowledgment to customer
  const customerEmail = emailTemplates.customerAcknowledgment(enquiry);
  const customerResult = await sendEmail({
    to: enquiry.email,
    subject: customerEmail.subject,
    html: customerEmail.html,
  });
  results.push({ recipient: 'customer', ...customerResult });

  return results;
};