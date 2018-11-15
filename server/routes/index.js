import express from 'express';
import Parcelorder from '../controllers/index';

const router = express.Router();

export default router;

router.get('/', Parcelorder.getAllparcelOrders);

router.get('/:id', Parcelorder.getOneParcelOrder);

router.post('/', Parcelorder.createParcelOrder);

router.put('/:id/cancel', Parcelorder.cancelParcelOrder);
