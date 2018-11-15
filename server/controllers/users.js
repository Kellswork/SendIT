import user from '../models/users';
import parcel from '../models/parcel';

class User {
  static getAllUsers(req, res) {
    if (!user || user === null) {
      return res.json({
        message: 'No user found',
      });
    }
    return res.status(200).json(user);
  }

  static getAllParcelOrderCreatedByUser(req, res) {
    const userParcel = parcel.filter(x => x.userId === parseInt(req.params.userId, 10));
    // get all parcel orders with the userId
    if (!userParcel) return res.status(404).json('Parcel does not exist');
    return res.status(200).json({
      message: 'parcel orders you have created',
      Details: userParcel,
    });
  }
}

export default User;
