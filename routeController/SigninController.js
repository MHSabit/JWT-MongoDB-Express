const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../Schema/userSchema');
const Token = require('./UtilityFunction/Sign-in-Utility');
const SigninController = {};


SigninController.signIn = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({
                message: 'User not found'
            });
        }
        
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if(!passwordMatch){
            return res.status(400).json({
                message: 'Invalid password'
            });
        }
        const Refreshtoken = Token.generateRefreshToken(user);
        const AccessToken = Token.generateAccessToken(user);
        return res.status(200).json({
            message: 'User signed in successfully',
            refreshToken: Refreshtoken,
            accessToken: AccessToken,
            user: user
        });

    } catch(error) {
        console.error('Sign-in error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}



SigninController.generateAccessToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if(!refreshToken){
        return res.status(400).json({
            message: 'Refresh token is required'
        });
    }
    else{
        const verifyRefreshToken = Token.verifyRefreshToken(refreshToken);
        console.log('verifyRefreshToken', verifyRefreshToken);
        const user = {
            id: verifyRefreshToken.id,
            name: verifyRefreshToken.name,
            email: verifyRefreshToken.email
        }
        const generateAccessToken = Token.generateAccessToken(user);
        const generateRefreshToken = Token.generateRefreshToken(user);

        res.status(200).json({
            message: 'Access token generated successfully',
            accessToken: generateAccessToken,
            refreshToken: generateRefreshToken
        });
    }

}

module.exports = SigninController;