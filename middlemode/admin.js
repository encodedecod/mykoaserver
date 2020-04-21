module.exports=()=>{

    return async (ctx,next)=>{
        if(ctx.state.user.username ==='admin' && ctx.state.user.password==='ws123456'){
            next()
        }else{
            ctx.body={
                message:'用户无权限',
                code:404
            }
        }
    }
}