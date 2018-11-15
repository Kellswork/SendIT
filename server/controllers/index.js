import parcel from '../models/parcel';

class ParcelOrder {
  static getAllparcelOrders(req, res) {
    if (!parcel || parcel === null) {
      return res.status(404).json({
        success: false,
        Message: 'No parcel delivery order has been created',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Parcel delivery orders',
      parcel,
    });
  }

  static getOneParcelOrder(req, res) {
    const oneParcel = parcel.find(x => x.id === parseInt(req.params.id, 10));
    if (!oneParcel) {
      return res.status(404).json({
        Success: false,
        message: 'Parcel delivery order does not exist',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Parcel delivery order details',
      details: oneParcel,
    });
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
      success: true,
      message: 'Parcel delivery order created successfully',
      details: newParcel,
    });
  }

  static cancelParcelOrder(req, res) {
    const oneParcel = parcel.find(x => x.id === parseInt(req.params.id, 10));
    if (!oneParcel) {
      return res.status(404).json({
        success: false,
        message: 'Parcel does not exist',
      });
    }
    oneParcel.status = 'cancelled';
    return res.status(200).json({
      success: true,
      message: 'Your parcel delivery order has been cancelled',
      details: oneParcel,
    });
  }
}

export default ParcelOrder;
