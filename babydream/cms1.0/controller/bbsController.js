/**
 * Created by zx on 2017/11/14.
 */
"use strict";
const bbsModal = require("../modal/bbsModal.js");
module.exports={
    bbsList(req,res){
        bbsModal.bbsList(null,null,null,null,null,null,5,1).then((data) => {
            // console.log(data)
            res.render("bbsList",{"data":data})
        }).catch(function (err) {
            console.log(err)
        })
    },
    bbsListAjax(req,res){
        let id = req.body.id;
        let userName = req.body.userName;
        let title = req.body.title;
        let state = req.body.state;
        let theme = req.body.theme;
        let type = req.body.type;
        let pageSize = req.body.pageSize;
        let currentPage = req.body.currentPage;
         // console.log(title);
        bbsModal.bbsList(id,title,theme,type,userName,state,pageSize,currentPage).then((data) => {
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    bbsDelete(req,res){
        let id =req.body.id;
        let state =req.body.state;
        bbsModal.bbsDelete(state,id).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
        bbsListNum(req,res){
            let userName = req.body.userName;
            let title = req.body.title;
            let state = req.body.state;
            bbsModal.bbsListNum(userName,title,state).then((data)=>{
                res.json({"code":200,"data":data})
            }).catch((err)=>{
                res.json({"code":500})
            })
        }


}