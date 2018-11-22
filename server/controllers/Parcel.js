import db from '../models/db';
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
    if (req.userData.id !== rows[0].placed_by || req.userData.admin === false) {
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
    const { rows } = await db.query('INSERT INTO parcels( placed_by, weight, weightmetric, price, pickup_address, destination_address, reciever, phone_number) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [req.userData.id, weight, weightmetric, price, pickupAddress, destinationAddress, reciever, phoneNumber]);

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

  static async getUserParcelDeliveryOrders(req, res) {
    const { rows } = await db.query('select * from parcels where placed_by = $1', [req.userData.id]);
    if ((parseInt(req.params.id, 10) !== req.userData.id) && (!req.userData.admin)) {
      return res.status(403).json({
        status: 403,
        error: 'Access denied',
      });
    }
    if (rows.length < 1) {
      return res.status(404).json({
        status: 404,
        error: 'You have not created any parcel delivery order',
      });
    }
    try {
      return res.status(200).json({
        status: 200,
        data: [{
          parcels: rows,
        }],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'an error occured while processing your request',
      });
    }
  }

  static async cancelParcelDeliveryOrder(req, res) {
    const { id } = req.params;
    const { rows } = await db.query('select * from parcels where id = $1', [id]);
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'parcel not found',
      });
    }

    if (req.userData.id !== rows[0].placed_by) {
      return res.status(403).json({
        status: 403,
        error: 'you cannot cancel a parcel delivery order you did not create.',
      });
    }
    if (rows[0].status === 'cancelled') {
      return res.status(406).json({
        status: 406,
        error: 'your parcel delivery order has already been cancelled.',
      });
    }
    if (rows[0].status === 'delivered') {
      return res.status(406).json({
        status: 406,
        error: 'you cannot cancel a parcel delivery order that has already been delivered.',
      });
    }
    await db.query('UPDATE parcels SET status = $1 WHERE id = $2', ['cancelled', id]);
    const result = await db.query('SELECT * from parcels where id=$1', [id]);
    try {
      res.status(200).json({
        status: 200,
        data: [{
          id: result.rows[0].id,
          message: 'your order has been cancelled',
          status: result.rows[0],
        }],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'an error occured while processing your request',
      });
    }
  }

  static async updateParcelDestinationAddress(req, res) {
    const { id } = req.params;
    const { destinationAddress } = req.body;
    const { rows } = await db.query('select * from parcels where id = $1', [id]);
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'parcel not found',
      });
    }

    if (req.userData.id !== rows[0].placed_by) {
      return res.status(403).json({
        status: 403,
        error: 'you cannot change the destination address of a parcel delivery order you did not create.',
      });
    }

    if (destinationAddress === '') {
      return res.status(400).json({
        status: 400,
        error: 'please input destination address',
      });
    }

    await db.query('UPDATE parcels SET destination_address = $1 WHERE id = $2', [destinationAddress, id]);
    const result = await db.query('SELECT * from parcels where id=$1', [id]);
    try {
      res.status(200).json({
        status: 200,
        data: [{
          id: result.rows[0].id,
          message: 'parcel delivery order destination address has been updated',
          destinationAddress: result.rows[0].destinationAddress,
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
