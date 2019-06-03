const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')

const ReactSSR = require('react-dom/server')

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

const Module = module.constructor

const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle
serverCompiler.watch({}, (err, stats) => {
  if(err) throw err
  stats = stats.toJson()
  //输出打包日志
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  //获取server.bundle.js
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  //通过memory-fs 从内存获取server.bundle文件 的stream
  //用过module.constructor 新建一个module实例解析bundle stream
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})


module.exports = function (app) {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  app.get('*', function (req, res) {
    getTemplate().then(template => {
      const content = ReactSSR.renderToString(serverBundle)
      res.send(template.replace('<!--app-->', content))
    })
  })
}
