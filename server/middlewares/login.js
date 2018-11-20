import Joi from 'joi';

const validateUserLogin = (user) => {
  const schema = {
    email: Joi.string().email().max(50)
      .required(),
    password: Joi.string().alphanum().required(),
  };
  return Joi.validate(user, schema, {
    abortEarly: false,
  });
};

export default validateUserLogin;
