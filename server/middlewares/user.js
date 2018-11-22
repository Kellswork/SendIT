import Joi from 'joi';

const validateUser = (user) => {
  const schema = {
    firstname: Joi.string().min(3).max(50).required(),
    lastname: Joi.string().min(3).max(50).required(),
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().max(50)
      .required(),
    password: Joi.string().alphanum().required(),
    phoneNumber: Joi.string().min(10).required(),
  };
  return Joi.validate(user, schema, { abortEarly: false });
};

export default validateUser;
