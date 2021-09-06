// 1.引入express模块
const express =require('express');

// 2.其他（比如路由）模块
// 为了保持代码的整洁性，所有引入模块都放到文件的顶端
// 路由模块
// 管理员模块
const adminRouter=require('./routes/admin.js');
// 用户模块
const userRouter=require('./routes/user.js');
// 3.创建web服务器
const app=express();
// 4.设置端口号
app.listen(8080,()=>{
  console.log('web成功l')
});
// 5.托管静态资源文件夹
app.use(express.static('./views'));
// 6.解析格式
app.use(express.urlencoded({
  extended:false
}));
// 7.挂载路由
app.use('/admin',adminRouter);
app.use('/user',userRouter);

// 8.错误处理中间件
app.use(function(err,req,res,next){
  //查看错误信息
  console.log(err);
  // 响应500，返回信息
  res.send({
    code:500,msg:'服务器挂了，过2年再看吧'
  });
})