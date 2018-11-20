import Router from 'express-promise-router';
import User from '../controllers/User';

const router = new Router();

router.post('/', User.createUser);

export default router;
