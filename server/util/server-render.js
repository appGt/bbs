const asyncBootstrapper = require('react-async-bootstrapper')
const serialize = require('serialize-javascript')
const ejs = require('ejs')
const ReactSSR = require('react-dom/server')
const Helmet = require('react-helmet').default

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject)=>{
    const createStoreMap = bundle.createStoreMap
    const createApp = bundle.default
    const routerContext = {}
    const stores = createStoreMap()
    const app = createApp(stores, routerContext, req.url)
    asyncBootstrapper(app).then(() => {
      if (routerContext.url) {
        console.log(routerContext.url)
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }
      // const helmet = Helmet.rewind()
      const helmet = Helmet.renderStatic();
      const state = getStoreState(stores)
      const content = ReactSSR.renderToString(app)
      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
      })

      res.send(html)
      resolve()
    }).catch(reject)
  })
}
