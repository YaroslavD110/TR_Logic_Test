import path from "path";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";

import "regenerator-runtime/runtime"; // Library for normal work async/await

import { appPort, appName } from "./config"; // Import aplication port from config file
import User from "./User"; // Import class for work with user

// Create new express app
const app = express();
// Create new instance of User class
const user = new User();
// Path to static files
const staticPath = path.resolve("static");

// Middlewares
app.use(cors()); // Set up CORS mode (ONLY FOR DEVELOPMENT MODE)
app.use(express.static(staticPath)); // Set static directory for express
app.use(bodyParser.urlencoded({ extended: true })); // Set up body-parser urlencode
app.use(bodyParser.json()); // Set up body-parser to parse json
app.use(helmet()); // Middleware witch set up settings for app protection (http headers)

// Main get response with "index.html" file
app.get("/", (req, res) => res.sendFile(path.join(staticPath, "index.html")));

// User api routes
// Route for SignIn requests
app.post("/auth/sign-up", async (req, res) => {
  const newUser = await user.createUser(req.body); // Create new user
  if (!newUser.isError) {
    // Checking errors
    return res.status(200).send(newUser); // Return to client success response with new user info
  } else {
    // If index has index code for unique emil index
    if (newUser.error.name === "MongoError" && newUser.error.code === 11000) {
      return res // Send to client index whit this text
        .status(400)
        .send({ error: "User with this email has been registered!" });
    }
    // Sand to client index message by default
    return res.status(400).send({ error: "Invalid data!" });
  }
});

// Route for LogIn requests
app.post("/auth/log-in", async (req, res) => {
  // Check user existing in DB
  const newUser = await user.checkUserCorrectly(req.body);
  if (newUser) {
    // If user exist send response with user info
    return res.status(200).send(newUser);
  } else {
    // else send reject with index message
    return res.status(400).send({ error: "User not found!" });
  }
});

app.listen(appPort, () => {
  console.log(`${appName} is listening on port ${appPort}`);
});
