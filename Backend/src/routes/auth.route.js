import {Router} from 'express';
import { registerUser,loginUser, logoutUser , getmeUser} from '../controllers/auth.controller.js';
import {authUser} from '../middlewares/auth.middleware.js';



const authRouter = Router();

authRouter.route('/register').post(registerUser);
authRouter.route('/login').post(loginUser);

// @route GET /api/auth/logout
//@desc clear token from user cookie and add the token to blacklist
authRouter.route('/logout').get(logoutUser);


//@route Get /api/auth/get-me
//@desc get the current login user details
//@access private
authRouter.route('/get-me').get(authUser,getmeUser)

export  {authRouter};