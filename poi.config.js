module.exports = {
  entry: './example/index.js',
  dist: './example/dist',
  port: 4050,
  html: {
    title: 'Vue MugenScroll'
  },
  homepage: '/vue-mugen-scroll/',
  postcss:[
    require('postcss-nested')
  ]
}
