import express from 'express';
import parcel from '../models/parcel';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: ' Parcel orders',
    parcel,
  });
});

router.get('/:id', (req, res) => {
  const oneParcel = parcel.find(x => x.id === parseInt(req.params.id, 10));
  if (!oneParcel) res.status(404).json('Parcel does not exist');
  else {
    res.status(200).json({
      message: 'parcel order',
      Details: oneParcel,
    });
  }
});

export default router;
