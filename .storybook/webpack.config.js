module.exports = {
    module: {
      rules: [
        {
          test: /\.(PNG|png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
  };