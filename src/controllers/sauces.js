const Sauce = require("../models/sauceModel");

exports.createSauce = (req, res, next) => {
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

exports.ModifySauce = async (req, res, next) => {
  let data = {};

  if (req.body.userId) {
    data = req.body;
  } else {
    data = JSON.parse(req.body.sauce);

    data.imageUrl = `http://localhost:3000/images/${req.file.filename}`;
  }

  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });
    //userId: req.user.userId, (sauce.name = data.name);

    //------------------------
    /*const voteSauce = {
      likes: sauce.likes,
      dislikes: sauce.dislikes,
      usersliked: sauce.usersLiked,
      usersdislike: sauce.usersDisliked,
    };*/

    //-----------------------

    for (const key in data) sauce[key] = data[key];

    sauce
      .save
      /*{ _id: req.params.id }, { ...data, _id: req.params.id }*/
      ();

    res.status(201).json({
      message: "Sauce updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Delete a Sauce

exports.DeleteSauce = (req, res) => {
  Sauce.deleteOne({ _id: req.params.id })
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

//Like or Dislike a Sauce

exports.likeDislike = async (req, res, next) => {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });

    switch (req.body.like) {
      // Dislike
      case -1:
        if (sauce.usersLiked.includes(req.user.userId)) {
          sauce.likes = sauce.likes - 1;

          const userIds = sauce.usersLiked.filter(
            (userId) => userId !== req.user.userId
          );

          sauce.usersDisliked = userIds;
        }

        sauce.dislikes = sauce.dislikes + 1;

        if (!sauce.usersDisliked.includes(req.user.userId))
          sauce.usersDisliked = [...sauce.usersDisliked, req.user.userId]; //antes req.user.userId

        break;
      case 0:
        if (sauce.usersDisliked.includes(req.user.userId)) {
          sauce.dislikes = sauce.dislikes - 1;
          const userIds = sauce.usersDisliked.filter(
            (userId) => userId !== req.user.userId
          );

          sauce.usersDisliked = userIds;
        } else {
          sauce.likes = sauce.likes - 1;
          const userIds = sauce.usersLiked.filter(
            (userId) => userId !== req.user.userId
          );

          sauce.usersLiked = userIds;
        }

        break;
      case 1:
        if (sauce.usersDisliked.includes(req.user.userId)) {
          sauce.dislikes = sauce.dislikes - 1;

          const userIds = sauce.usersDisliked.filter(
            (userId) => userId !== req.user.userId
          );

          sauce.usersDisliked = userIds;
        }

        sauce.likes = sauce.likes + 1;

        if (!sauce.usersLiked.includes(req.user.userId))
          sauce.usersLiked = [...sauce.usersLiked, req.user.userId]; //antes req.user.userId

        break;
      default:
        console.log({ default: req.body });
        break;
    }

    sauce.save();

    res.status(201).json({
      message: "Sauce updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
