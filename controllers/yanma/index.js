const svgCaptcha = require('svg-captcha')
// var olddata=[]

module.exports = async (ctx)=>{
  
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
    
    const img = cap.data // 验证码
    const text = cap.text.toLowerCase() // 验证码字符，忽略大小写
  //   if(text){
  //    olddata.push(text)
  //     if(olddata.length==2){
  //      olddata.splice(0,1)
  //     }
  //  }
    ctx.session.userinfo=text
    // 设置响应头
  //   ctx.cookies.set('userinfo',text,{
  //     maxAge:60*1000*24,//设置存在毫秒数
  //     // path:'/cookie',//指定指定路径访问
  //     httpOnly:false//只有服务器端可访问
  // })
    console.log(text);
    
    ctx.response.type = 'image/svg+xml';
    ctx.body = img;
  }
  // async function newdata(){
  //    return olddata
  // }
  // module.exports= {
  //         yanma,
  //        newdata:yanma.text
  // }