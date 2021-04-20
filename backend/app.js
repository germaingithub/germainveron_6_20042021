const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose
  .connect(
    "mongodb+srv://gev:gege@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use(bodyParser.json());

app.use((req,res)=>{
res.json({message: 'requete recu'});
});
  module.exports=app;