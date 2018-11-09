import express from 'express';
import parcel from '../models/parcel';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: ' Parcel orders',
    parcel,
  });
});

export default router;
