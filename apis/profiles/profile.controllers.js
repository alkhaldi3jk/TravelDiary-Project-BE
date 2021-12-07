const Profile = require("../../db/models/Profile");
const User = require("../../db/models/User");

exports.profileList = async (req, res, next) => {
  try {
    const profile = await User.find()
    // .populate("owner");
    res.json(profile).status(201);
  } catch (error) {
    next(error);
  }
};

exports.profileFetch = async (req, res, next) => {
  try {
    const profile = await User.findOne({ profile: req.user._id }).populate(
      "profile",
      ["name", "image"]
    );
    console.log(profile);

    res.status(200).json(profile);

    if (!profile) {
      // res.status(200).json(profile);
      const profile = await User.findOne({
        profile: req.user._id,
      }).User.create(req.body);
      // .populate("owner");

      res.status(200).json(profile);
    }
  } catch (error) {
    next(error);
    // return res.status(500).json({ message: error.message });
  }
};

exports.profileUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      // /media/imagename.jpg
      // req.body.image = `/${req.file.path}`;
      req.body.image = `/${req.file.path}`;
    }
    // req.body.user = req.user._id;
    const updatedProfile = await User.findOneAndUpdate(req.body);
    await updatedProfile.populate({
      path: "profile",
      select: "name",
    });
    
    return res.status(201).json(updatedProfile);
  } catch (error) {
    console.log(error);
  }
};
