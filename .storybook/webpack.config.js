module.exports = {
    module: {
      rules: [
        {
          test: /\.(PNG|png|jpe?g|gif|woff|woff2|svg|eot|ttf)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
  };