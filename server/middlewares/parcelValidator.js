import Joi from 'joi';

const createOrderValidation = (req, res, next) => {
  try {
    const schema = {
      name: Joi.string().min(10).max(250).required(),
      weight: Joi.number().min(0).max(500).required(),
      weightmetric: Joi.string().max(50).required(),
      pickupAddress: Joi.string().min(10).max(250).required(),
      destinationAddress: Joi.string().min(10).max(250).required(),
      reciever: Joi.string().required(),
      phoneNumber: Joi.string().required(),
    };
    const { error } = Joi.validate(req.body, schema, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map(element => element.message);
      return res.status(400).json({
        success: false,
        error: errorMessage,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const updateStatusValidation = (req, res, next) => {
  try {
    const schema = {
      status: Joi.string().regex(/[a-zA-Z]*$/).valid(['delivered', 'transiting', 'pending']).required(),
    };
    const { error } = Joi.validate(req.body, schema, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export { createOrderValidation, updateStatusValidation };
