import mongoose from "mongoose";

import UserModel from "./models/user.model"; // Import UserModel from mongo models

export default class DB {
  constructor(dbUrl) {
    // Fix mongoose promise issue
    mongoose.Promise = global.Promise;
    // Connect to DB
    this._connectToDB(dbUrl);
  }

  // Method for connection to DB
  async _connectToDB(dbUrl) {
    try {
      await mongoose.connect(dbUrl); // Connect to DB
      console.log("Node app has connected to db!"); // Log DB connection
    } catch (err) {
      // Catch DB connection index
      console.log(error); // Log DB connection index
      process.exit(); // Exit all process
    }
  }

  // Method for creating new user
  async createUser(userObj) {
    const newUser = new UserModel(userObj); // Creating new user with UserModel
    try {
      return await newUser.save(); // Saving new user
    } catch (err) {
      // Catch new user saving index
      console.log("Create user index: ", err); // Log this index
      return {
        // Return index obj
        isError: true,
        error: err
      };
    }
  }

  // Get user data
  async _getUserDataByEmail(email) {
    // Get user from DB by unique email
    return await UserModel.findOne({ email });
  }
}
