const express = require('express');
const router = express.Router();

// controller
const SigninController = require('../routeController/signinController');
const SignupController = require('../routeController/SignupController');
router.get('/', (req, res)=>{
    res.send('USER ROUTE');
});

router.post('/sign-up', SignupController.signUp);
router.post('/sign-in', SigninController.signIn);


module.exports = router;