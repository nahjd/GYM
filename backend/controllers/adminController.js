const adminModel = require("./../model/adminModel"); // Ensure adminModel is correctly defined

// Fetch all users
const getAllUser = async (req, res) => {
  try {
    const users = await adminModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

// Fetch user by ID
const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await adminModel.findOne({ _id: id });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

// Check if username exists
const checkUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await adminModel.findOne({ username });
    if (user) {
      res.status(200).json(user); // Return user data or just existence
    } else {
      res.status(404).json({ message: "Username not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error checking username" });
  }
};

const postUser = async (req, res) => {
  const user = req.body;
  try {
    // Debug: Log the received user data
    console.log("Received user data:", user);

    const findUserUsername = await adminModel.findOne({
      username: user.username,
    });
    const findUserEmail = await adminModel.findOne({ email: user.email });

    if (findUserUsername) {
      return res.status(400).send("This username is already used!");
    }
    if (findUserEmail) {
      return res.status(400).send("This email is already used!");
    }

    let newUser = new adminModel(user);
    await newUser.save();
    res.status(201).send({ message: "Register Successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred while registering the user.");
  }
};

// User login
const stella = async (req, res) => {
  const user = req.body;
  try {
    const findUser = await adminModel.findOne({
      username: user.username,
      password: user.password,
    });

    if (findUser) {
      res.status(200).json({ id: findUser._id }); // or return a token
    } else {
      res.status(401).send("Invalid Username or Password!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Update user details
const patchUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await adminModel.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

// Replace user details
const putUser = async (req, res) => {
  const id = req.params.id;
  try {
    const replaceUser = await adminModel.replaceOne({ _id: id }, req.body);
    res.status(200).json(replaceUser);
  } catch (error) {
    res.status(500).json({ error: "Error replacing user" });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  checkUsername, // Added route
  // postUser,
  stella,
  patchUser,
  putUser,
};
