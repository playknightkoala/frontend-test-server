const path = require("path"); //(1)
module.exports = {
  context: path.resolve(__dirname, "src"), //(2)
  entry: "./server.js", //(3)
  externals: ["fs", "net"],
  output: {
    path: path.resolve(__dirname, "./dist"), //(4)
    filename: "index.bundle.js", //(5)
  },
  optimization: {
    minimize: false,
  },
};
