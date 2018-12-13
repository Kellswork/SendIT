import db from '../models/db';
import {
  parcel, createParcel, userParcel, getParcel, cancelParcel,
  updateDestination, updateLocation, updateStatus,
} from '../models/parcelQuery';

class Parcel {
  static async createParcelDeliveryOrder(req, res) {
    const {
      name, weight, weightmetric, pickupAddress, destinationAddress, reciever, phoneNumber,
    } = req.body;
    const price = Math.round(weight * 500);
    const values = [name, req.userData.id, weight, weightmetric, price,
      pickupAddress, destinationAddress, reciever, phoneNumber];

    const { rows } = await db.query(createParcel, values);

    try {
      return res.status(201).json({
        success: true,
        message: 'order created',
        parcel: rows[0],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.stack,
      });
    }
  }

  static async getAllParcelDeliveryOrders(req, res) {
    const result = await db.query(getParcel);
    if (result.rowCount < 1) {
      return res.status(404).json({
        success: false,
        error: 'no parcel delivery order has been placed yet',
      });
    }
    try {
      return res.status(200).json({
        success: true,
        message: `${result.rowCount} orders found`,
        parcels: result.rows,
      });
    } catch (error) {
      return res.status(500).send('an error occured while getting parcel delivery orders, please try again later');
    }
  }

  static async getOneParcelDeliveryOrder(req, res) {
    const { id } = req.params;
    const { rows } = await db.query(parcel, [id]);
    if (!rows[0]) {
      return res.status(404).json({
        success: false,
        error: 'could not find parcel delivery order',
      });
    }
    if (req.userData.id !== rows[0].placedby && req.userData.admin === false) {
      console.log(`${req.userData.id}, ${rows[0].placedby}, ${req.userData.admin}`);
      return res.status(403).json({
        success: false,
        error: 'You cannot see the details of this parcel delivery order',
      });
    }
    try {
      return res.status(200).json({
        success: true,
        parcel: rows[0],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.stack,
      });
    }
  }

  static async getUserParcelDeliveryOrders(req, res) {
    const { rows } = await db.query(userParcel, [req.params.id]);
    if ((parseInt(req.params.id, 10) !== req.userData.id) && (req.userData.admin === false)) {
      return res.status(403).json({
        success: false,
        error: 'Access denied',
      });
    }
    if (rows.length < 1) {
      return res.status(404).json({
        success: false,
        error: 'You have not created any parcel delivery order',
      });
    }
    try {
      return res.status(200).json({
        success: true,
        parcels: rows,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'an error occured while processing your request',
      });
    }
  }

  static async cancelParcelDeliveryOrder(req, res) {
    const { id } = req.params;
    const { rows } = await db.query(parcel, [id]);
    if (rows.length < 1) {
      return res.status(404).json({
        success: false,
        error: 'parcel not found',
      });
    }

    if (req.userData.id !== rows[0].placedby) {
      return res.status(403).json({
        success: false,
        error: 'you cannot cancel a parcel delivery order you did not create.',
      });
    }
    if (rows[0].status === 'cancelled') {
      return res.status(406).json({
        success: false,
        error: 'your parcel delivery order has already been cancelled.',
      });
    }
    if (rows[0].status === 'delivered') {
      return res.status(406).json({
        success: false,
        error: 'you cannot cancel a parcel delivery order that has already been delivered.',
      });
    }
    await db.query(cancelParcel, ['cancelled', id]);
    const result = await db.query(parcel, [id]);
    try {
      res.status(200).json({
        success: true,
        message: 'your order has been cancelled',
        status: result.rows[0],
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
    const { rows } = await db.query(parcel, [id]);
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'parcel not found',
      });
    }
    if (req.userData.id !== rows[0].placedby) {
      return res.status(403).json({
        status: 403,
        error: 'you cannot change the destination address of a parcel delivery order you did not create.',
      });
    }
    if (rows[0].status === 'cancelled') {
      return res.status(406).json({
        success: false,
        error: 'this order has been cancelled',
      });
    }
    if (destinationAddress === '' || destinationAddress.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'please input destination address',
      });
    }

    await db.query(updateDestination, [destinationAddress, id]);
    const result = await db.query('SELECT * from parcels where id=$1', [id]);
    try {
      res.status(200).json({
        success: true,
        message: 'parcel delivery order destination address has been updated',
        parcel: result.rows[0],
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'an error occured while processing your request',
      });
    }
  }

  static async updateParcelCurrentLocation(req, res) {
    const { id } = req.params;
    const { currentLocation } = req.body;
    const { rows } = await db.query(parcel, [id]);
    if (!rows[0]) {
      return res.status(404).json({
        success: false,
        error: 'parcel not found',
      });
    }

    if (currentLocation === '' || currentLocation.length < 3) {
      return res.status(400).json({
        success: false,
        error: 'please input current location address',
      });
    }

    await db.query(updateLocation, [currentLocation, id]);
    const result = await db.query('SELECT * from parcels where id=$1', [id]);
    try {
      res.status(200).json({
        success: true,
        message: 'parcel delivery order current location has been updated',
        data: result.rows[0],
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'an error occured while processing your request',
      });
    }
  }

  static async updateParcelDeliveryOrderStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const { rows } = await db.query(parcel, [id]);
    if (!rows[0]) {
      return res.status(404).json({
        success: false,
        error: 'parcel not found',
      });
    }
    if (rows[0].status === 'cancelled') {
      return res.status(400).json({
        success: false,
        error: 'order has already been cancelled',
      });
    }
    if (rows[0].status === 'delivered') {
      return res.status(400).json({
        success: false,
        error: 'order has already been delivered',
      });
    }
    await db.query(updateStatus, [status, id]);
    const result = await db.query(parcel, [id]);
    try {
      res.status(200).json({
        success: true,
        message: 'parcel order status has been updated',
        status: result.rows[0],
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'an error occured while processing your request',
      });
    }
  }
}
export default Parcel;
