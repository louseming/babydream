/**
 * Created by zx on 2017/11/14.
 */
"use strict";
const agencyModal = require("../modal/agencyModal.js");

module.exports = {

    agencyList(req,res){
        agencyModal.agencyList(null,null,null,5,1).then((data) => {
            res.render("agencyList",{"data":data})
        })
    },
    agencyListAjax(req,res){
        let id = req.body.id;
        let agencyName = req.body.agencyName;
        let state = req.body.state;
        let pageSize = req.body.pageSize;
        let currentPage = req.body.currentPage;
        console.log("ajax",id)
        agencyModal.agencyList(id,agencyName,state,pageSize,currentPage).then((data) => {
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    agencyListNum(req,res){
        let agencyName = req.body.agencyName;
        let state = req.body.state;
        agencyModal.agencyListNum(agencyName,state).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    agencyDelete(req,res){
        let id =req.body.id;
        let state =req.body.state;
        agencyModal.agencyDelete(state,id).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
     agencyAdd(req,res){
         let agencyName = req.body.agencyName;
         let pwd = req.body.pwd;
         let state = req.body.state;
         let role = req.body.role;
         agencyModal.agencyAdd(agencyName,pwd,state,role).then((data)=>{
             res.json({"code":200,"data":data})
         }).catch((err)=>{
             res.json({"code":500})
         })
     },
    //angecyController
    agencyUpdate(req,res){
        let txtAddAgencyName = req.body.txtAddAgencyName;
        let txtAddPwd = req.body.txtAddPwd;
        let state = req.body.state;
        let id = req.body.id;
        agencyModal.agencyUpdate(txtAddAgencyName,txtAddPwd,state,id).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    }
};/**
 * Created by Administrator on 2017/11/16 0016.
 */
