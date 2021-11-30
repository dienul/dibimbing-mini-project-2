const jwt = require("jsonwebtoken");
const Merchant = require("../../server/models").Merchants;

async function isAuthorize(req, res, next) {
  try {
    let { access_token, authorization } = req.headers;
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
      throw new Error('invalid token')
    }
    next()
  } catch (error) {
    res.status(401).json(error);
  }
}

module.exports = isAuthorize;
