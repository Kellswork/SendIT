import express from 'express';
import User from '../controllers/User';

const router = express.Router();

export default router;
router.get('/', User.getAllUsers);

router.get('/:userId/parcels', User.getAllParcelOrderCreatedByUser);
