/**
 * Created by zx on 2017/11/14.
 */
"use strict";

const pool = require("./sqlPool.js");


module.exports = {
    //列表 ejs，ajax，查询
    orderList(id,courierNum,state,pageSize,currentPage){

        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `select a.*,u.*,c.*,a.state as orderstate  from orderList as a left join user as u on a.userid=u.id left join address as c on a.addressid=c.id  where 1=1`;
            if (id){//修改时传id就进入这里，查询出一条数据
                sql+=" and a.id = ? ";
                arr.push(id)
            }else{//从查询的input框获取值，如果没有写 或者没有选就为undefined 就不进入if
                if (id){
                    sql+=" and a.id = ? ";
                    arr.push(id)}
                if(courierNum){
                    courierNum = "%"+courierNum+"%";
                    sql+=" and a.courierNum like ? ";
                    arr.push(courierNum)
                }
                if(state){
                    sql+=" and a.state = ? ";
                    arr.push(state)
                }
                pageSize=parseInt(pageSize);
                let start =(currentPage-1)*pageSize;


                sql+=" order by a.id limit ?,?";
                arr.push(start);
                arr.push(pageSize);

            }
            console.log(sql)
            pool.query(sql,arr).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //获取总条数
    orderListNum(courierNum,state){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `select count(1) as totleCount from orderList where 1=1 `;
            if(courierNum){
                courierNum = "%"+courierNum+"%";
                sql+=" and courierNum like ? ";
                arr.push(courierNum)
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
    //修改用户的状态(假删除)
    orderDelete(state,id){
        return new Promise ((resolve,reject)=>{
            let sql= `update orderList set State = ? where Id = ?`;
            console.log(sql)
            pool.query(sql,[state,id]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //
    update(courierNum,Address,Tel,orderState,Id){
        console.log(courierNum)
        console.log(Address)
        console.log(Tel)
        console.log(orderState)
        console.log(Id)
        return new Promise((resolve, reject)=> {
            let sql = `UPDATE orderList AS a LEFT JOIN orderGoods AS b ON a.id=b.ordereid LEFT JOIN Goods AS c ON b.goodsId=c.id LEFT JOIN Address AS d ON a.Addressid=d.id SET a.courierNum =?,d.address=?,d.tel=?,a.State=? WHERE a.Id=?;`;
          console.log(sql)
            pool.query(sql,[courierNum,Address,Tel,orderState,Id]).then((data)=> {
                resolve(data)
                console.log("update",data)
            }).catch((err)=> {
                reject(err)
            })
        })
    },
    orderList2(id,state){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `select a.*,b.*,c.*,d.*,a.state as orderstate,c.name as goodsname,a.Id as orderId from orderList as a left join orderGoods as b on a.id=b.ordereid left join Goods as c on b.goodsId=c.id left join Address as d on a.Addressid=d.id  where 1=1 `;
            if(id){
                sql+=" and a.id = ? ";
                arr.push(id)
            }
            if(state){
                sql+=" and a.state = ? ";
                arr.push(state)
            }
            console.log(sql)
            console.log(arr)
            pool.query(sql,arr).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
};/**
 * Created by Administrator on 2017/11/16 0016.
 */
