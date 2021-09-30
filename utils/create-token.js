const jwt = require('jsonwebtoken');

exports.createJWT = async (id) => {
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + ((60 * 60) * 10),
    data: id
  }, 'secret');
  return token;
}