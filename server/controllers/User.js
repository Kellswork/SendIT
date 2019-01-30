import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../models/db';
import { userSignup, userDetails, fullName } from '../models/query';
import generateToken from '../middlewares/generateToken';

dotenv.config();

class User {
  static async createUser(req, res) {
    const {
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    try {
      const values = [firstName,
        lastName, userName, email, password, phoneNumber,
      ];
      const { rows } = await db.query(userSignup, values);
      const user = await db.query(userDetails, [email]);
      const name = await db.query(fullName, [email]);
      const token = generateToken(user, name, email);
      return res.header('x-auth-token', token).status(201).json({
        success: true,
        status: 201,
        data: {
          message: 'user was successfully created',
          token,
          user: rows[0],
        },
      });
    } catch (err) {
      console.log(err.toString());
      return res.status(500).json({
        status: 500,
        error: 'an error occured while creating user, please try again later',
      });
    }
  }

  static async userLogin(req, res) {
    const { email, password } = req.body;
    const userEmail = await db.query(userDetails, [email]);
    const userPassword = await bcrypt.compare(password, userEmail.rows[0].password);
    if ((!userEmail.rows[0]) && (!userPassword)) {
      return res.status(400).json({
        success: false,
        error: 'invalid email or password',
      });
    }

    const rows = await db.query(userDetails, [email]);
    const name = await db.query(fullName, [email]);
    const token = generateToken(rows, name, email);
    try {
      return res.header('x-auth-token', token).status(200).json({
        success: true,
        message: 'login successful',
        token,
        user: {
          id: rows.rows[0].id,
          username: rows.rows[0].username,
          email,
          admin: rows.rows[0].isadmin,
        },
      });
    } catch (err) {
      console.log(err.toString());
      return res.status(500).json({
        status: 500,
        error: 'an error occured while trying to login user, please try again later',
      });
    }
  }
}

export default User;
