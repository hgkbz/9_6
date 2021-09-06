// 1.引入express
var express=require('express');
// 2.创建web服务器
var app=express();
// 3.设置监听窗口
app.listen(8080,()=>{
  console.log('webon');
});
// 4，静态资源托管
app.use(express.static('./public'));
// 接受前解析urlencoded传递的格式
app.use(express.urlencoded({extended:false}));