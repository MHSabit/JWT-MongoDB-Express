const jwt = require('jsonwebtoken');

const CheckLogin = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        var decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        console.log(decoded);
        next();
    }catch(error){
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
}

module.exports = CheckLogin;
