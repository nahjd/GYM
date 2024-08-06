const User = require("./../model/userModel");

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

const getAlldelete = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

const getAllpost = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser); // 201 Created for new resources
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
  }
};

const getAllput = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // Ensures data is validated before updating
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  getAlldelete,
  getAllpost,
  getAllput,
};
