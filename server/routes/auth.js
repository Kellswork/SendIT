import Router from 'express-promise-router';
import User from '../controllers/User';
import { signupValidation, loginValidation } from '../middlewares/userValidator';

const router = new Router();

router.post('/signup', signupValidation, User.createUser);
router.post('/login', loginValidation, User.userLogin);

export default router;
