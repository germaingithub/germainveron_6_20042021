const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces')
const path = require("path");

mongoose
  .connect(
    "mongodb+srv://gegeol:Www3grvq@cluster0.cvey0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

  const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});
  


app.use(express.json());
app.use('/api/sauces',saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports=app;