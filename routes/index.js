const router = require('koa-router')({
    //添加路由前缀
    prefix: '/fy'
  })
  const {secret} = require('./config')
  const jwt = require('koa-jwt')({secret})//jwt加载中间件
  const admin =require('../middlemode/admin.js')()
  const controllers = require('../controllers/index')
  //登录相关接口
router.post('/login/login',controllers.login.index.login)
router.get('/login/admin',jwt,admin,controllers.login.index.admininfo)
//生成验证码接口
router.get('/login/yanma',controllers.yanma.index)
//注册新用户接口
router.post('/login/register',controllers.register.index)
  // 房价首页相关的接口
router.get('/tianjin/index', controllers.home.index.tianJin)
router.get('/shanghai/index', controllers.home.index.shangHai)
router.get('/chengdu/index', controllers.home.index.chengDu)
//增加商品
router.post('/tianjin/add',controllers.add.index)
//上传文件
router.post('/upload', controllers.upload.index)
//删除商品房操作
router.post('/delete/goods',controllers.delete.index)
//修改商品房操作
router.post('/put/goods',controllers.put.index)
//查询商品房搜索
router.get('/find/goods',controllers.find.index)
//查询id
router.post('/findid/goods',controllers.findid.index)
//用户接口
router.get('/user/list',controllers.userlist.index.getuserlist)
router.post('/user/find',controllers.userlist.index.finduser)
router.post('/user/delete',controllers.userlist.index.deleteuserlist)
router.post('/user/edit',controllers.userlist.index.edituserlist)
router.post('/user/add',controllers.userlist.index.adduserlist)
  module.exports = router