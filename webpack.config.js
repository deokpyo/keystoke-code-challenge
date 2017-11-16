var webpack = require("webpack");
var path = require("path");

module.exports = {
  // find the code that i wrote
  entry: {
    app: "./src/app.js"
  },
  // compile the code then bundle it here
  output: {
    filename: "public/dist/bundle.js",
    // makes debugging much easier
    sourceMapFilename: "public/dist/bundle.map"
  },
  // you’ll never not do this way, because always we use babel
  devtool: "#source-map",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015"]
        }
      }
    ]
  }
};
