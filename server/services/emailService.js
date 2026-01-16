const nodemailer = require("nodemailer");

// Tạo transporter cho email
const createTransporter = () => {
  // Sử dụng Gmail SMTP (có thể thay đổi sang các provider khác)
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Email của bạn
      pass: process.env.EMAIL_PASS, // App Password (không phải password thường)
    },
  });
};

// Template email OTP đăng ký
const getRegisterOTPTemplate = (otp, name = "Customer") => {
  return {
    subject: "🔐 Verify Your Email - Registration OTP",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px 10px 0 0;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome to Our Store! 🛒</h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                      Hello <strong>${name}</strong>,
                    </p>
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                      Thank you for registering! Please use the following OTP code to verify your email address:
                    </p>
                    
                    <!-- OTP Box -->
                    <div style="text-align: center; margin: 30px 0;">
                      <div style="display: inline-block; padding: 20px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
                        <span style="font-size: 36px; font-weight: bold; color: #ffffff; letter-spacing: 8px;">${otp}</span>
                      </div>
                    </div>
                    
                    <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0 0 10px; text-align: center;">
                      ⏰ This code will expire in <strong>5 minutes</strong>
                    </p>
                    
                    <p style="color: #999999; font-size: 13px; line-height: 1.6; margin: 20px 0 0; padding-top: 20px; border-top: 1px solid #eeeeee;">
                      If you didn't request this code, please ignore this email. Someone might have entered your email address by mistake.
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 30px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 10px 10px;">
                    <p style="color: #999999; font-size: 12px; margin: 0;">
                      © 2024 E-Commerce Store. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `Hello ${name},\n\nYour OTP code is: ${otp}\n\nThis code will expire in 5 minutes.\n\nIf you didn't request this code, please ignore this email.`,
  };
};

// Template email OTP reset password
const getResetPasswordOTPTemplate = (otp, name = "Customer") => {
  return {
    subject: "🔑 Password Reset OTP",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 10px 10px 0 0;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Password Reset Request 🔐</h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                      Hello <strong>${name}</strong>,
                    </p>
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                      We received a request to reset your password. Use the following OTP code:
                    </p>
                    
                    <!-- OTP Box -->
                    <div style="text-align: center; margin: 30px 0;">
                      <div style="display: inline-block; padding: 20px 40px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 10px;">
                        <span style="font-size: 36px; font-weight: bold; color: #ffffff; letter-spacing: 8px;">${otp}</span>
                      </div>
                    </div>
                    
                    <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0 0 10px; text-align: center;">
                      ⏰ This code will expire in <strong>5 minutes</strong>
                    </p>
                    
                    <p style="color: #999999; font-size: 13px; line-height: 1.6; margin: 20px 0 0; padding-top: 20px; border-top: 1px solid #eeeeee;">
                      If you didn't request a password reset, please ignore this email or contact support if you have concerns.
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 30px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 10px 10px;">
                    <p style="color: #999999; font-size: 12px; margin: 0;">
                      © 2024 E-Commerce Store. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `Hello ${name},\n\nYour password reset OTP code is: ${otp}\n\nThis code will expire in 5 minutes.\n\nIf you didn't request this, please ignore this email.`,
  };
};

// Hàm gửi email OTP
const sendOTPEmail = async (
  email,
  otp,
  type = "register",
  name = "Customer"
) => {
  try {
    const transporter = createTransporter();

    let template;
    switch (type) {
      case "reset-password":
        template = getResetPasswordOTPTemplate(otp, name);
        break;
      case "register":
      default:
        template = getRegisterOTPTemplate(otp, name);
        break;
    }

    const mailOptions = {
      from: `"E-Commerce Store" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ OTP email sent to ${email}: ${info.messageId}`);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("❌ Error sending OTP email:", error.message);
    throw error;
  }
};

