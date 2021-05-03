const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message:"trop de requête depuis votre IP, essayez de nouveau dans 15 minutes"
});

module.exports = limiter;