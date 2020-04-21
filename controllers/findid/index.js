const { mysql } = require('../../mysql')
module.exports=async (ctx)=>{
    const Id = ctx.request.body.id
    console.log(Id)
    const data = await mysql('tianjin_admin').where({ 'id': Id} ).select()
    if (data) {
        ctx.body = {
          'data': data
        }
      } else {
        ctx.body = {
          'data': null
        }
      }
}