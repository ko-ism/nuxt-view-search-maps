# nuxt-view-search-maps-ssr
## 内容
取得したデータを、地図上にマーカー表示として表示させる。フロントエンド側。Universal(SSR)モードで作成。
> バックエンドは、functions-get-maps-data-from-cloudsql に格納。
- APIで住所情報などデータ取得(axios)
- GoogleMapsAPI利用
- CloudRunにデプロイ(Dockerfil,cloud-build.yml)

## ハマったところ
- Unexpected token < エラーが発生。最終的に、nuxt.config.jsの設定を修正して対処。
```
plugins: [
    {src: "~/plugins/vue2-google-maps.js", ssr: false }
  ],
```

```
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    transpile: [/^vue2-google-maps($|\/)/]
  }
```
- .envに環境変数を定義しているので、.gcloudignoreファイルは以下のように設定
```
#.gitignore
node_modules
.nuxt
!.env
```


# nuxt-view-search-maps-spa
## 内容
取得したデータを、地図上にマーカー表示として表示させる。フロントエンド側。SPAで作成。
> バックエンドは、functions-get-maps-data-from-cloudsql に格納。
- APIで住所情報などデータ取得(axios)
- GoogleMapsAPI利用

## 環境
- Nuxt.js
- vue2-google-maps

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
