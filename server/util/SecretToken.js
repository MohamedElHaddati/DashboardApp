import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const TOKEN_KEY = process.env.TOKEN_KEY ;

export const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn:  3 *  24 *  60 *  60,
  });
};