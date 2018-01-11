/**
 * Created by zx on 2017/11/14.
 */
"use strict";
const replyModal = require("../modal/replyModal.js");

module.exports = {

    //请求视频回复页面
    videoComment(req,res){
        replyModal.videoComment(null,null,null,5,1).then((data) => {
            console.log(data);
            res.render("videoCommentList",{"data":data})
        })
    },
    videoCommentAjax(req,res){
        let id = req.body.id;
        let userName = req.body.userName;
        let state = req.body.state;
        let pageSize = req.body.pageSize;
        let currentPage = req.body.currentPage;
        replyModal.videoComment(id,userName,state,pageSize,currentPage).then((data) => {
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    //删除评论
    videoDelete(req,res){
        let id =req.body.id;
        let state =req.body.state;
        replyModal.videoDelete(state,id).then((data)=>{
            console.log(data);
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            console.log(err);
            res.json({"code":500})
        })
    },
    //请求总条数
    videoCommentNumber(req,res){
        let userName = req.body.userName;
        let state = req.body.state;
        console.log(userName);
        replyModal.videoCommentNumber(userName,state).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },

    replyList(req,res){
        replyModal.replyList(null,null,null,4,1).then((data) => {
            //console.log(data)
            res.render("replyList",{"data":data})
        })
    },


    replyListAjax(req,res){
        let id = req.body.id;
        let userName = req.body.userName;
        let state = req.body.state;
        let pageSize = req.body.pageSize;
        let currentPage = req.body.currentPage;
        //console.log(pageSize)
        replyModal.replyList(id,userName,state,pageSize,currentPage).then((data) => {
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },


    replyListNum(req,res){
        let userName = req.body.userName;
        let state = req.body.state;
        replyModal.replyListNum(userName,state).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    //添加
    addReply(req,res){
        let userId=req.body.userId;
        let content=req.body.content;
        let praise=req.body.praise;
        let LEVEL=req.body.LEVEL;
        let DATE=req.body.DATE;
        let state=req.body.state;
        // console.log(createuser);
        replyModal.addReply(userId,content,praise,LEVEL,DATE,state).then(function(data){
            //console.log(data);
            if(data.affectedRows>0){
                res.send("添加成功");
            }
        }).catch(function(err){
            res.send("添加失败");
        })
    },
    //修改username,content,invitatid,paraise,LEVEL,createTime,state,userId,id
    replyUpdate(req,res){
        let id=req.body.id;
        //let courseName=req.body.username;
        let title=req.body.title;
        let invitatid=req.body.content;
        let praise=req.body.praise;
        //let LEVEL=req.body.LEVEL;
        let userName=req.body.username;
        //let userName=req.session.username;
        console.log(title)
        replyModal.replyUpdate(userName,invitatid,title,praise,id).then(function(data){
            res.send("修改成功");
        }).catch(function(err){
            console.log(err);
            res.send("修改失败")
        })
    },
    //根据id查出信息
    replyInfo(req,res){
        let id=req.body.id;
        replyModal.replyInfo(id).then(function(data){
            res.send(data);
        }).catch(function(err){
            res.send(err);
        })
    },
    replyDelete(req,res){
        let id =req.body.id;
        let state =req.body.state;
        replyModal.replyDelete(state,id).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    }
};