const Merchant = require("../server/models").Merchant;
var bcrypt = require('bcryptjs');

async function signUp(req, res) {
    console.log('masuk')
  try {
    const salt = bcrypt.genSaltSync(10);
    const { username, password } = req.body
    const hash = await bcrypt.hashSync(password, salt);
    const createMerchant = await Merchant.create({
        username  : username,
        password : hash
    }, { raw: true })
    res.status(200).json(createMerchant)
  } catch (error) {}
}

async function signIn(req,res){
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
  signUp,
  signIn
};
