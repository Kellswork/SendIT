import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.status(200).json('Welcome to SendIT courier service'));

// router.all('*', (req, res) => {
//   res.status(404)
//     .json({
//       success: false,
//       message: 'Page Not Found',
//     });
// });

export default router;
