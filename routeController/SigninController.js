const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../Schema/userSchema');
const SigninController = {};


SigninController.signIn = async (req, res) => {
    try{
        const user = await UserModel.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({
                message: 'User not found'
            });
        }
        else {
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            console.log(passwordMatch);
            if(!passwordMatch){
                return res.status(400).json({
                    message: 'Invalid password'
                });
            }
            else {
                const token = jwt.sign({
                    name: user.name,
                    id: user._id,
                    email: user.email,
                }, process.env.JWT_TOKEN_SECRET, {expiresIn: '1h', algorithm: 'HS256'});
                console.log(user);
                console.log(token);
                
                res.status(200).json({
                    message: 'User signed in successfully',
                    accessToken: token,
                    user: user
                });
            }
        }
    }catch(error){
        console.log(error);
    }
}

module.exports = SigninController;