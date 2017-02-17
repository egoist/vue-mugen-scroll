module.exports = {
  entry: './example/index.js',
  dist: 'dist-example',
  port: 4050,
  html: {
    title: 'Vue MugenScroll'
  },
  webpack: {
    output: {
      publicPath: '/vue-mugen-scroll/'
    }
  }
}
