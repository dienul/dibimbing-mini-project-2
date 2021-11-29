const Merchant = require("../server/models").Merchants;
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signUp(req, res) {
  console.log("masuk");
  try {
    const salt = bcrypt.genSaltSync(10);
    const { username, password } = req.body;
    const hash = await bcrypt.hashSync(password, salt);
    const createMerchant = await Merchant.create(
      {
        username: username,
        password: hash,
      },
      { raw: true }
    );
    console.log(createMerchant)
    res.status(200).json(createMerchant);
  } catch (error) {
    res.status(500).json(error)
  }
}

async function signIn(req, res) {
  try {
    const { username, password } = req.body;
    let token = null;
    const merchant = await Merchant.findOne({
      where: {
        username: username,
      },
    });
    const comparePassword = await bcrypt.compareSync(
      password.toString(),
      merchant.password
    );
    console.log("env >>", process.env.SECRET);
    if (comparePassword) {
      token = await jwt.sign(
        {
          username: merchant.username,
          address: merchant.address,
          phone_number: merchant.phone_number,
        },
        process.env.SECRET
      );
    } else {
      res.status(500).json("Ath tidak cocok")
    }
    console.log("token >>", token);
    res.status(200).json({
      token: token,
    });
  } catch (error) {}
}

module.exports = {
  signUp,
  signIn,
};
