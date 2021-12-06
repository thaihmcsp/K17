const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://nodemy:nodemy@cluster0.10m5w.mongodb.net/K17?retryWrites=true&w=majority"
);

module.exports = mongoose;
