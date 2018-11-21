import Joi from 'joi';

const validateParcelOrder = (parcelOrder) => {
  const schema = {
    weight: Joi.number().required(),
    weightmetric: Joi.string().max(50).required(),
    price: Joi.number().required(),
    pickupAddress: Joi.string().min(10).max(250).required(),
    destinationAddress: Joi.string().min(10).max(250).required(),
    reciever: Joi.string().required(),
    phoneNumber: Joi.number().required(),
  };
  return Joi.validate(parcelOrder, schema, { abortEarly: false });
};

export default validateParcelOrder;
