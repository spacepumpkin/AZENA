const path = require('path');

module.exports = {
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
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
