import Router from 'express-promise-router';
import Parcel from '../controllers/Parcel';
import auth from '../middlewares/authentication';
import admin from '../middlewares/authorization';
import { createOrderValidation, updateStatusValidation } from '../middlewares/parcelValidator';

const router = new Router();

router.get('/', auth, admin, Parcel.getAllParcelDeliveryOrders);
router.get('/:id', auth, Parcel.getOneParcelDeliveryOrder);
router.post('/', auth, createOrderValidation, Parcel.createParcelDeliveryOrder);
router.patch('/:id/cancel', auth, Parcel.cancelParcelDeliveryOrder);
router.patch('/:id/destination', auth, Parcel.updateParcelDestinationAddress);
router.patch('/:id/currentlocation', auth, admin, Parcel.updateParcelCurrentLocation);
router.patch('/:id/status', auth, admin, updateStatusValidation, Parcel.updateParcelDeliveryOrderStatus);

export default router;
