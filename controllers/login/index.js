const { mysql } = require('../../mysql')
const {sign} =require('jsonwebtoken')
const {secret} = require('../../routes/config')
// const {newdata} =require('../yanma/index')
const newdata=[]
async function login(ctx,next){
   //ctx.request.params 路径参数
    //ctx.request.query 请求参数
    //ctx.request.header 头参数
    //ctx.request.body 对象参数
    const user = ctx.request.body
    
    console.log(newdata);
    
    console.log(user);
    if(ctx.session.userinfo){
        newdata.push(ctx.session.userinfo)
        if(newdata.length==2){
            newdata.splice(0,1)
        }
     }
    const userdata=await mysql('user').where({'username':user.username}).select()
    // console.log(userdata);
    if (user&&user.password==userdata[0].password&&user.yanma==newdata[0]){
        let {username,password} = user
        console.log(user)
        //签发令牌token
        const token=sign({username,password},secret,{expiresIn: '1h'})
        ctx.body={
            message:'成功得到了token',
            code:200,
            token
        }
    }else{
    
        ctx.body={
            message:'error',
            code:404,
            userinfo:ctx.session.userinfo+''
        }
    }  
}
async function admininfo(ctx){
    ctx.body={
        message:'管理员',
        username:ctx.state.user.username,
        code:200

    }
}
module.exports={
    login,
    admininfo
}