const Merchant = require("../server/models").Merchants;
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  setCookie,
  getCookie,
  eraseCookie,
} = require("../service/utility/cookie");

async function signUp(req, res) {
  console.log("masuk");
  try {
    const salt = bcrypt.genSaltSync(10);
    const { username, password, address, phone_number } = req.body;

    if (
      username === undefined ||
      password === undefined ||
      username === "" ||
      password == ""
    ) {
      throw "usernmae or password required";
    }

    const hash = await bcrypt.hashSync(password, salt);
    const createMerchant = await Merchant.create(
      {
        username: username,
        password: hash,
        address: address,
        join_date: new Date().toDateString(),
        phone_number: phone_number,
      },
      { raw: true }
    );

    res.status(200).json({
      status: 200,
      data: {
        token: createMerchant,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
}

async function signIn(req, res) {
  try {
    console.log("body >>", req.body);
    const { username, password } = req.body;

    if (username === undefined || password === undefined) {
      res.status(401).json({
        message: "usernmae or password invalid",
      });
    }

    let token = null;
    const merchant = await Merchant.findOne({
      where: {
        username: username,
      },
    });
    console.log("merchant >>", merchant);
    if (!merchant) {
      res.status(401).json({
        message: "merchant tidak di temukan",
      });
    }
    const comparePassword = await bcrypt.compareSync(
      password.toString(),
      merchant.password
    );
    console.log("env >>", process.env.SECRET);
    if (comparePassword) {
      token = await jwt.sign(
        {
          id : merchant.id,
          username: merchant.username,
          address: merchant.address,
          phone_number: merchant.phone_number,
        },
        process.env.SECRET
      );
    } else {
      res.status(500).json("Ath tidak cocok");
    }
    console.log("token >>", token);
    // setCookie("username", merchant.username, new Date().getDay());
    // console.log(getCookie("username"));
    res.status(200).json({
      status: 200,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
}

async function deleteMerchant(req, res) {
  try {
    console.log("deleteMerchant >>", req.merchant);
    const resultDelete = await Merchant.destroy(
      {
        where: {
          id: req.merchant.id,
        },
      },
      {
        raw: true,
      }
    );
    if (!resultDelete) {
      throw { message: "Delete product gagal !!" };
    }
    res.status(200).json("Merchant berhasil di hapus !!");
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  signUp,
  signIn,
  deleteMerchant,
};
