const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const authMiddleware = require ('./../middlewares/verify.user.middleware')


exports.login = (req, res) => {
    try {
        let refreshId = req.body.id + jwtSecret;
        console.log('refreshId', refreshId);
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        console.log('secret',authMiddleware.jwtSecret);
        let token = jwt.sign(req.body, authMiddleware.jwtSecret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        console.log('refreshtoken', refresh_token);
        res.status(201).send({accessToken: token, refreshToken: refresh_token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
 };