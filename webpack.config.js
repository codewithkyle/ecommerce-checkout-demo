const path = require('path');

module.exports = {
    mode: "none",
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false
    },
    resolve: {
        extensions: ['.js']
    },
    entry: './_compiled/Checkout.js',
    output: {
        path: path.resolve(__dirname, "docs/assets"),
        filename: 'Checkout.js',
        pathinfo: false
    }
  };
