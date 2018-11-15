import users from '../models/users';
import parcels from '../models/parcels';

class User {
  static getAllUsers(req, res) {
    if (users.length <= 0) {
      return res.json({
        success: false,
        message: 'No user found',
      });
    }
    return res.status(200).json({
      success: true,
      details: users,
    });
  }

  static getAllParcelOrderCreatedByUser(req, res) {
    const { userId } = req.params;
    const userParcel = parcels.filter(parcel => parcel.userId === parseInt(userId, 10));
    // get all parcel orders with the userId
    if (userParcel.length <= 0) {
      return res.status(404).json({
        success: false,
        message: 'You have not created any parcel develivery order',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Parcel delivery orders you have created',
      details: userParcel,
    });
  }
}

export default User;
