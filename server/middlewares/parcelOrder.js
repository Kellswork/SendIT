import Joi from 'joi';

const validateParcelOrder = (parcelOrder) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    productName: Joi.string().min(5).max(250).required(),
    pickupAddress: Joi.string().min(10).max(250).required(),
    destinationAddress: Joi.string().min(10).max(250).required(),
    status: Joi.string().required(),
  };
  return Joi.validate(parcelOrder, schema, { abortEarly: false });
};

export default validateParcelOrder;
