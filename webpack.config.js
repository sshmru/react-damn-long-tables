var BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );

module.exports = {
  context: __dirname + '/src',
  entry: {
    main: './main'
  },
  output: {
    path: __dirname + '/public',
    filename: 'build.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'jsx-loader'
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin( {
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: [
          'public'
        ]
      }
    })
  ]

};
