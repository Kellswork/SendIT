import express from 'express';
import Parcel from '../controllers/Parcel';
import auth from '../middlewares/authentication';

const router = express.Router();

export default router;

router.get('/', auth, Parcel.getAllParcelDeliveryOrders);
router.get('/', auth, Parcel.getOneParcelDeliveryOrder);
