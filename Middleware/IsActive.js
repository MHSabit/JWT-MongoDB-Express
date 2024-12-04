const jwt = require('jsonwebtoken');

const isActive = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id);
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