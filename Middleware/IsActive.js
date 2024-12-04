const jwt = require('jsonwebtoken');
const User = require('../Schema/userSchema');
const isActive = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id);
        console.log(user);
        if(!user.isActive){
            return res.status(401).json({
                message: 'User is not active Please contact to admin'
            });
        }
        next();
    }catch(error){
        res.status(401).json({
            message: 'User is not active Please contact to admin'
        });
    }
}

module.exports = isActive;