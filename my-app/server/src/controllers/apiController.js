const Data = require("../models/dataModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const env = require("../config/envConfig");

const secretKey = env.secretKey || "defaultSecretKey";
// ----------------------user---------------------------------------
exports.signUp = async (req, res) => {
  try {
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist === null) {
      const newData = await User.create(req.body);
      return res.status(200).json(newData);
    } else {
      return res
        .status(204)
        .json({ message: " user with this email already exist" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      const token = jwt.sign(
        { email: user.email, name: user.name, phoneNumber: user.phoneNumber },
        secretKey,
        { expiresIn: "1d", algorithm: "HS256" }
      );
      return res.json({
        token,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.verifyUser = async (req, res) => {
  const tokenHeader = req.headers["authorization"] || null;
  const token = (tokenHeader && tokenHeader.split(" ")[1]) || null;
  if (token == null) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey, { algorithm: "HS256" });
    req.user = decodedToken;
    return res.status(200).send(true);
  } catch (error) {
    return res.status(401).send(false);
  }
};
//-----------------------data--------------------------------------
exports.getData = async (req, res) => {
  try {
    const data = await Data.find({ email: req.user.email });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createData = async (req, res) => {
  req.body.email = req.user.email;
  const newData = new Data(req.body);
  try {
    await newData.save();
    res.status(200).json(newData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateData = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedData = await Data.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    await Data.findByIdAndDelete(id);
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
