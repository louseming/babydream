/**
 * Created by zx on 2017/11/14.
 */
"use strict";
const orderModal = require("../modal/orderModal.js");

module.exports = {

    orderList(req,res){
        orderModal.orderList(null,null,null,5,1).then((data) => {
            res.render("orderList",{"data":data})
        })
    },
    orderListAjax(req,res){
        let id = req.body.id;
        let courierNum = req.body.courierNum;
        let state = req.body.state;
        let pageSize = req.body.pageSize;
        let currentPage = req.body.currentPage;
        console.log("ajax",courierNum)
        orderModal.orderList(id,courierNum,state,pageSize,currentPage).then((data) => {
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    orderListNum(req,res){
        let id = req.body.id;
        let state = req.body.state;
        orderModal.orderListNum(id,state).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    orderDelete(req,res){
        let id =req.body.id;
        let state =req.body.state;
        orderModal.orderDelete(state,id).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    orderListAjax2(req,res){
        let id = req.body.Id;
        let state = req.body.state;
        console.log(id)
        orderModal.orderList2(id,state).then((data) => {
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    update(req,res){
        let Id =req.body.Id;
        let courierNum =req.body.courierNum;
        let Address =req.body.Address;
        let Tel =req.body.Tel;
        let orderState =req.body.orderState;
        orderModal.update(courierNum,Address,Tel,orderState,Id).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },

};/**
 * Created by Administrator on 2017/11/16 0016.
 */
