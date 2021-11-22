const Trip = require("../../db/models/Trip");

exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findById(tripId);
    return trip;
  } catch (error) {
    // next(error);
    console.log(error)
  }
};

exports.tripListFetch = async (req, res, next) => {
    try {
      const trips = await Trip.find()
      // .populate("user");
      return res.json(trips);
    } catch (error) {
      console.log(error)
      // next(error);
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
      console.log(error)
      // next(error);
    }
  };
  
  exports.tripUpdate = async (req, res, next) => {
    try {
      if (req.file) {
        req.body.image = `/${req.file.path}`;
      }
      const trip = await Trip.findByIdAndUpdate(
        req.trip,
        req.body,
        { new: true, runValidators: true } // returns the updated product
      )
      // .populate("user");
      return res.status(200).json(trip);
    } catch (error) {
      console.log(error)
      // next(error);
    }
  };
  
  exports.tripDelete = async (req, res, next) => {
    try {
      await req.trip.remove();
      res.status(204).end();
    } catch (error) {
      console.log(error)
      // next(error);
    }
  };