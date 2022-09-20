const Sauce = require("../models/sauceModel");

exports.createSauce = (req, res, next) => {
  console.log({ image: req.file, data: req.body.sauce });
  const data = JSON.parse(req.body.sauce);

  const imageUrl = `http://localhost:3000/images/${req.file.filename}`;

  const sauce = new Sauce({
    userId: req.user.userId,
    name: data.name,
    manufacturer: data.manufacturer,
    description: data.description,
    mainPepper: data.mainPepper,
    imageUrl,
    heat: data.heat,
  });

  sauce
    .save()
    .then(() => {
      res.status(201).json({
        message: "Sauce saved successfully!",
      });
    })

    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// find one sauce

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Update a Sauce

exports.ModifySauce = (req, res, next) => {
  const sauce = new Sauce({
    //_Id: req.user._id,
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
  });
  Sauce.updateOne({ _Id: req.params.id }, sauce)
    .then(() => {
      res.status(201).json({
        message: "Sauce updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Delete a Sauce

exports.DeleteSauce = (req, res) => {
  Sauce.deleteOne({ _Id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// show all sauces

exports.getAllSauces = (req, res) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
