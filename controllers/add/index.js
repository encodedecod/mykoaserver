const { mysql } = require('../../mysql')
module.exports= async (ctx)=>{
    
    //  console.log(parseInt(new Date().getTime() / 1000));
     
       const {jpgs,local,scripts,onePrice,localRoom,localArea,localHigh,localTimes,localTwo}= ctx.request.body
       const res = await mysql('tianjin_admin').insert({
           'id':parseInt(new Date().getTime() / 1000),
           'jpgs':jpgs, 
           'local':local,
           'scripts':scripts,
           'total':parseInt(onePrice)*parseInt(localArea) / 10000,
           'oneprice':onePrice,
           'localroom':localRoom,
           'localarea':localArea,
           'localhigh':localHigh,
           'localtimes':localTimes,
           'localtwo':localTwo
       })
       if(res){
           ctx.body={
               data:'200'
           }
       }else{
           ctx.body={
               data:'404'
           }
       }

}