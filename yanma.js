const Koa = require('koa'); 
const Router = require('koa-router') // koa 路由中间件 
const svgCaptcha = require('svg-captcha')
const session=require('koa-session')
const app = new Koa();

const router = new Router(); // 实例化路由 
//设置session
app.keys = ['some secret hurr'];
const config={
    key:'koa:sess',
    maxAge:60*1000*20,
    overwrite:true,
    httpOnly:true,
    signed:true,
    rolling:true,//每次访问将会重置过期时间
    renew:true

}
//启动session
app.use(session(config,app))
 
router.get('/home', async (ctx, next) => {
 
  const cap = svgCaptcha.create({
    size: 4, // 验证码长度
    width:160,
    height:60,
    fontSize: 50,
    ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
    noise: 2, // 干扰线条的数量
    color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
    background: '#eee' // 验证码图片背景颜色
  })
  
  let img = cap.data // 验证码
  let text = cap.text.toLowerCase() // 验证码字符，忽略大小写
  
//   ctx.type = 'html'
//   ctx.body = `${img}<br><a href="javascript: window.location.reload();">${text}</a>`
  // 设置响应头
  ctx.response.type = 'image/svg+xml';
 
  ctx.body = img;
});
 
app.use(router.routes());
 
app.listen(3333, () => {
  console.log('This server is running at http://localhost:' + 3333)
})
