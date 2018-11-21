import express from 'express';
import Parcel from '../controllers/Parcel';
import auth from '../middlewares/authentication';
import admin from '../middlewares/authorization';

const router = express.Router();

export default router;

router.get('/', auth, admin, Parcel.getAllParcelDeliveryOrders);
router.get('/:id', auth, Parcel.getOneParcelDeliveryOrder);
router.post('/', auth, Parcel.createParcelDeliveryOrder);
