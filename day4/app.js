//1. 引入express
var express = require('express');
// 2.创建web服务器
var app=express();
// 3.设置监听窗口
app.listen(8080,()=>{
	console.log('web成功xz1');
});
// 4.静态资源托管
//http://127.0.0.1:8080/01_get.html
app.use(express.static('./public'));
// 5.在终端启动服务器 node app.js
// 7,给前台一个地址，因为前台发请求用get，后台交互数据，也用get方法
app.get('/ajaxget',(req,res)=>{
    console.log('前台有请求了');
    // 8,返回给前台数据
    res.send('给你数据绿线通了');
})
// 接收前台？方式传递的参数
app.get('/getpar1',(req,res)=>{
    console.log(req.query)
});
// 接收前台/传递方式的参数
app.get('/getpar2/:names',(req,res)=>{
    console.log(req.params)
});
// 接收前台post方式接口地址
// 接收之前，需要单独解析通过urlencoded传递的格式
app.use(express.urlencoded({extended:false}));
app.post('/ajaxpost',(req,res)=>{
    console.log(req.body);
    res.send("post成功")
});
app.put('/ajaxput',(req,res)=>{
    console.log(req.body);
    res.send({code:304,msg:'put成功'});
});
// delete请求方式
app.delete('/ajaxdel/:names',(req,res)=>{
    console.log(req.params);
    res.send({code:304,msg:'del成功'})
})