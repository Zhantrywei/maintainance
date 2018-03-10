# maintain-sys

> a system about maintain on computer

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 2018/3/9

1. 路由配置关于默认路由的重定向

```js
router: [
    {
      path: '/',
      redirect: '/login'
    }
]
```

2. main.js中new Vue实例
```js
new Vue({
    el: '#app'
})

new Vue({

}).$mount('#app')

new Vue({
  el: '#app',
  router,
  //
  // components: { App },
  // template: '<App/>'
  //
  // render: h => h(App)
  //
  render: function (h) {
    return h(App)
  }
})
```
