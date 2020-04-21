const Koa = require('koa')
// const bodyParser = require('koa-bodyparser')
const config = require('./config')
const cors = require('./libs/app_cros.js'); //跨域处理文件koa-cors.js
const koaBody = require('koa-body')
const session=require('koa-session')
const path=require('path')
// const path=require('path')
// const koaStatic = require('koa-static');
const app = new Koa()
// 解析请求体
app.use(cors)
// 设置session
app.keys = ['some secret hurr'];
const sessionconfig={
  key: 'koa:sess', //cookie key (default is koa:sess)
  maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true, //是否可以overwrite    (默认default true)
  httpOnly: false, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, //签名默认true
  rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew:true, //(boolean) renew session when session is nearly expired,

}
//启动session
app.use(session(sessionconfig,app))
// app.use(bodyParser())
// app.use(koaStatic(path.join(__dirname, 'public')))
const router = require('./routes/index')
app.use(koaBody({
  // 支持文件格式
  multipart: true,
  //上传到本地
  formidable: {
      // 上传目录
      // uploadDir: path.join(__dirname,'public/uploads'),
      // 保留文件扩展名
      keepExtensions: true,
  }
}));

app.use(router.routes())

app.listen(config.port, () => {
  console.log(`server is started at port ${config.port}`)
})
