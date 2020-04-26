module.exports = {
  // pwa: {
  //   name: 'Mado',
  //   themeColor: '#FFFFFF',
  //   msTileColor: '#FFFFFF',
  //   manifestOptions: {
  //     background_color: '#FFFFFF'
  //   }
  // },
  devServer: {
    disableHostCheck: true,
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/scss/style.scss";`
      }
    }
  },
}
