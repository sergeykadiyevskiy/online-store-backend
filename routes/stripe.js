const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

//is the process not working due to the token? error 500 keep going

// this shit is annoying.


router.post("/payment", (req, res) => {
  stripe.charges.create(
      {
          source: req.body.tokenId,
          amount: req.body.amount,
          currency: "usd",
        },
        (stripeErr, stripeRes) => {
            console.log(stripe)
            if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
