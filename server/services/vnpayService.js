const crypto = require("crypto");
const qs = require("qs");

class VNPayService {
  constructor() {
    this.tmnCode = process.env.VNPAY_TMN_CODE || "5GED7Z64";
    this.secretKey =
      process.env.VNPAY_HASH_SECRET || "X8SUQQZN379NN226JFPFOOGMSIEL1O08";
    this.vnpUrl =
      process.env.VNPAY_URL ||
      "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

    // Auto detect environment for return URL
    const isProduction =
      process.env.NODE_ENV === "production" || process.env.RENDER;
    const defaultReturnUrl = isProduction
      ? "https://ecommerce-u7gm.onrender.com/api/orders/vnpay-return"
      : "http://localhost:9000/api/orders/vnpay-return";

    this.returnUrl = process.env.VNPAY_RETURN_URL || defaultReturnUrl;

    // Auto detect client URL for redirect after payment
    const defaultClientUrl = isProduction
      ? "https://ecommerce-five-lime-99.vercel.app/"
      : "http://localhost:3000";

    this.clientUrl = process.env.CLIENT_URL || defaultClientUrl;
  }

  getClientUrl() {
    return this.clientUrl;
  }

  sortObject(obj) {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    keys.forEach((key) => {
      sorted[key] = obj[key];
    });
    return sorted;
  }

  createPaymentUrl({
    orderId,
    amount,
    orderInfo,
    ipAddr,
    bankCode = "",
    locale = "vn",
  }) {
    const date = new Date();
    const createDate = this.formatDate(date);
    const expireDate = this.formatDate(
      new Date(date.getTime() + 20 * 60 * 1000)
    ); // 20 minutes expiry

    // Ensure amount is integer (no decimals) and multiply by 100
    const vnpAmount = Math.floor(Number(amount)) * 100;

    // Sanitize orderInfo - remove special characters that VNPay doesn't accept
    const sanitizedOrderInfo = orderInfo
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .substring(0, 255);

    let vnpParams = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: this.tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: sanitizedOrderInfo,
      vnp_OrderType: "other",
      vnp_Amount: vnpAmount,
      vnp_ReturnUrl: this.returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      vnp_ExpireDate: expireDate,
    };

    if (bankCode) {
      vnpParams.vnp_BankCode = bankCode;
    }

    // Sort params alphabetically
    vnpParams = this.sortObject(vnpParams);

    const signData = Object.keys(vnpParams)
      .sort()
      .map((key) => {
        const value = String(vnpParams[key]);
        // VNPay 2.1.0 requires values to be URL encoded before joining for hash
        return `${key}=${encodeURIComponent(value).replace(/%20/g, "+")}`;
      })
      .join("&");

    const hmac = crypto.createHmac("sha512", this.secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnpParams.vnp_SecureHash = signed;
    const paymentUrl = `${this.vnpUrl}?${Object.keys(vnpParams)
      .sort()
      .map((key) => {
        const value = String(vnpParams[key]);
        return `${key}=${encodeURIComponent(value).replace(/%20/g, "+")}`;
      })
      .join("&")}`;
    return paymentUrl;
  }

  verifyReturnUrl(vnpParams, expectedAmount) {
    const secureHash = vnpParams.vnp_SecureHash;

    delete vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHashType;

    const sortedParams = this.sortObject(vnpParams);
    const signData = qs.stringify(sortedParams, { encode: false });

    const signed = crypto
      .createHmac("sha512", this.secretKey)
      .update(Buffer.from(signData, "utf-8"))
      .digest("hex");

    const isValid =
      secureHash === signed &&
      vnpParams.vnp_ResponseCode === "00" &&
      vnpParams.vnp_TmnCode === this.tmnCode &&
      Number(vnpParams.vnp_Amount) === expectedAmount * 100;

    return {
      isValid,
      orderId: vnpParams.vnp_TxnRef,
      amount: Number(vnpParams.vnp_Amount) / 100,
      responseCode: vnpParams.vnp_ResponseCode,
      transactionNo: vnpParams.vnp_TransactionNo,
    };
  }

  verifyIPN(vnpParams) {
    return this.verifyReturnUrl(vnpParams);
  }

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }

  getResponseMessage(responseCode) {
    const messages = {
      "00": "Transaction successful",
      "07": "Money deducted successfully. Transaction is suspected (related to fraud, unusual transaction).",
      "09": "Transaction failed: Card/Account has not registered for InternetBanking service at the bank.",
      10: "Transaction failed: Customer verified card/account information incorrectly more than 3 times",
      11: "Transaction failed: Payment timeout expired. Please try again.",
      12: "Transaction failed: Card/Account is locked.",
      13: "Transaction failed: Incorrect OTP password. Please try again.",
      24: "Transaction failed: Customer cancelled the transaction",
      51: "Transaction failed: Insufficient account balance.",
      65: "Transaction failed: Account has exceeded daily transaction limit.",
      75: "Payment bank is under maintenance.",
      79: "Transaction failed: Incorrect payment password entered too many times. Please try again.",
      99: "Other errors (unknown error)",
    };
    return messages[responseCode] || "Unknown error";
  }

  /**
   * Check if payment was successful
   */
  isPaymentSuccess(responseCode) {
    return responseCode === "00";
  }
}

module.exports = new VNPayService();
