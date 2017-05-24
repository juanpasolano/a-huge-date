var path = require( 'path' );
module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "public/bundle.js"
  },
  devtool: 'source-map',
  module: {
    loaders:[
      {
        test: /\.scss$/,
        loaders: [ 'to-string-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: ['*']
  }
}