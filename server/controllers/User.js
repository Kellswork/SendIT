import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import validateUser from '../middlewares/user';
import db from '../models/db/index';
import validateUserLogin from '../middlewares/login';

dotenv.config();

class User {
  static async createUser(req, res) {
    const {
      firstname, lastname, username, email,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const { error } = validateUser(req.body);
    if (error) {
      const errorMessage = error.details.map(element => element.message);
      return res.status(400).json({
        status: 400,
        error: errorMessage,
      });
    }
    const result = await db.query('SELECT * FROM users where email =$1', [email]);
    if (result.rowCount >= 1) {
      return res.status(400).json({
        status: 400,
        error: 'email has already been registered',
      });
    }

    try {
      const { rows } = await db.query('INSERT INTO users(firstname, lastname, email, username, password) VALUES($1,$2,$3,$4,$5) RETURNING *', [firstname, lastname, email, username, password]);

      const userId = await db.query('SELECT id FROM users WHERE email = $1', [email]);
      const admin = await db.query('SELECT is_admin FROM users WHERE email = $1', [email]);
      const name = await db.query('SELECT firstname ||\' \'|| lastname as name FROM users WHERE email=$1', [email]);
      const token = jwt.sign({
        id: userId.rows[0],
        name: name.rows[0],
        email,
        admin: admin.rows[0],
      }, process.env.JWT_SECRET_KEY, { expiresIn: '6h' });

      return res.header('x-auth-token', token).status(201).json({
        status: 201,
        message: 'user was successfully created',
        data: rows,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'an error occured while creating user, please try again later',
      });
    }
  }

  static async userLogin(req, res) {
    const { email, password } = req.body;
    const { error } = validateUserLogin(req.body);
    if (error) {
      const errorMessage = error.details.map(element => element.message);
      return res.status(400).json({
        status: 400,
        error: errorMessage,
      });
    }
    const userEmail = await db.query('SELECT email FROM users WHERE email = $1', [email]);
    if (!userEmail.rows[0]) {
      return res.status(400).json({
        status: 400,
        error: 'invalid email or password',
      });
    }
    let { rows } = await db.query('SELECT password FROM users WHERE email = $1', [email]);
    const userPassword = await bcrypt.compare(password, rows[0].password);
    if (!userPassword) {
      return res.status(400).json({
        status: 400,
        error: 'invalid username or password',
      });
    }
    rows = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const userId = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    const admin = await db.query('SELECT is_admin FROM users WHERE email = $1', [email]);
    const name = await db.query('SELECT firstname ||\' \'|| lastname as name FROM users WHERE email=$1', [email]);

    const token = jwt.sign({
      id: userId.rows[0],
      name: name.rows[0],
      email,
      admin: admin.rows[0],
    }, process.env.JWT_SECRET_KEY, { expiresIn: '6h' });
    try {
      return res.header('x-auth-token', token).status(200).json({
        status: 200,
        message: 'login successful',
        data: [rows.rows[0]],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'an error occured while trying to login user, please try again later',
      });
    }
  }
}

export default User;
