import { UserModel } from "../models/user_model.js";
import { userSchema } from "../schema/user_schema.js";
import * as bcrypt from "bcrypt";

export const signUp = async (req, res, next) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    //   Checking if user is already in database
    const email = value.email;

    const findIfUserExist = await UserModel.findOne({ email });
    if (findIfUserExist) {
      return res.status(401).send("User is already registered");
    } else {
      const hashedPassword = bcrypt.hashSync(value.password, 12);
      value.password = hashedPassword;

      const addUser = await UserModel.create(value);
      return res.status(201).send("User registered successfully");
    }
  } catch (error) {
    next(error);
  }
};


export const logout = async(req, res, next) => {
  try { 
   // Check if session exists
   if (!req.session) {
    return res.sendStatus(404); // Not Found if session does not exist
  }
    req.session.destroy();

    res.status(200).json({message: 'Logged Out Successfully'});
  } catch (error) {
    next(error);
  }
}