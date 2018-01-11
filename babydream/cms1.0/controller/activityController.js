/**
 * Created by 饶江敏 on 2017/11/14.
 */
"use strict";
const activityModal=require("../modal/activityModal.js");
module.exports={
    getListPage(req,res){
        let name=req.body.name;
        let hoster=req.body.hoster;
        let createUser=req.body.createUser;
        let state=req.body.state;
        activityModal.getListPage(name,hoster,createUser,state).then(function(data){
            res.json(data);
        }).catch(function(err){
            res.send(err);
        })
    },
    //查询、ejs
    activityList(req,res){
        let id=req.body.id;
        let name=req.body.name;
        let hoster=req.body.hoster;
        let createUser=req.body.createUser;
        let state=req.body.state;
        let currentPage=req.body.currentPage;
        let pageSize=req.body.pageSize;
        activityModal.activityList(id,name,hoster,createUser,state,currentPage,pageSize).then(function(data){
            res.send(data);
        }).catch(function(err){
            res.send(err);
        })
    },
    //修改信息
    getUpdate(req,res){
        let id=req.body.id;
        let name=req.body.name;
        let state=req.body.state;
        let totalperson=req.body.totalperson;
        let outorin=req.body.outorin;
        let hoster=req.body.hoster;
        let details=req.body.details;
        let flowpath=req.body.flowpath;
        let address=req.body.address;
        let thumbnail=req.body.thumbnail;
        console.log(address);
        console.log(details);
        console.log(flowpath);
        //console.log(address);
        activityModal.getUpdate(id,name,state,totalperson,outorin,hoster,details,flowpath,address,thumbnail).then(function(data){
            res.send("修改成功");
        }).catch(function(err){
            res.send("修改失败")
        })
    },
    //添加信息
    getAdd(req,res){
        let name=req.body.name;
        let jointime=req.body.jointime;
        let hoster=req.body.hoster;
        let outorin=req.body.door;
        let address=req.body.address;
        let createtime=new Date();
        let totalperson=req.body.totalperson;
        let startdate=req.body.startdate;
        let enddate=req.body.enddate;
        let type=req.body.type;
        let age=req.body.age;
        let thumbnail=req.body.thumbnail;
        let details=req.body.details;
        let flowpath=req.body.flowpath;
        console.log(createtime);
        let userName=req.session.userName;
        userName=1;
        activityModal.getAdd(name,thumbnail,jointime,hoster,outorin,address,details,flowpath,createtime,totalperson,startdate,enddate,userName,type,age).then(function(data){
            res.send("添加成功");
        }).catch(function(err){
            res.send(err);
        })
    },
    //获取用户名
    getUserId(req,res){
        console.log(req.session.userInfo);
        let userName=req.session.userInfo;
        activityModal.getUserId(userName).then(function(data){
            res.send(data);
        })
    },
    //删除信息（修改状态）
    getDel(req,res){
        let id=req.body.id;
        let state=req.body.state;
        activityModal.getDel(id,state).then(function(data){
            res.json(data);
        }).catch(function(err){
            res.send("删除失败");
        })
    },
    //查询信息
    getSearch(req,res){
        let id=req.body.id;
        let name=req.body.name;
        let hoster=req.body.hoster;
        let createUser=req.body.createUser;
        let state=req.body.state;
        let currentPage=req.body.currentPage;
        let pageSize=req.body.pageSize;
        activityModal.getSearch(id,name,hoster,createUser,state,currentPage,pageSize).then(function(data){
          res.json({"code":200,"data":data});
        }).catch(function(err){
            res.send(err);
        }).then(function(){//查找条数
            activityModal.getListPage().then(function(data){
                res.send(data);
            }).catch(function(err){
                res.send(err);
            })
        })
    },
    //根据id查出信息
    getInfoById(req,res){
        let id=req.body.id;
        console.log(id+"byId");
        activityModal.getInfo(id).then(function(data){
            console.log("cnotroller in",data);
            res.send(data);
        }).catch(function(err){
            res.send(err);
        })
    },
    getList(req,res){

        activityModal.activityList(null,null,null,null,null,1,5).then(function(data){
            console.log(data);
            res.render("activityManage",{"code":200,"data":data});
        })
    },
    //getList1(req,res){
    //    let id=req.body.id;
    //    let name=req.body.name;
    //    let hoster=req.body.hoster;
    //    let createUser=req.body.createUser;
    //    let state=req.body.state;
    //    let currentPage=req.query.currentPage;
    //    let pageSize=req.query.pageSize;
    //    activityModal.getList(currentPage,pageSize).then(function(data){
    //        console.log(data);
    //        res.json({"code":200,"data":data});
    //    })
    //},
    //
    getAgeAndType(req,res){
        activityModal.getAgeAndType().then(function(data){
            res.json({code:200,"data":data});
        }).catch(function(err){
            res.json({code:500,message:err});
        })
    }
};