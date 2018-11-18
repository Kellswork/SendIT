import parcels from '../models/parcels';
import validateParcelOrder from '../middlewares/parcelOrder';

class ParcelOrder {
  static getAllParcelOrders(req, res) {
    if (parcels.length <= 0) {
      return res.status(404).json({
        success: false,
        error: 'No parcel delivery order has been created',
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
        error: 'Parcel delivery order does not exist',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Parcel delivery order details',
      details: oneParcel,
    });
  }

  static createParcelOrder(req, res) {
    const { error } = validateParcelOrder(req.body);
    if (error) {
      const errorMessage = error.details.map(element => element.message);
      return res.status(400).json({
        success: false,
        error: errorMessage,
      });
    }
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
    return res.status(201).json({
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
        error: 'Parcel does not exist',
      });
    } if (oneParcel.status === 'delivered') {
      return res.status(406).json({
        success: false,
        error: 'Cannot cancel a parcel delivery order that has already been delivered',
      });
    }
    if (oneParcel.status === 'cancelled') {
      return res.status(406).json({
        success: false,
        error: 'Parcel delivery order has already been cancelled',
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
