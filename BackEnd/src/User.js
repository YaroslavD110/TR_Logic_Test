import striptags from "striptags"; // Function for cleaning string from html tags

import DB from "./DB"; // Import class for working with DB
import { dbUrl } from "./config"; // Import DB url from config file

export default class User extends DB {
  constructor() {
    // Send DB url to father class constructor
    super(dbUrl);
  }

  // Check user user correctly
  async checkUserCorrectly(userObj) {
    // Search user with same email
    const user = await this._getUserDataByEmail(userObj.email);
    // Check if user with this email exist
    if (user) {
      // Check user password
      const isCorrect = await user.comparePassword(userObj.password);
      // If password correct - return user data
      if (isCorrect) return user;
    }
    return null;
  }

  // Method witch create new user
  createUser(values) {
    // Empty obj for cleaned values
    let cleanValues = {};
    // Start loop by values from props
    Object.values(values).map((value, index) => {
      // Add to cleanValue obj cleaned values
      cleanValues[Object.keys(values)[index]] = striptags(value);
    });
    // Return method from parent class witch will add user to DB
    return super.createUser(cleanValues);
  }
}
