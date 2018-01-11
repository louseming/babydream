/**
 * Created by Mr.Zzy on 2017/11/14.
 */
"use strict";
const elseModal=require("../modal/elseModal.js");

module .exports={
    getList(req,res){
        elseModal.getList().then((data)=>{
            res.render("specialist",{"data":data});
        }).catch((err)=>{
            res.send({code:500,err})
        })
    },
    getList1(req,res){
        elseModal.getList().then((data)=>{
            res.json({"data":data});
        }).catch((err)=>{
            res.send({code:500,err})
        })
    },
    //分页查询
    getNumber(req,res){
        let nameber =req.body.nameber;
        let name =req.body.name;
        let page=req.body.page;
        var pageUye={};
        elseModal.getNber(nameber,name,page).then(function(data){
            pageUye.data=data;   //   分页获取的数据
            elseModal.getpage(nameber,name).then(function(data){
                pageUye.suec=data;
                res.send(pageUye)
            })
            //res.json({"data":data});
        }).catch(function(err){
            res.send(err)
        })
    },
    getXin(req,res){
        let name=req.body.name;
        let title=req.body.uname;
        let date=req.body.createdate;
        let state =req.body.state;
        let des=req.body.des;
        let createUser=1;//登陆人保存的用户id 默认为1
        elseModal.getXine(name,title,des,createUser,date,state).then(function(data){
            res.json({"code":200,"data":data})
        }).catch(function(err){
            console.log(err);
            res.json({code:500});
        })
    },
    statestate(req,res)
    {
        var id=req.body.id;
        var state=req.body.state;
        elseModal.starytstate(parseInt(id),state).then((data)=>{
            res.send(data)
        }).catch((err)=>{
            console.log(err.message)
        })
    },
    getSpecial(req,res)
    {
        var id=req.body.id;
        elseModal.getSpecail(id).then((data)=>{
            res.send(data)
        }).catch((err)=>{
            console.log(err.message)
        })

    },
    updateSpectial(req,res)
    {
        //let {id,name,title,state,des}=req.body;
        let id =req.body.id
        let name=req.body.name;
        let title=req.body.uname;
        let state =req.body.state;
        let des=req.body.des;
        elseModal.updateSpectialbyid(id,name,title,state,des).then((data)=>{
            res.send(data)
        }).catch((err)=>{
            console.log(err.message)
        })
    }


};