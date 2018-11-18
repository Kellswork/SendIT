import express from 'express';
import ParcelOrder from '../controllers/ParcelOrder';

const router = express.Router();

export default router;

router.get('/', ParcelOrder.getAllParcelOrders);

router.get('/:id', ParcelOrder.getOneParcelOrder);

router.post('/', ParcelOrder.createParcelOrder);

router.put('/:id/cancel', ParcelOrder.cancelParcelOrder);
