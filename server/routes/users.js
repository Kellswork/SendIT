import Router from 'express-promise-router';
import auth from '../middlewares/authentication';
import Parcel from '../controllers/Parcel';

const router = new Router();

router.get('/:id/parcels', auth, Parcel.getUserParcelDeliveryOrders);

export default router;
