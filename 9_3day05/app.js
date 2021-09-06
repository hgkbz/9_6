//1. 引入express
var express = require('express');
var poke=require('./data.js');
console.log(poke[32]);
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
});
// jn测试用户传递的数据能否传到后台
app.get('/jn',(req,res)=>{
    var moni={names:'tom',pwd:'123'};
   var names=req.query.names;
   console.log(names);
   if(names==moni.names){
       res.send('成功');
   }else{
       res.send('失败');
   }
});
// poker接口，查询小精灵数据
app.get('/poker',(req,res)=>{
   console.log(req.query);
// 收到前台数据，是一个字符串格式，需要变成数字类型才能往数组里插   
var idnumber=Number(req.query.id);
   console.log(poke[idnumber-1]);
   var datajson=poke[idnumber-1];
   res.send(datajson);
});
// 该接口返回一个小精灵数据
app.get('/pokeshow',(req,res)=>{
  // 收到前台数据，是一个字符串格式，需要变成数字类型才能往数组里插   
//   此时datajson是一组小精灵的数据，是对象形式的 
  console.log(req.query);
  var id=Number(req.query.id);
  var datajson=poke[id-1];
//   把找好的数据传回给前台
  res.send(datajson);

});
// 所有小精灵都给到前台
app.get('/pokelist',(req,res)=>{
   res.send(poke);
});