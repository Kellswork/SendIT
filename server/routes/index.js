import express from 'express';
import parcelOrder from '../controllers/index';

const router = express.Router();

export default router;

router.get('/', parcelOrder.getAllparcelOrders);

router.get('/:id', parcelOrder.getOneParcelOrder);

router.post('/', parcelOrder.createParcelOrder);

router.put('/:id/cancel', parcelOrder.cancelParcelOrder);
