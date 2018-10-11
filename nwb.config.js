const path = require("path");

module.exports = {
  type: "react-component",
  npm: {
    esModules: true,
    umd: false
  },
  webpack: {
    aliases: {
      src: path.resolve("/src")
    }
  }
};
