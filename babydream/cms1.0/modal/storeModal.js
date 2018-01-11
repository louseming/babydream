/**
 * Created by zx on 2017/11/14.
 */
"use strict";

const pool = require("./sqlPool.js");
module.exports = {
    //查询 ejs、ajax
    storeList(id,name,storage,state,pageSize,currentPage){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql=`SELECT a.*,userName,c.NAME AS storeType FROM goods AS a LEFT JOIN USER AS u ON a.createuser=u.id LEFT JOIN dictionary AS c ON a.TYPE=c.id  WHERE 1=1 `;
            let sql1= `SELECT a.*,userName,d.name AS goosdType FROM goods AS a LEFT JOIN USER AS u ON a.createuser=u.id LEFT JOIN dictionary AS d ON a.TYPE=d.Value where 1=1`;
            if (id){//�޸�ʱ��id�ͽ��������ѯ��һ������
                sql+=" and a.id = ? ";
                arr.push(id)
            }else{//�Ӳ�ѯ��input���ȡֵ�����û��д ����û��ѡ��Ϊundefined �Ͳ�����if
                if(name){
                    name = "%"+name+"%";
                    sql+=" and a.NAME like ? ";
                    arr.push(name)
                }
                if(storage){
                    sql+=" and a.storage = ? ";
                    arr.push(storage)
                }
                if(state){
                    sql+=" and a.State = ? ";
                    state=parseInt(state);
                    arr.push(state)
                }
                //pageSize= pageSize?pageSize:db.pageSize;
                pageSize=parseInt(pageSize);
                let start =(currentPage-1)*pageSize;
                sql+=" order by a.id limit ?,?";
                arr.push(start);
                arr.push(pageSize);
            }
            pool.query(sql,arr).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //查找总条数
    storeListNum(name,storage,state){
        return new Promise((resolve,reject)=>{
            let arr=[];
            let sql = `select count(1) as totleCount from goods where 1=1 `;
            if(name){
                name = "%"+name+"%";
                sql+=" and NAME like ? ";
                arr.push(name)
            }
            if(storage){
                storage =parseInt(storage);
                sql+=" and storage like ? ";
                arr.push(storage)
            }
            if(state){
                sql+=" and state = ? ";
                arr.push(state)
            }
            pool.query(sql,arr).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //修改状态
    storeDelete(state,id){
        return new Promise ((resolve,reject)=>{
            let sql= `update goods set State = ? where id = ?`;
            pool.query(sql,[state,id]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //获取商品类型和所有颜色
    getTypeOrColor(){
        return new Promise(function(resolve,reject){
            let sql="SELECT DISTINCT id,TYPE,NAME FROM dictionary";
            pool.query(sql,[]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //添加商品
    getStoreAdd(name,price,storage,img,des,type,date,color,userId){
        return new Promise(function(resolve,reject){
            color=","+color+",";
            //goodsImg=","+goodsImg+",";
            let sql=`insert into goods values(null,?,?,?,12345,?,?,?,?,?,1,default)`;
            pool.query(sql,[name,price,storage,img,des,type,color,date]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
        })
    },
    //添加展示图片
    getStoreImgAdd(GoodsId,imgSrc){
        return new Promise(function(resolve,reject){
            GoodsId=GoodsId+1;
            imgSrc=","+imgSrc+",";
            let sql=`insert into goodsimg values(null,?,?,default)`;
            pool.query(sql,[GoodsId,imgSrc]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //获取最后一个id
    getLastById(){
        return new Promise(function(resolve,reject){
            let sql=`select id from goods order by id desc`;
            pool.query(sql,[]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //添加类型
    addType(typename,createUser,createtime){
        return new Promise(function(resolve,reject){
            let sql="insert into dictionary values(null,'商品类型',?,?,?,default)";
            pool.query(sql,[typename,parseInt(createUser),createtime]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //根据ID获取商品信息
    getGoodsById(id){
        return new Promise(function(resolve,reject){
            let sql=`SELECT a.*,GROUP_CONCAT(b.Imgsrc) AS showImg,d.NAME AS typeName
                    FROM goods AS a LEFT JOIN goodsimg AS b ON a.Id=b.GoodsId LEFT JOIN dictionary AS d ON d.id=a.TYPE
                    WHERE 1=1 AND a.Id=?`;
            pool.query(sql,[id]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //根据id修改信息
    updateInfo(id,name,price,storage,Thumbnail,description,type,color){
        return new Promise(function(resolve,reject){
            color=","+color+",";
            let sql=`update goods set NAME=?,Price=?,STORAGE=?,Thumbnail=?,description=?,TYPE=?,colorid=? where Id=?`;
            pool.query(sql,[name,parseInt(price),parseInt(storage),Thumbnail,description,parseInt(type),color,parseInt(id)]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    //通过保存在session中的userName找出对应的id
    userFind(userName){
        return new Promise(function(resolve,reject){
            let sql="select id from user where userName=?";
            pool.query(sql,[userName]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    },
    getImgById(id){
        return new Promise(function(resolve,reject){
            let sql=`select Imgsrc from goodsimg where GoodsId=?`;
            pool.query(sql,[parseInt(id)]).then(function(data){
                resolve(data);
            }).catch(function (err) {
                reject(err);
            })
        })
    },
    uploadImg(goodsId,img){
        return new Promise(function(resolve,reject){
            img=","+img+",";
            let sql=`update goodsimg set Imgsrc=? where GoodsId =?`;
            pool.query(sql,[img,parseInt(goodsId)]).then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            })
        })
    }
};