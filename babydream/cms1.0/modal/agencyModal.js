/**
 * Created by zx on 2017/11/14.
 */
"use strict";

const pool = require("./sqlPool.js");


module.exports = {
    //列表 ejs，ajax，查询
    agencyList(id,agencyName,state,pageSize,currentPage){

        return new Promise ((resolve,reject)=>{
            let arr=[];

            let sql = `select a.*,u.userName from agency as a left join user as u on a.createUser=u.id where 1=1`;
            if (id){//修改时传id就进入这里，查询出一条数据
                sql+=" and a.id = ? ";
                arr.push(id)
            }else{//从查询的input框获取值，如果没有写 或者没有选就为undefined 就不进入if
                if(agencyName){
                    agencyName = "%"+agencyName+"%";
                    sql+=" and a.NAME like ? ";
                    arr.push(agencyName)
                }
                if(state){
                    sql+=" and a.state = ? ";
                    arr.push(state)
                }
                //pageSize= pageSize?pageSize:db.pageSize;
                pageSize=parseInt(pageSize);
                let start =(currentPage-1)*pageSize;
                console.log(pageSize)
                console.log(start)
                sql+=" order by a.id limit ?,?";
                arr.push(start);
                arr.push(pageSize);
                console.log(sql)
            }

            pool.query(sql,arr).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //获取总条数
    agencyListNum(agencyName,state){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `select count(1) as totleCount from agency where 1=1 `;
            if(agencyName){
                agencyName = "%"+agencyName+"%";
                sql+=" and agencyName like ? ";
                arr.push(agencyName)
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
    agencyDelete(state,id){
        return new Promise ((resolve,reject)=>{
            let sql= `update agency set state = ? where id = ?`;
            pool.query(sql,[state,id]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //
    agencyAdd(agencyName,pwd,state,role){
        return new Promise((resolve, reject)=> {
            let sql = `INSERT INTO agency VALUES (NULL,?,?,NULL,NULL,NULL,NULL,NOW(),?,?);`;
            pool.query(sql, [agencyName,pwd,role,state]).then((data)=> {
                resolve(data)
            }).catch((err)=> {
                reject(err)
            })
        })
    },
    //修改moddal
    agencyUpdate(txtAddAgencyName,txtAddPwd,state,id){
        return new Promise((resolve, reject)=> {
            let sql = `update agency set name =?,img = ? , state =? where id =? ;`;
            pool.query(sql, [txtAddAgencyName,txtAddPwd,state,id]).then((data)=> {
                resolve(data)
            }).catch((err)=> {
                reject(err)
            })
        })
    }
};