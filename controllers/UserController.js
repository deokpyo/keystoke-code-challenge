var User = require("../models/User");
var Promise = require("bluebird");
var bcrypt = require("bcryptjs");

module.exports = {
  find: function(params, isRaw) {
    return new Promise(function(resolve, reject) {
      User.find(params, function(err, users) {
        if (err) {
          reject(err);
          return;
        }

        // login condition
        if (isRaw) {
          resolve(users);
          return;
        }

        var summaries = [];
        Users.forEach(function(User) {
          summaries.push(User.summary());
        });
        resolve(summaries);
      });
    });
  },

  findById: function(id) {
    return new Promise(function(resolve, reject) {
      User.findById(id, function(err, user) {
        if (err) {
          reject(err);
          return;
        }
        resolve(user.summary());
      });
    });
  },

  create: function(params) {
    return new Promise(function(resolve, reject) {
      // hash password
      var password = params.password;
      params["password"] = bcrypt.hashSync(password);
      User.create(params, function(err, user) {
        if (err) {
          reject(err);
          return;
        }
        resolve(user.summary());
      });
    });
  },

  update: function(id, params, callback) {
    User.findByIdAndUpdate(id, params, { new: true }, function(err, user) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, user);
    });
  }
};
