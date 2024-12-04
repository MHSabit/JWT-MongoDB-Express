const jwt = require('jsonwebtoken');

const Token= {};

Token.generateRefreshToken = (user) => {
    if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
        throw new Error('JWT_REFRESH_TOKEN_SECRET is not defined in environment variables');
    }
    
    return jwt.sign(
        { 
            id: user._id,
            name: user.name,
            email: user.email 
        },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};


Token.generateAccessToken = (user) => {
    if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
        throw new Error('JWT_ACCESS_TOKEN_SECRET is not defined in environment variables');
    }

    return jwt.sign(
        { 
            id: user._id,
            name: user.name,
            email: user.email 
        },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
};


Token.verifyRefreshToken = (token) => {
    if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
        throw new Error('JWT_REFRESH_TOKEN_SECRET is not defined in environment variables');
    }
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, { algorithms: ['HS256'] });
};


module.exports = Token;
