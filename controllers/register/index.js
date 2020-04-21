const {mysql}=require('../../mysql')
module.exports=async (ctx)=>{
    const {username,password,email,yanma}=ctx.request.body
    if(ctx.session.userinfo==yanma){
    const resemail=await mysql('user').column('email').where({'email':email}).select()
    console.log(resemail);
    if(resemail.length!=0){
        ctx.body={
            message:'该邮箱已被注册！'
        }
    }
   else if((await mysql('user').column('username').where({'username':username}).select()).length!=0){
        ctx.body={
            message:'该用户名已被使用！'
        }
    }
    else{
        const res = await mysql('user').insert({
            'username':username,
            'password':password,
            'email':email,
            'create_time':`${parseInt(new Date().getFullYear())}`+'-'+`${parseInt(new Date().getUTCMonth()+1)}`+'-'+`${parseInt(new Date().getDate())}`+' '+`${parseInt(new Date().getHours())}`+':'+`${parseInt(new Date().getMinutes())}`+':'+`${parseInt(new Date().getSeconds())}`
        }).select()
        if(res){
            ctx.body={
                message:'注册成功！'
               
    
            }
        }
    } }
    else{
        ctx.body={
            message:'验证码错误！'
        }
    }
}