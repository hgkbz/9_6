//1. 引入express
var express = require('express');
// 2.创建web服务器
var app=express();
// 3.设置监听窗口
app.listen(8080,()=>{
	console.log('web成功xz1');
});
// 4.静态资源托管
http://127.0.0.1:8080/01_obj.html
app.use(express.static('./public'));
// 5.在终端启动服务器 node app.js
// 7,给前台一个地址，因为前台发请求用get，后台交互数据，也用get方法
app.get('/ajaxget',(req,res)=>{
    console.log('前台有请求了');
    // 8,返回给前台数据
    res.send('给你数据绿线通了');
})