import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Set salt rounds
const SALT_WORK_FACTOR = 10;
// Get mangoose schema instance
const Schema = mongoose.Schema;
// Create new mangoose schema
const userSchema = new Schema({
  name: { type: String, required: true }, // User name
  surname: { type: String, required: true }, // User surname
  email: { type: String, required: true, index: { unique: true } }, // User email
  password: { type: String, required: true } // User password
});

// Set up user schema crypting password before save
userSchema.pre("save", function(next) {
  // Get user scheme instance
  const currentUser = this;
  // Only hash the password if it has been modified (or is new)
  if (!currentUser.isModified("password")) return next();
  // Generate a salt for crypting passwrod
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    // Hash the password along with our new salt
    bcrypt.hash(currentUser.password, salt, (err, hash) => {
      if (err) return next(err);
      // Override the cleartext password with the hashed one
      currentUser.password = hash;
      next();
    });
  });
});

// Add method for comparing passwords
userSchema.methods.comparePassword = function(password) {
  // Compare password with using bcrypt library
  return bcrypt.compare(password, this.password);
};

// Export user scheme default from this file
export default mongoose.model("User", userSchema);
