const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  context: __dirname,
  entry: "./frontend/entry.jsx",
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: "./bundle.js"
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/],  // type of files to transpile
        exclude: /(node_modules)/, // ignores dependencies
        use: {
          loader: "babel-loader", // sets babel as transpiler
          query: {
            presets: ["@babel/env", "@babel/react"] // tells babel what syntaxes to translate
          }
        },
      }
    ]
  },
  devtool: process.env.NODE_ENV === "production" ? "none" : "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".png", "*"]
  }
};
