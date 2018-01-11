/**
 * Created by zx on 2017/11/14.
 */
"use strict";

const courseModal = require("../modal/courseModal.js");

module.exports = {
    articleList(req,res){
        //console.log(1)
        courseModal.articleList(null,null,null,null,5,1).then((data)=>{
            //console.log(data)
            res.render("articleList",{"data":data});
        })
    },
    articleListAjax(req,res){
        let id = req.body.id;
        let title = req.body.title;
        let author = req.body.author;
        let state = req.body.state;
        let pageSize = req.body.pageSize;
        let currentPage = req.body.currentPage;
        //console.log(pageSize)
        courseModal.articleList(id,title,author,state,pageSize,currentPage).then((data) => {
            //console.log(data)
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    articleListNum(req,res){
        let title = req.body.title;
        let author = req.body.author;
        let state = req.body.state;
        courseModal.articleListNum(title,author,state).then((data)=>{
            //console.log(data)
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    articleDelete(req,res){
        let id =req.body.id;
        let state =req.body.state;
        courseModal.articleDelete(state,id).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    articleAdd(req,res){
        let title = req.body.title;
        let content = req.body.htmlStr;
        let author = req.body.author;
        let path = req.body.thumbnail;
        let typeid = req.body.typeid;
        let userName = req.session.userName;
        let userId;
        userName = 'admin';

        courseModal.userFind(userName).then((data)=>{
            userId = data.data[0].id
        }).then(()=>{
            courseModal.articleAdd(title,author,path,content,typeid,userId).then((data)=>{
                res.json({"code":200,"data":data})
            }).catch((err)=>{
                console.log(err);
                res.json({"code":500})
            })
        }).catch((err)=>{
            console.log(err);
            res.json({"code":500})
        })
    },
    articleEdit(req,res){
        let id = req.params.id;
        let param;
        //console.log(id);
        courseModal.articleList(id).then((data)=>{
            //console.log(data)
            param=data;
            return courseModal.articleType()
        }).then((data)=>{
            console.log(data);
            res.render("articleEdit",{"data":param,"id":id,"type":data});
        }).catch((err)=>{
            console.log(err)
        })
    },
    articleAddPage(req,res){
        courseModal.articleType().then((data)=>{
            res.render("articleAdd",{"type":data});
        }).catch((err)=>{
            console.log(err)
        })
    },
    articleUpdate(req,res){
         let title = req.body.title;
         let author = req.body.author;
         let htmlStr = req.body.htmlStr;
        let typeid = req.body.typeid;
        let path = req.body.thumbnail;
         let id = req.body.id;
        console.log(req.body)
         courseModal.articleUpdate(title,author,path,htmlStr,typeid,id).then((data)=>{
             res.json({"code":200,"data":data})
         }).catch((err)=>{
             console.log(err);
             res.json({"code":500})
         })
    },
    courseList(req,res){
        courseModal.courseList(null,null,null,null,5,1).then((data) => {
            //console.log(data)
            res.render("courseList",{"data":data})
        })
    },


    courseListAjax(req,res){
        let id = req.body.id;
        let courseName = req.body.courseName;
        let createUser = req.body.createUser;
        let state = req.body.state;
        let pageSize = req.body.pageSize;
        let currentPage = req.body.currentPage;
        //console.log(pageSize)
        courseModal.courseList(id,courseName,createUser,state,pageSize,currentPage).then((data) => {
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },


    courseListNum(req,res){
        let courseName = req.body.courseName;
        let createUser = req.body.createUser;
        let state = req.body.state;
        courseModal.courseListNum(courseName,createUser,state).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    //添加
    addCourse(req,res){
        let courseName=req.body.courseName;
        let stageId=req.body.stageId;
        let courseDes=req.body.courseDes;
        let videoSrc=req.body.videoSrc;
        let praise=req.body.praise;
        let collect=req.body.collect;
        let DATE=req.body.DATE;
        let createuser=req.body.createuser;
        //let userName=req.session.userName;
        let userID;
        let userName='admin';
        // console.log(createuser);
        courseModal.addCourse(courseName,stageId,courseDes,videoSrc,praise,collect,DATE,userName,userID).then(function(data){
            if(data.affectedRows>0){
                res.send("添加成功");
            }
        }).catch(function(err){
            res.send("添加失败");
        })
    },
    //修改
    courseUpdate(req,res){
        let id=req.body.id;
        let courseName=req.body.courseName;
        //let stageId=req.body.stageId;
        let courseDes=req.body.courseDes;
        let videoSrc=req.body.videoSrc;
        let praise=req.body.praise;
        let collect=req.body.collect;
        //let createuser=req.body.createuser;
        let stageName=req.body.stagename;
        //let userName=req.session.username;
        courseModal.courseUpdate(courseName,courseDes,videoSrc,praise,collect,stageName,id).then(function(data){
            res.send("修改成功");
        }).catch(function(err){
            res.send("修改失败")
        })
    },
    //根据id查出信息
    courseInfo(req,res){
        let id=req.body.id;
        courseModal.courseInfo(id).then(function(data){
            res.send(data);
        }).catch(function(err){
            res.send(err);
        })
    },
    courseDelete(req,res){
        let id =req.body.id;
        let state =req.body.state;
        courseModal.courseDelete(state,id).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    }
};



