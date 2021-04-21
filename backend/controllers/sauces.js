const Sauce = require('../models/sauce');
const fs = require('fs');

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    name: sauceObject.name,
    manufacturer: sauceObject.manufacturer,
    description: sauceObject.description,
    mainPepper: sauceObject.mainPepper,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes: "0",
    dislikes: "0",
  });
  sauce.save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
   console.log(req.body); 
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.addLike = (req,res,next)=> {
  const userId = req.body.userId;
  const userLike = req.body.like;

  Sauce.findOne({ _id: req.params.id })
  .then ((sauce)=> {
    const userLiked = sauce.userLiked
    const userDisliked = sauce.userDisliked

    if (userLike == 0) {
      const foundUserLiked = userLiked.find(usersId => userId == userId);
      const foundUserDisliked = userDisliked.find(usersId => usersId == userId);
      
      if (foundUserLiked) {
        Sauce.updateOne({ _id: req.params.id },
        { $pull: { userLiked:userId}, $inc :{likes:-1}})
        .then(() => res.status(200).json({ message: 'naime plus' }))
        .catch(error => res.status(400).json({ error }));
      }else if (foundUserDisliked) {
        Sauce.updateOne({ _id:req.params.id},
          {$pull:{ userDisliked:userId},$inc : {dislikes: -1}})
          .then(()=> res.status(200).json({ message:'ne deteste plus'}))
          .catch(error => res.status(400).json({ error }));
      }
    }else if (userLike == 1) {
      Sauce.updateOne({ _id:req.params.id},
        {$push: { usersLiked:userId}, $inc:{likes:1}})
        .then(()=> res.status(200).json({ message:'aime'}))
        .catch(error => res.status(400).json({ error }));

    }else if (userLike == -1) {
      Sauce.updateOne({ _id: req.params.id},
        { $push: { userDisliked: userId},$inc: {dislikes:1}})
        .then(()=> res.status(200).json({ message:'naime pas'}))
        .catch(error => res.status(400).json({ error }));
    }
  })
  .catch((error)=> {res.status(404).json({error})});
};