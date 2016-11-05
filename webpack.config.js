module.exports = {
  devServer: {
    contentBase: './app',
    hot: true
  },
  entry: {
    app: './app/app.js',
    bugtracker: './app/modules/bugtracker/bugtracker.module.js'
  },
  output: {
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.json'
    ],
    modulesDirectories: [
      'bower_components',
      'node_modules'
    ]
  }
};
