import user from '../models/users';
import parcel from '../models/parcel';

class User {
  static getAllUsers(req, res) {
    if (!user || user === null) {
      return res.json({
        success: false,
        message: 'No user found',
      });
    }
    return res.status(200).json(user);
  }

  static getAllParcelOrderCreatedByUser(req, res) {
    const userParcel = parcel.filter(x => x.userId === parseInt(req.params.userId, 10));
    // get all parcel orders with the userId
    if (!userParcel || userParcel === null) return res.status(404).json('You have not created any parcel delivery order');
    return res.status(200).json({
      success: true,
      message: 'Parcel delivery orders you have created',
      details: userParcel,
    });
  }
}

export default User;
