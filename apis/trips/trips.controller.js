const Trip = require("../../db/models/Trip");

// exports.fetchTrip = async (tripId, next) => {
//   try {
//     const trip = await Trip.findById(tripId);
//     return trip;
//   } catch (error) {
//     // next(error);
//     console.log(error)
//   }
// };

exports.tripListFetch = async (req, res, next) => {
    try {
      const trips = await Trip.find().populate("products");
      return res.json(trips);
    } catch (error) {
      next(error);
      // return res.status(500).json({ message: error.message });
    }
  };

  exports.tripCreate = async (req, res, next) => {
    try {
      if (req.file) {
        // /media/imagename.jpg
        // req.body.image = `/${req.file.path}`;
        req.body.image = `/${(req.file.path)}`;
      }
      req.body.owner = req.user._id;
      const newTrip = await Trip.create(req.body);
      await newTrip.populate({
        path: "owner",
        select: "username",
      });
      return res.status(201).json(newTrip);
    } catch (error) {
      next(error);
    }
  };
  