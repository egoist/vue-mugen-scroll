module.exports = {
  entry: './example/index.js',
  dist: 'dist-example',
  port: 4050,
  html: {
    title: 'Vue MugenScroll'
  },
  homepage: '/vue-mugen-scroll/',
  postcss:[
    require('postcss-nested')
  ]
}
