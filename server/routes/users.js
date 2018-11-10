import express from 'express';
import users from '../controllers/users';

const router = express.Router();

router.get('/', users.getAllUsers);

router.get('/:userId/parcels', users.getAllParcelOrderCreatedByUser);
export default router;
