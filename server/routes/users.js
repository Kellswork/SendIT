import express from 'express';
import parcel from '../models/parcel';
import user from '../models/users';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send(user);
});

router.get('/:userId/parcels', (req, res) => {
  const userParcel = parcel.filter(x => x.userId === parseInt(req.params.userId, 10));
  // get all parcel orders with the userId
  if (!userParcel) res.status(404).json('Parcel does not exist');
  else {
    res.status(200).json({
      message: 'parcel orders you have created',
      Details: userParcel,
    });
  }
});
export default router;
