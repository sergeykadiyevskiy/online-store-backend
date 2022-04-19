const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const CryptoJS = require("crypto-js");

// SIGN UP
router.post("/signup", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PHRASE_PASS
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOG IN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user &&
      res.status(401).json("Error entering credentials. Please try again");

    const hashedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PHRASE_PASS
    );
    const originalPassword = hashedPass.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Error entering credentials. Please try again");

    const token = jwt.sign(
      {
        id: user._id,
        admin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({...others, token});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
