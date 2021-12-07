const User = require("../../db/models/User");
const Profile = require("../../db/models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS, // number in milliseconds
  };

  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;

    const newUser = await User.create(req.body);
    // .populate('profile')
    console.log(newUser);
    // req.body.owner = req.user._id;
    // const newProfile = await Useer.Profile.create(req.body);
    // console.log(newProfile);

    const token = generateToken(newUser);

    res.status(201).json({ token, newUser });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res, next) => {
  // passport passed user through req.user
  const token = generateToken(req.user);
  res.json({ token });
};
