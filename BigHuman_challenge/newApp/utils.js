const jwt = require('jsonwebtoken');

module.exports.generateJWT = (name, email) => {
    const payload = {"name":name, "email": email}
    console.log(payload)
    const options = {expiresIn: '1hr'} // Token expires in 60 minutes
    return jwt.sign(payload, 'jonimitchell', options) // Secret key-word is 'jonimitchell' for encryption
}