// Hàm gửi email chào mừng sau khi đăng ký thành công
const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"E-Commerce Store" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Welcome to E-Commerce Store!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <tr>
                    <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); border-radius: 10px 10px 0 0;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome Aboard! 🚀</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px 30px; text-align: center;">
                      <p style="color: #333333; font-size: 18px; line-height: 1.6; margin: 0 0 20px;">
                        Hello <strong>${name}</strong>! 👋
                      </p>
                      <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                        Your account has been successfully created. Start shopping for amazing products now!
                      </p>
                      <a href="${
                        process.env.CLIENT_URL || "http://localhost:3000"
                      }" style="display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Start Shopping 🛍️
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 30px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 10px 10px;">
                      <p style="color: #999999; font-size: 12px; margin: 0;">
                        © 2024 E-Commerce Store. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${email}`);

    return { success: true };
  } catch (error) {
    console.error("❌ Error sending welcome email:", error.message);
    // Không throw error vì email welcome không critical
    return { success: false, error: error.message };
  }
};

// Template email xác nhận đơn hàng
const getOrderConfirmationTemplate = (order, name = "Customer") => {
  const itemsHtml = order.orderItems
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee;">
        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px; margin-right: 10px; vertical-align: middle;">
        <span style="color: #333333; font-size: 14px;">${item.name}</span>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; text-align: center; color: #666666;">x${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eeeeee; text-align: right; color: #333333; font-weight: bold;">${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price * item.quantity)}</td>
    </tr>
  `
    )
    .join("");

  return {
    subject: `📦 Order Confirmation #${order._id.toString().slice(-6).toUpperCase()}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #2bbef9 0%, #1ea8e0 100%); border-radius: 10px 10px 0 0;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Thank You for Your Order! 🎉</h1>
                    <p style="color: #ffffff; margin: 10px 0 0; opacity: 0.9;">Order ID: #${order._id}</p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                      Hello <strong>${name}</strong>,
                    </p>
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                      We've received your order and it's now being processed. Here are your order details:
                    </p>
                    
                    <!-- Order Items Table -->
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                      <thead>
                        <tr style="background-color: #f8f9fa;">
                          <th style="padding: 10px; text-align: left; color: #333333; font-size: 14px;">Product</th>
                          <th style="padding: 10px; text-align: center; color: #333333; font-size: 14px;">Qty</th>
                          <th style="padding: 10px; text-align: right; color: #333333; font-size: 14px;">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${itemsHtml}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="2" style="padding: 20px 10px 5px; text-align: right; color: #666666;">Subtotal:</td>
                          <td style="padding: 20px 10px 5px; text-align: right; color: #333333;">${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.totalPrice - (order.shippingPrice || 0))}</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding: 5px 10px; text-align: right; color: #666666;">Shipping:</td>
                          <td style="padding: 5px 10px; text-align: right; color: #333333;">${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.shippingPrice || 0)}</td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding: 10px; text-align: right; color: #333333; font-weight: bold; font-size: 18px;">Total:</td>
                          <td style="padding: 10px; text-align: right; color: #2bbef9; font-weight: bold; font-size: 18px;">${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.totalPrice)}</td>
                        </tr>
                      </tfoot>
                    </table>

                    <!-- Shipping Info -->
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 30px;">
                      <h3 style="margin-top: 0; color: #333333; font-size: 16px;">Shipping Address</h3>
                      <p style="color: #666666; font-size: 14px; margin: 0; line-height: 1.6;">
                        ${order.shippingAddress.fullName}<br>
                        ${order.shippingAddress.phone}<br>
                        ${order.shippingAddress.address}, ${order.shippingAddress.city}<br>
                        ${order.shippingAddress.country}
                      </p>
                    </div>
                    
                    <p style="color: #999999; font-size: 13px; line-height: 1.6; margin: 30px 0 0; padding-top: 20px; border-top: 1px solid #eeeeee; text-align: center;">
                      You can track your order status in your profile dashboard.
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 30px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 10px 10px;">
                    <p style="color: #999999; font-size: 12px; margin: 0;">
                      © 2024 E-Commerce Store. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `Thank you for your order! Order ID: #${order._id}. Total: ${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.totalPrice)}`,
  };
};

// Hàm gửi email xác nhận đơn hàng
const sendOrderConfirmationEmail = async (email, order, name = "Customer") => {
  try {
    const transporter = createTransporter();
    const template = getOrderConfirmationTemplate(order, name);

    const mailOptions = {
      from: `"E-Commerce Store" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Order confirmation email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending order confirmation email:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOTPEmail,
  sendWelcomeEmail,
  sendOrderConfirmationEmail,
};
