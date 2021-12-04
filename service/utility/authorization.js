const jwt = require("jsonwebtoken");
const Merchant = require("../../server/models").Merchants;

async function isAuthorize(req, res, next) {
  try {
    let { access_token, authorization } = req.headers;

    if(!authorization){
      throw ({ message : "Token tidak ditemukan"})
    }
    const token = authorization.split(" ")[1]

    const decode = await jwt.verify(token, process.env.SECRET);
    const merchant = await Merchant.findOne(
      {
        where: {
          username: decode.username,
        },
      },
      {
        raw: true,
      }
    );
    if(merchant){
      req.merchant = merchant
    } else {
      throw({message : 'invalid token'})
    }
    next()
  } catch (error) {
    res.status(401).json(error.message);
  }
}

module.exports = isAuthorize;
