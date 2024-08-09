const adminModel = require("./../model/adminModel");

const getAllUser = async (req, res) => {
  try {
    const users = await adminModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const user = await adminModel.findOne({ _id: id });
  res.send(user);
};

const postUser = async (req, res) => {
  const user = req.body;
  try {
    let findUserUsername = await adminModel.findOne({
      username: user.username,
    });
    let findUserEmail = await adminModel.findOne({ email: user.email });
    if (findUserUsername) {
      return res.status(400).send("This username is already used!");
    }
    if (findUserEmail) {
      return res.status(400).send("This email is already used!");
    }
    let newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).send({
      message: "Register Successful!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred while registering the user.");
  }
};

const login = async (req, res) => {
  const user = req.body;
  try {
    let findUser = await adminModel.findOne({
      username: user.username,
      password: user.password,
    });
    if (findUser) {
      res.status(200).send(findUser._id);
    } else {
      res.status(401).send("Invalid Username or Password!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const patchUser = async (req, res) => {
  const id = req.params.id;
  let updateUser = await adminModel.findOneAndUpdate({ _id: id }, req.body);
  res.send(updateUser);
};

const putUser = async (req, res) => {
  const id = req.params.id;
  let replaceUser = await adminModel.replaceOne({ _id: id }, req.body);
  res.send(replaceUser);
};

module.exports = {
  getAllUser,
  getUserById,
  postUser,
  login,
  patchUser,
  putUser,
};
