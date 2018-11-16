import users from '../models/users';
import parcels from '../models/parcels';

class User {
  static getAllUsers(req, res) {
    if (users.length <= 0) {
      return res.status(404).json({
        success: false,
        error: 'No user found',
      });
    }
    return res.status(200).json({
      success: true,
      details: users,
    });
  }

  static getOneUser(req, res) {
    const { userId } = req.params;
    const oneUser = users.find(user => user.userId === parseInt(userId, 10));
    if (!oneUser) {
      return res.status(404).json({
        success: false,
        error: 'User does not exists',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User Details',
      details: oneUser,
    });
  }

  static getAllParcelOrderCreatedByUser(req, res) {
    const { userId } = req.params;
    const userParcel = parcels.filter(parcel => parcel.userId === parseInt(userId, 10));

    if (userParcel.length <= 0) {
      return res.status(404).json({
        success: false,
        error: 'You have not created any parcel delivery order',
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
