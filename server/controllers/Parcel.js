import db from '../models/db/index';

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
}
export default Parcel;
