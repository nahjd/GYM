const User = require("./../model/userModel");

const getAllUser = async (req, res) => {
  try {
    const found = await User.find({});
    res.send(found);
  } catch (error) {
    res.status(500).send({ error: "Error fetching data" });
  }
};
const getUserById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const user = await UserModel.findOne({ _id: id });
  res.send(user);
};

// const login = async (req, res) => {
//   const user = req.body;

//   try {
//     let findUser = await UserModel.findOne({
//       username: user.username,
//       password: user.password,
//     });
//     if (findUser) {
//       res.status(200).send(findUser._id);
//     } else {
//       res.status(201).send("Invalid Username or Password!");
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// };

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
  getAllUser,
  getUserById,
  // login,
  getAlldelete,
  getAllpost,
};
