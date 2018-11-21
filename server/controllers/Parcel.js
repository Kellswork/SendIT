import db from '../models/db/index';
import validateParcelOrder from '../middlewares/parcel';

class Parcel {
  static async getAllParcelDeliveryOrders(req, res) {
    const result = await db.query('SELECT * FROM parcels LIMIT 5');
    if (result.rowCount < 1) {
      return res.status(404).json({
        status: 404,
        error: 'no parcel delivery order has been placed yet',
      });
    }
    try {
      return res.status(200).json({
        status: 200,
        data: [{
          message: `${result.rowCount} orders found`,
          parcels: result.rows,
        }],
      });
    } catch (error) {
      return res.status(500).send('an error occured while getting parcel delivery orders, please try again later');
    }
  }

  static async getOneParcelDeliveryOrder(req, res) {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM parcels WHERE id = $1', [id]);
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'could not find parcel delivery order',
      });
    }
    if (req.userData.id !== rows[0].user_id || req.userData.admin === false) {
      return res.status(403).json({
        status: 403,
        error: 'You cannot see the details of this parcel delivery order',
      });
    }
    try {
      return res.status(200).json({
        status: 200,
        data: [{
          parcel: rows[0],
        }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'an error occured while processing your request',
      });
    }
  }

  static async createParcelDeliveryOrder(req, res) {
    const {
      weight, weightmetric, price, pickupAddress, destinationAddress, reciever, phoneNumber,
    } = req.body;
    const { error } = validateParcelOrder(req.body);
    if (error) {
      const errorMessage = error.details.map(element => element.message);
      return res.status(400).json({
        status: 400,
        error: errorMessage,
      });
    }
    const { rows } = await db.query('INSERT INTO parcels( placed_by, weight, weightmetric, price, pickupaddress, destinationaddress, reciever, phonenumber) VALUES($1,$2,$3,$4,$5,$6,$7, $8) RETURNING *', [req.userData.id.id, weight, weightmetric, price, pickupAddress, destinationAddress, reciever, phoneNumber]);

    try {
      return res.status(201).json({
        status: 201,
        data: [{
          message: 'order created',
          parcel: rows[0],
        }],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'an error occured while processing your request',
      });
    }
  }
}
export default Parcel;