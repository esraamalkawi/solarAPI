const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
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
      clienSecret: paymentIntent.client_secret,
    });
    // res.send({
    //   clientSecret: paymentIntent.client_secret,
    // });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
};

// exports.payment = async (req, res) => {
//   let { amount, id } = req.body;
//   try{
//     console.log("try", req.body);
//     const payment = await stripe.paymentIntents.create({
//       amount,
//       currency: "USD",
//       //payment_method_types: ["card"],
//       // description: "company",
//       // payment_method: id,
//       // confirm: true,
//     });
//     console.log("Payment", payment);
//     res.json({
//       clienSecret: paymentIntent.client_secret,
//       // message: "Payment successful",
//       // success: true,
//     });
//   } catch (error) {
//     console.log("Error", error);
//     res.json({
//       message: "Payment failed",
//       success: false,
//     });
//   }
// };
