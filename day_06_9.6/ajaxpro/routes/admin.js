// 1.引入模块express
const express=require('express');
//const { userInfo } = require('os');
// 2，引入连接池
const pool = require('../pool.js');
// 3.因为要打包暴露出去所以要创建一个路由对象
let router=express.Router();
// ****************接口逻辑*************
// 1.接口1：管理员登录
// 请求方法：post
// 后台模块中的接口地址：/login
// 前台访问的接口地址：/admin/login
// 需要获取请求：req.body[约定前后台传递数据的key名]
// 需要对数据库进行“查询”
// 约定的管理员某种和密码是req.body.anames  req.body.apwd（密码）
// select * from admin where a_names=${anames} and a_pwd=${apwd}
// 响应结果：{code:number,msg:'***'}
// 接口1：登录
router.post('/login',(req,res,next)=>{
    var obj= req.body;
    var sql=`select * from admin where a_names="${obj.anames}" and a_pwd="${obj.apwd}";`
    // 执行sql语句
    console.log(sql);
    pool.query(sql,(err,data)=>{
      //  假装返回number
      // res.send('前后台已同');
      // 排除错误
      if(err){next(err);return;}
      // data是返回查询结果
      // 如果是查询语句，data是有返回值的，返回值是数组，正确的是数组中一个对象，错误是一个空数组，通过判断数组长度来验证是否通过登录
      // console.log(data);
      if(data.length==0){
        res.send({code:0,msg:'用户名密码错误'});
      }else{
        res.send({ code:1,msg:'登录成功'});
      }
    });
})
// 接口2：用户列表显示所有用户信息，包括删除按钮
// 请求方法：get
// 后台模块中接口地址：/search
// 前台访问的地址：/admin/search
// 不需要请求参数
// sql语句：select * from userInfo;
// 响应结果
// {(code:1,msg:'返回所有用户数据'),data:data}
router.get('/search',(req,res,next)=>{
    pool.query('select * from userinfo;',(err,data)=>{
       if(err){next(err);return;}
          //  先确定查询完的语句是否有数据
          console.log(data);
          res.send({code:1,msg:'all数据',data:data});
    });
});
// *************************************
// 4.暴露路由（admin）对象
module.exports=router;