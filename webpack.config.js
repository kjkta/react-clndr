module.exports = {
  entry: "./src/",
  output: {
    path: __dirname,
    filename: "DateTimePicker.js",
    library: "DateTimePicker",
    libraryTarget: "umd",
  },
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader" }]
  },
  externals: {
    react: "React",
    moment: "moment"
  }
};
