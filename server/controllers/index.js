import parcel from '../models/parcel';

class Parcelorder {
  static getAllparcelOrders(req, res) {
    res.status(200).json({
      message: ' Parcel orders',
      parcel,
    });
  }

  static getOneParcelOrder(req, res) {
    const oneParcel = parcel.find(x => x.id === parseInt(req.params.id, 10));
    if (!oneParcel) res.status(404).json('Parcel does not exist');
    else {
      res.status(200).json({
        message: 'parcel order',
        Details: oneParcel,
      });
    }
  }

  static createParcelOrder(req, res) {
    const newParcel = {
      id: parcel.length + 1,
      name: req.body.name,
      productName: req.body.productName,
      pickupAddress: req.body.pickupAddress,
      destinationAddress: req.body.destinationAddress,
    };
    parcel.push(newParcel);
    res.status(201).json({
      message: 'Parcel order successfully created',
      Details: newParcel,
    });
  }

  static cancelParcelOrder(req, res) {
    const oneParcel = parcel.find(x => x.id === parseInt(req.params.id, 10));
    if (!oneParcel) return res.status(404).json('Parcel does not exist');
    oneParcel.status = 'canceled';
    return res.status(200).json({
      message: 'Your parcel delivery order has been canceled',
      Details: oneParcel,
    });
  }
}

export default Parcelorder;
