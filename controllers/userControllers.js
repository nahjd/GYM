const User = require("./../model/userModel");

const getAlldata = async (req, res) => {
  try {
    const found = await User.find({});
    res.send(found);
  } catch (error) {
    res.status(500).send({ error: "Error fetching data" });
  }
};

const getAlldelete = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(deleted);
  } catch (error) {
    res.status(500).send({ error: "Error deleting user" });
  }
};

const getAllpost = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    res.status(500).send({ error: "Error creating user" });
  }
};

module.exports = {
  getAlldata,
  getAlldelete,
  getAllpost,
};
