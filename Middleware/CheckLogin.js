const jwt = require('jsonwebtoken');

const CheckLogin = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        var decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        console.log(decoded);
        // console.log(req);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name
        },
        console.log(req.user);
        next();
    }catch(error){
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
}

module.exports = CheckLogin;
