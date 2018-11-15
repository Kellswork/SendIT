import Joi from 'joi';

function validateParcelOrder(parcelOrder) {
  const schema = {
    name: Joi.string().min(5).max(30).required(),
    productName: Joi.string().min(5).max(30).required(),
    pickupAddress: Joi.string().min(10).max(30).required(),
    destinationAddress: Joi.string().min(10).max(30).required(),
    status: Joi.string().required(),
  };
  return Joi.validate(parcelOrder, schema);
}

export default validateParcelOrder;
