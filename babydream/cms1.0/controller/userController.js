/**
 * Created by zx on 2017/11/14.
 */
"use strict";
const userModal = require("../modal/userModal.js");

module.exports = {
    index(req,res){
        let username;
        if(req.session.userInfo){
            username = req.session.userInfo.userName ;
        }
        // console.log(username);
        res.render("index",{"name":username})
    },
    userList(req,res){
        userModal.userList(null,null,null,null,5,1).then((data) => {
            //console.log(data)
            res.render("userList",{"data":data})
        })
    },
    userListAjax(req,res){
        let id = req.body.id;
        let userName = req.body.userName;
        let realName = req.body.realName;
        let state = req.body.state;
        let pageSize = req.body.pageSize;
        let currentPage = req.body.currentPage;
        //console.log(pageSize)
        userModal.userList(id,userName,realName,state,pageSize,currentPage).then((data) => {
            //console.log(data)
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    userListNum(req,res){
        let userName = req.body.userName;
        let realName = req.body.realName;
        let state = req.body.state;
        userModal.userListNum(userName,realName,state).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    userDelete(req,res){
        let id =req.body.id;
        let state =req.body.state;
        userModal.userDelete(state,id).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    userAdd(req,res){
        let userName = req.body.userName;
        let pwd = req.body.pwd;
        //let state = req.body.state;
        let role = req.body.role;
        userModal.userAdd(userName,pwd,role).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    //登陆
    login(req,res){
        "use strict";
        let userName = req.body.name;
        let pwd = req.body.pwd;
        // console.log(req.body);
        userModal.loginuser(userName,pwd).then(function(data){
            if(data.code==1){
                req.session.userInfo = data.data;
                console.log(req.session.userInfo)
                res.send({code:200,data:data.data});
            }else{
                res.send({code:400});
            }

            ////0: // 账号不存在 1 ://登录成功 2://密码不正确
        }).catch(function(err){
            console.log(err);
            res.send({code:500});
        });
    }
};