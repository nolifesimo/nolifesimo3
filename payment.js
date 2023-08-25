const express = require("express");
const app = express();
const stripe = require("stripe")(
  "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"
);

app.use(express.json());

app.post("/create-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Poznaj wynik",
          },
          unit_amount: 1000, // Wartość w centach (np. 10.00 USD = 1000)
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://www.google.pl/",
    cancel_url: "https://www.youtube.com/",
  });

  res.json({ id: session.id });
});

app.listen(3000, () => {
  console.log("Serwer nasłuchuje na porcie 3000");
});
