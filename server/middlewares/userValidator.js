import Joi from 'joi';
import db from '../models/db';

const signupValidation = async (req, res, next) => {
  try {
    const signupSchema = Joi.object({
      firstName: Joi.string().regex(/^[a-zA-Z]+$/i).min(3).max(50)
        .required(),
      lastName: Joi.string().regex(/^[a-zA-Z]+$/i).min(3).max(50)
        .required(),
      userName: Joi.string().min(3).max(50).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).max(50)
        .required(),
      password: Joi.string().alphanum().required(),
      phoneNumber: Joi.string().min(10),
    });

    const { error } = Joi.validate(req.body, signupSchema, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map(element => element.message);
      return res.status(400).json({
        success: false,
        error: errorMessage,
      });
    }
    const { email } = req.body;
    const validEmail = await db.query('select * from users where email = $1', [email]);
    if (validEmail.rowCount >= 1) {
      return res.status(400).json({
        success: false,
        error: 'email has already been registered',
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const loginValidation = async (req, res, next) => {
  try {
    const loginSchema = Joi.object({
      email: Joi.string().email({ minDomainAtoms: 2 }).max(50)
        .required(),
      password: Joi.string().alphanum().required(),
    });
    const { error } = Joi.validate(req.body, loginSchema, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map(element => element.message);
      return res.status(400).json({
        status: 400,
        error: errorMessage,
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


export { signupValidation, loginValidation };
