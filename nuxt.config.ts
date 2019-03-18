import { Configuration } from 'webpack'
import { Context } from '@nuxt/vue-app'

export default {
  mode: 'universal',

  srcDir: 'src',

  loading: { color: '#fff' },

  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  plugins: [
    '@/plugins/element-ui',
    '@/plugins/vuex'
  ],

  modules: [
    '@nuxtjs/pwa'
  ],

  //開発環境でもPWAを有効化する
  workbox: {
    dev: true
  },

  manifest: {
    name: 'morgan',
    lang: 'ja',
    start_url: '/',
    // scope: '/',
    display: 'standalone',
    icons: [
      {
        src: "static/icon.png",
        sizes: "512x512",
        type: "image/png",
        short_name: 'morgan',
        title: 'morgan ',
        'og:title': 'morgan',
        description: 'morgan',
        'og:description': 'morgan',
        theme_color: '#211E55',
        background_color: '#fff'
      }
    ]
  },

  head: {
    title: 'todo_nuxt_ts',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'todo_nuxt_ts' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  analyze: true,

  // TODO: 動いていない
  splitChunks: {
    layouts: true,
    pages: true,
    commons: true
  },

  build: {
    transpile: [/^element-ui/],
    extend (config: Configuration, { isClient }: Context) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = '#source-map'
      }

      // web workerを使う場合は worker-loader をインストールする
      // if (config.module) {
      //   // // rulesの先頭に追加
      //   config.module.rules.unshift({
      //     test: /\.worker\.js$/,
      //     loader: 'worker-loader',
      //     options: { fallback: true },
      //     exclude: /(node_modules)/,
      //   })
      // }

      if (config.output) {
        // // HMR時にWebWorkerでwindow is not definedになる問題対策
        config.output.globalObject = 'this'
      }
    }
  },

  generate: {
    fallback: true,
    // fallback: 'my-fallback/file.html' // ホスティングサービスで特定のロケーションを指定する必要がある場合
  },

  // router: {
  //   middleware: [
  //   ]
  // },

  serverMiddleware: [
    '~/serverMiddleware/logger',
  ]
}
