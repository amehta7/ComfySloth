// domain/.netlify/functions/create-payment-intent ---> http://localhost:8888/.netlify/functions/create-payment-intent

require("dotenv").config(); //to get the .env variable

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  //console.log(event);

  const { cart, total_amount, shipping_fee } = JSON.parse(event.body);

  console.log(cart);

  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: "usd",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
