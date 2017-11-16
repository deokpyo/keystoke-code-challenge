var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    default: ""
  },
  lastName: {
    type: String,
    trim: true,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: ""
  },
  password: {
    type: String,
    default: ""
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.summary = function() {
  var summary = {
    id: this._id.toString(),
    firstName: this.firstName,
    lastName: this.lastName,
    image: this.image,
    description: this.description,
    email: this.email,
    timestamp: this.timestamp
  };
  return summary;
};

module.exports = mongoose.model("UserSchema", UserSchema);
