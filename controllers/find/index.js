const { mysql } = require('../../mysql')
module.exports=async (ctx)=>{
    const Local=ctx.request.query.query
      const res=await mysql('tianjin_admin').orderBy('local')
      .where('local', 'like', '%' + Local + '%').limit(10).select()
      if(res){
          ctx.body={
              res
          }

      }else{
          ctx.body={
              data:'抱歉你的查询无结果'
          }
      }
}