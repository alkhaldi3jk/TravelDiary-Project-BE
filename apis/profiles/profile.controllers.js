const Profile = require("../../db/models/Profile");
const User = require("../../db/models/User");





exports.profileList=async(req,res,next)=>{
    try {
        const profile = await Profile.find();
        res.json(profile).status(201)

    } catch (error) {
        next(error)
    }
}

exports.profileFetch = async (req, res, next) => {
  try {
    // var user = req.body.user._id;
    const profile = await Profile.findOne( {_id: req.user._id} );
    //   .populate("user",['name']);
    if (!profile) {
      return res.status(400).json({ msg: "the is no profile" });
    }
    return res.status(200).json(profile);
  } catch (error) {
    next(error);
    // return res.status(500).json({ message: error.message });
  }
};
