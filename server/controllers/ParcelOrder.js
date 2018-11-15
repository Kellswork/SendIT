import parcels from '../models/parcels';

class ParcelOrder {
  static getAllParcelOrders(req, res) {
    if (parcels.length <= 0) {
      return res.status(404).json({
        success: false,
        message: 'No parcel delivery order has been created',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Parcel delivery orders',
      parcels,
    });
  }

  static getOneParcelOrder(req, res) {
    const { id } = req.params;
    const oneParcel = parcels.find(parcel => parcel.id === parseInt(id, 10));
    if (!oneParcel) {
      return res.status(404).json({
        success: false,
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
    const {
      name, productName, pickupAddress, destinationAddress,
    } = req.body;
    const newParcel = {
      id: parcels[parcels.length - 1].id + 1,
      name,
      productName,
      pickupAddress,
      destinationAddress,
    };
    parcels.push(newParcel);
    res.status(201).json({
      success: true,
      message: 'Parcel delivery order created successfully',
      details: parcels,
    });
  }

  static cancelParcelOrder(req, res) {
    const { id } = req.params;
    const oneParcel = parcels.find(parcel => parcel.id === parseInt(id, 10));
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
