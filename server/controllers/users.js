import user from '../models/users';
import parcel from '../models/parcel';

class Users {
  static getAllUsers(req, res) {
    res.status(200).send(user);
  }

  static getAllParcelOrderCreatedByUser(req, res) {
    const userParcel = parcel.filter(x => x.userId === parseInt(req.params.userId, 10));
    // get all parcel orders with the userId
    if (!userParcel) res.status(404).json('Parcel does not exist');
    else {
      res.status(200).json({
        message: 'parcel orders you have created',
        Details: userParcel,
      });
    }
  }
}

export default Users;
