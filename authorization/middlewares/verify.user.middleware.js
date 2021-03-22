const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const userController =  require('../../users/controllers/users.controller');

exports.jwtSecret = jwtSecret =  'linuxfoundation';

let users = userController.users;

exports.isPasswordAndUserMatch = (req, res, next) => {
    const userEmail = req.body.email;
    const foundUser = users.find(i => i.email === userEmail) ;
    console.log('found user', foundUser);
    if (!foundUser) {
        return res.status(204).end();
    }
    else {
        let passwordFields = foundUser.password.split('$');
        let salt = passwordFields[0];
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        console.log('hash',hash);
        console.log(passwordFields[0], passwordFields[1]);
        if (hash === passwordFields[1]) {
            //delete foundUser.password;
            req.body = foundUser;
            
            console.log('next');
            return next();
        } else {
            return res.status(400).send({errors: ['Invalid email or password']});
        }
    }
 };

 exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                console.log('verify', authorization[1]);
                req.jwt = jwt.verify(authorization[1], this.jwtSecret);
                return next();
            }
        } catch (err) {
            console.log(err);
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
}; 

