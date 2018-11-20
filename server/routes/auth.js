import Router from 'express-promise-router';
import User from '../controllers/User';

const router = new Router();

router.post('/signup', User.createUser);
router.post('/login', User.userLogin);

export default router;
