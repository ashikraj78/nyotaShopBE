const Razorpay = require("razorpay");
let razorpayController = {
  createSession: async function (req, res) {
    try {
      const { amount, currency } = req.body;
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      const options = {
        amount: amount * 100,
        currency: currency,
        receipt: "receipt_order_74394",
      };
      const order = await instance.orders.create(options);
      if (!order) return res.status(500).send("Some error occured");
      res.json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Failed to create session" });
    }
  },
  //   verifyPayment: async (orderId, paymentId, signature) => {
  verifyPayment: async function (req, res) {
    const { orderId, paymentId, signature } = req.body;
    const payload = `${orderId}|${paymentId}`;
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const expectedSignature = crypto
      .createHmac("sha256", "your_key_secret")
      .update(payload)
      .digest("hex");
    if (expectedSignature === signature) {
      const payment = await razorpay.payments.fetch(paymentId);
      //   return payment;
      res.json(payment);
    } else {
      throw new Error("Invalid Signature");
    }
  },
};
module.exports = razorpayController;
