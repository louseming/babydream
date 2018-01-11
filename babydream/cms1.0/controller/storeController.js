/**
 * Created by zx on 2017/11/14.
 */
"use strict";
const storeModal = require("../modal/storeModal.js");
let num;
module.exports = {
    //ejs显示
    storeList(req,res){
        storeModal.storeList(null,null,null,null,5,1).then((data) => {
            //console.log(data)
            console.log(111);
            res.render("storeManage",{data:data})
        })
    },
    //显示所有信息
    storeListAjax(req,res){
        let id = req.body.id;
        let name = req.body.name;
        let storage = req.body.storage;
        let state = req.body.state;
        let pageSize = req.body.pageSize;
        let currentPage = req.body.currentPage;
        //console.log(parseInt(id));
        storeModal.storeList(id,name,storage,state,pageSize,currentPage).then((data) => {
            //console.log(data)
            res.json({"code":200,"data":data});
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    //获取总条数
    storeListNum(req,res){
        let name = req.body.name;
        let storage = req.body.storage;
        let state = req.body.state;
        storeModal.storeListNum(name,storage,state).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        });
    },
    storeDelete(req,res){
        let id =req.body.id;
        let state =req.body.state;
        storeModal.storeDelete(state,id).then((data)=>{
            res.json({"code":200,"data":data})
        }).catch((err)=>{
            res.json({"code":500})
        })
    },
    //获取商品类型和颜色
    getTypeOrColor(req,res){
        storeModal.getTypeOrColor().then(function(data){
            res.json({"code":200,"data":data});
        }).catch(function(err){
            res.json({"code":500});
        })
    },
///添加商品
    getStoreAdd(req,res){
        let name=req.body.name;
        let price=req.body.price;
        let storage=req.body.storage;
        let img=req.body.img;
        let des=req.body.des;
        let type=parseInt(req.body.type);
        let date=new Date();
        let color=req.body.color;
        //let goodsImg=req.body.goodsImg;
        let userName=req.session.userName;
        userName='admin';
        let userId;
        //console.log(color);
        storeModal.userFind(userName).then(function(data){
            userId=data[0].id;
        }).then(function(data){
            storeModal.getStoreAdd(name,price,storage,img,des,type,date,color,userId).then(function(data){
                res.send("添加成功");
                //console.log("添加成功");
            }).catch(function(err){
                res.send(err);
                //console.log(err);
            })
        });
    },
    //添加商品类别
    addType(req,res){
        //let type=req.body.type;
        let typename=req.body.name;
        let createtime=new Date();
        let createUser=1;//从登录页面获取，存入session中
        storeModal.addType(typename,createUser,createtime).then(function(data){
            res.send("添加成功");
        }).catch(function(err){
            res.send(err);
        })
    },
    //根据id查找信息
    getGoodsById(req,res){
        let id=req.body.id;
        storeModal.getGoodsById(id).then(function(data){
            res.json({"code":200,"data":data});
        }).catch(function(err){
            res.send(err);
        })
    },
    //修改信息
    updateInfo(req,res){
        let id=req.body.id;
        let name=req.body.name;
        let price=req.body.price;
        let storage=req.body.storage;
        let Thumbnail=req.body.Thumbnail;
        let description=req.body.description;
        let type=req.body.type;
        let color=req.body.color;
        storeModal.updateInfo(id,name,price,storage,Thumbnail,description,type,color).then(function(data){
            res.send("修改成功");
        }).catch(function(err){
            res.send(err);
        })
    },
    //添加商品展示图片到数据库
    addStoreShowImg(req,res){
        let img = req.body.goodsImg;
        //let imgArr=img.split(",");
        let id;
        console.log("img",imgArr);
        storeModal.getLastById().then(function(data){
            id=data[0].id;
            console.log(id+"addmax");
        }).then(function(data){
            storeModal.getStoreImgAdd(id,img).then(function(data){
                res.send("添加成功");
            }).catch(function(err){
                res.send(err);
            })

        });

        /*for(let i=0;i<img.length;i++){
            storeModal.uploadStoreShowImg(img.path).then(function(data){
             res.send("修改成功");
             }).catch(function(err){
             res.send(err);
             })
        }*/

    },
    //删除商品类型
    delType(req,res){
        let type=req.body.type;
        storeModal.delType().then(function(data){
            res.send(data);
        }).catch(function(err){
            res.send(err);
        })
    },
//    huoquImg
    getImg(req,res){
        let id=req.body.id;
        storeModal.getImgById(id).then(function(data){
            res.send(data);
        }).catch(function(err){
            res.send(err);
        })
    },
    uploadStoreShowImg(req,res){
        let goodsId=req.body.goodsId;
        let img=req.body.imgArr;
        storeModal.uploadImg(goodsId,img).then(function(data){
            res.send("修改成功");
        }).catch(function(err){
            res.send(err);
        })
    }
};
