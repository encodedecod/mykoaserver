const {mysql}=require('../../mysql')
module.exports=async (ctx)=>{
    const {id,jpgs,scripts,localtwo,local,oneprice}=ctx.request.body
   
  
   console.log(id);
   
   const res=await mysql('tianjin_admin').update({
       "jpgs":jpgs,
       "scripts":scripts,
       "localtwo":localtwo,
       "local":local,
       "oneprice":oneprice
   }).where({
    "id":id
   })
   if(res){
       ctx.body={
           data:'更新成功！'
       }
   }else{
       ctx.body={
           data:'404'
       }
   }
}