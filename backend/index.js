const express = require("express");
const app = express();
const port = process.env.MONGODB_URI || 3030;
const cors = require("cors");

const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51PjOnU09jCV3dmf0h6IAz7uyKhGqTMVxjPSSqQR8deTCCaC1cLMDTH4yJhIw8xI3S0ncVvd4J7ddX9WUphDHLNMV00SCsvdRBc"
);
const userRouter = require("./router/router");
const adminRouter = require("./router/adminRouter");

require("dotenv").config();
require("./config/db");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/", userRouter);
app.use("/", adminRouter);

// checkout api
app.post("/nem/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
      },
      unit_amount: parseFloat(product.price.replace("$", "")) * 100,
    },
    quantity: product.quantity,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });
  // console.log(product);
  res.json({
    id: session.id,
    success: true,
    message: "Ürünler alındı",
    products: products,
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
