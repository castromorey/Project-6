const Thing = require("../models/thingM");
const { error } = require("console");

//add a new sauce to the DB

exports.createThing = (req, res) => {
  const thing = new Thing({
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    usersLiked: req.body.usersLiked,
    usersDisliked: req.body.usersDisliked,
  });

  thing
    .save()
    .then(() => {
      res.status(201).json({
        //message: "Post saved successfully!",
      });
    })

    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// find one sauce

exports.getOneThing = (req, res) => {
  Thing.findOne({
    _id: req.params.id,
  })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Update a Sauce

exports.ModifyThing = (req, res) => {
  const thing = new Thing({
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    usersLiked: req.body.usersLiked,
    usersDisliked: req.body.usersDisliked,
  });
  Thing.updateOne({ _Id: req.params.id }, thing)
    .then(() => {
      res.status(201).json({
        message: "Thing updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Delete a Sauce

exports.DeleteThing = (req, res) => {
  Thing.deleteOne({ _Id: req.params.id })
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
  Thing.find()
    .then((thingM) => {
      res.status(200).json(thingM);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
