/**
 * Created by zx on 2017/11/14.
 */
"use strict";
const pool = require("./sqlPool.js");
module.exports = {
    //列表 ejs，ajax，查询
    bbsList(id,title,theme,type,userName,state,pageSize,currentPage){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql="SELECT m.*,u.userName FROM momchat AS m LEFT JOIN USER AS u ON m.userid=u.id where 1=1";
            if (id){//修改时传id就进入这里，查询出一条数据
                sql+=" and m.id = ? ";
                arr.push(id)
            }else{//从查询的input框获取值，如果没有写 或者没有选就为undefined 就不进入if
                if(userName){
                    userName = "%"+userName+"%";
                    sql+=" and u.userName like ? ";
                    arr.push(userName)
                }
                if(title){
                    title = "%"+title+"%";
                    sql+=" and m.title like ? ";
                    arr.push(title)
                }
                if(state){
                    sql+=" and m.state = ? ";
                    arr.push(state)
                }
                pageSize=parseInt(pageSize);
                let start =(currentPage-1)*pageSize;
                sql+=" order by m.id limit ?,?";
                arr.push(start);
                arr.push(pageSize);
            }
            // console.log(arr);
            console.log("asdasd",sql);
            pool.query(sql,arr).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //修改用户的状态(假删除)
    bbsDelete(state,id){
        return new Promise ((resolve,reject)=>{
            let sql= `update momchat set state = ? where id = ?`;
            pool.query(sql,[state,id]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //获取总条数
    bbsListNum(userName,title,state){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `select count(1) as totleCount from momchat as m left join user as u on m.userid=u.id where 1=1 `;
            if(userName){
                userName = "%"+userName+"%";
                sql+=" and u.userName like ? ";
                arr.push(userName)
            }
            if(title){
                title = "%"+title+"%";
                sql+=" and m.title like ? ";
                arr.push(title)
            }
            if(state){
                sql+=" and m.state = ? ";
                arr.push(state)
            }
            pool.query(sql,arr).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },

}

