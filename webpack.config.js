const path = require("path");

const rules = [
  {
    test: /\.js$/,
    use: "babel-loader",
    exclude: /node_modules/
  }
];

const picker = {
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
    moment: "moment",
    "babel-polyfill": "babel-polyfill"
  }
};

const demo = {
  entry: ["babel-polyfill", "./demo/"],
  output: {
    path: path.resolve(__dirname, "demo/"),
    filename: "bundle.js"
  },
  module: { rules }
};

module.exports = [picker, demo];
