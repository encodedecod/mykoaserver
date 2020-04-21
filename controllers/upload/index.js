const fs = require('fs')
let OSS = require('ali-oss');
let path = require('path')
let client = new OSS({
            region: '',
            accessKeyId: '',
            accessKeySecret: '',
            bucket: ''
  });

module.exports=async (ctx)=>{
    // const file = ctx.request.files.file
    // //将生成的图片链接返回给客户端
    // const basename = path.basename(file.path)
    // ctx.body = { "url": `${ctx.origin}/uploads/${basename}` }
    const files = ctx.request.files; // 获取上传文件
    console.log(files);
    
    for(let key in files) {
      let file = files[key]
      // 创建可读流
      const stream = fs.createReadStream(file.path);
     // yuny 为文件，意思是将文件存放到yuny 文件夹下
      let result = await client.putStream('/yun/'+file.name, stream);
      console.log(result);
      ctx.body={
        result:'200',
        imgurl:result.url
    }
    }
   
   

    
}