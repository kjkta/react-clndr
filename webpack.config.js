const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const dev = process.env.NODE_ENV === "development";

const rules = [
  {
    test: /\.js$/,
    use: "babel-loader",
    exclude: /node_modules/
  }
];

const picker = {
  mode: dev ? "development" : "production",
  devtool: dev ? "eval" : "source-map",
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
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ],
  
};

const demo = {
  mode: dev ? "development" : "production",
  entry: "./demo/",
  output: {
    path: path.resolve(__dirname, "demo/"),
    filename: "bundle.js"
  },
  module: { rules }
};

module.exports = [picker, demo];
