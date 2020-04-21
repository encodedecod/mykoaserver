const { mysql } = require('../../mysql')
module.exports=async (ctx)=>{
    const Id = ctx.request.body.id
    console.log(Id)
    const data = await mysql('tianjin_admin').where({
      'id': Id
    }).delete()
    if (data) {
      ctx.body = {
        'data': '清除成功'
      }
    } else {
      ctx.body = {
        'data': null
      }
    }
}