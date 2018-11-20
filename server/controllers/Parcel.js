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

  static async getOneParcelDeliveryOrder(req, res) {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM parcels WHERE id = $1', [id]);
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'could not find parcel delivery order',
      });
    }
    if (req.userData.id.id !== rows[0].user_id || req.userData.admin.is_admin === false) {
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
}
export default Parcel;
