const { mysql } = require('../../mysql')
//数组分割的方法
// function sliceArray(array, size) {
//     const result = [];
//     for (var x = 0; x < Math.ceil(array.length / size); x++) {
//         const start = x * size;
//         const end = start + size;
//         result.push(array.slice(start, end));
//     }
//     return result;
// }
  async function  tianJin(ctx){
      
      const query=ctx.request.query.query
      const pagenum=ctx.request.query.pagenum
      const pagesize=ctx.request.query.pagesize
    // const tianjin=await mysql('tianjin_admin').orderBy('local')
    // .where('local', 'like', '%' + query + '%').limit(pagesize).select()
     const tianjintotal=await mysql('tianjin_admin').orderBy('local')
     .where('local', 'like', '%' + query + '%').select()
    const finailresult=tianjintotal.slice((pagenum-1)*pagesize,pagesize*pagenum)
    ctx.body={
     'tianjin':finailresult,
     'total':tianjintotal.length
    }
  
}
async function  shangHai(ctx){
    const shanghai=await mysql('shanghai_admin').select()
    ctx.body={
     'shanghai':shanghai
    }
}
async function  chengDu(ctx){
    const chengdu=await mysql('chengdu_admin').select()
    ctx.body={
     'chengdu':chengdu
    }
}

module.exports={
    tianJin,
    shangHai,
    chengDu
}