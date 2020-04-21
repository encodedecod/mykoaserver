const {mysql}=require('../../mysql')
async function getuserlist(ctx){
    const query=ctx.request.query.query
      const pagenum=ctx.request.query.pagenum
      const pagesize=ctx.request.query.pagesize
     const userlist=await mysql('user').orderBy('create_time')
     .where('username', 'like', '%' + query + '%').select()
    const finailresult=userlist.slice((pagenum-1)*pagesize,pagesize*pagenum)
    ctx.body={
     'userlist':finailresult,
     'total':userlist.length
    }
  
}
async function deleteuserlist(ctx){
  const {create_time}=ctx.request.body
  const deletedata=await mysql('user').where({'create_time':create_time}).del()
  if(deletedata){
      ctx.body={
          data:'删除成功'
      }
  }
}
async function edituserlist(ctx){
    const {username,password,email,create_time}=ctx.request.body
    const updateuser=await mysql('user').update({
        'username':username,
        'password':password,
        'email':email
    }).where({'create_time':create_time})
    if(updateuser){
        ctx.body={
            data:'更新成功'
        }
    }
}
async function finduser(ctx){
    const {create_time}=ctx.request.body
    const finduser=await mysql('user').where({'create_time':create_time}).select()
    if(finduser){
        ctx.body={
            data:finduser
        }
    }
}
async function adduserlist(ctx){
    const {username,password,email}=ctx.request.body
    
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
                message:'添加用户成功！'
               
    
            }
        }
    } 
}
module.exports={
    getuserlist,
    deleteuserlist,
    edituserlist,
    finduser,
    adduserlist
}