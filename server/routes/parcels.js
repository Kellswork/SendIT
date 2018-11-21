import Router from 'express-promise-router';
import Parcel from '../controllers/Parcel';
import auth from '../middlewares/authentication';
import admin from '../middlewares/authorization';

const router = new Router();

router.get('/', auth, admin, Parcel.getAllParcelDeliveryOrders);
router.get('/:id', auth, Parcel.getOneParcelDeliveryOrder);
router.post('/', auth, Parcel.createParcelDeliveryOrder);

export default router;
