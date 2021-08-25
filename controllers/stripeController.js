const stripe = require("stripe")(
  "sk_test_51JQYTnDsGZQiZyXQfOuGcY0q6hQYRR3jmdI9e9j5SqGbRxB7YyodD4844u5JwrAeFGwa22RHJkBOOy0MIjp0c8HB00JohV6oR6"
);
exports.payment = async (req, res) => {
  let { amount } = req.body;
  try {
    console.log("try", req.body);
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    console.log("Payment", payment);
    res.json({
      clienSecret: payment.client_secret,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
};
