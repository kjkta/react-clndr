const path = require("path");

const rules = [
  {
    test: /\.js$/,
    use: "babel-loader",
    exclude: /node_modules/
  }
];

const package = {
  entry: "./src/",
  output: {
    path: __dirname,
    filename: "DateTimePicker.js",
    library: "DateTimePicker",
    libraryTarget: "umd"
  },
  module: { rules },
  externals: {
    react: "react",
    moment: "moment"
  }
};

const demo = {
  entry: "./demo/",
  output: {
    path: path.resolve(__dirname, "demo/"),
    filename: "bundle.js"
  },
  module: { rules }
};

module.exports = [package, demo];
