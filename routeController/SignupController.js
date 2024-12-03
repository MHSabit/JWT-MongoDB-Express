const bcrypt = require('bcrypt');
const UserModel = require('../Schema/userSchema');



const SignupController = {};

SignupController.signUp = async (req, res) => {
    try{
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        }

        const existingUser = await UserModel.findOne({email: user.email});
        if(existingUser){
            return res.status(400).json({
                message: 'Email ID already associated with a user'
            });
        }
        else {
            const CreateUser = await UserModel.create(user);
            console.log(CreateUser);
            res.status(200).json({
                message: 'User created successfully',
                user: CreateUser
            });
        }
    } catch(error){
        console.log(error);
    }
}


module.exports = SignupController;