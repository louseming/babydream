/**
 * Created by zx on 2017/11/14.
 */
"use strict";

const pool = require("./sqlPool.js");


module.exports = {
    //列表 ejs，ajax，查询
    userList(id,userName,realName,state,pageSize,currentPage){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `select * from user where 1=1`;
            if (id){//修改时传id就进入这里，查询出一条数据
                sql+=" and id = ? ";
                arr.push(id)
            }else{//从查询的input框获取值，如果没有写 或者没有选就为undefined 就不进入if
                if(userName){
                    userName = "%"+userName+"%";
                    sql+=" and userName like ? ";
                    arr.push(userName)
                }
                 if(realName){
                     realName = "%"+realName+"%";
                    sql+=" and realName like ? ";
                    arr.push(realName)
                }
                if(state){
                    sql+=" and state = ? ";
                    arr.push(state)
                }
                //pageSize= pageSize?pageSize:db.pageSize;
                pageSize=parseInt(pageSize);
                let start =(currentPage-1)*pageSize;
                sql+=" order by id limit ?,?";
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
    //获取总条数
    userListNum(userName,realName,state){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `select count(1) as totleCount from user where 1=1 `;
            if(userName){
                userName = "%"+userName+"%";
                sql+=" and userName like ? ";
                arr.push(userName)
            }
            if(realName){
                realName = "%"+realName+"%";
                sql+=" and realName like ? ";
                arr.push(realName)
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
    userDelete(state,id){
        return new Promise ((resolve,reject)=>{
            let sql= `update user set state = ? where id = ?`;
            pool.query(sql,[state,id]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //
    userAdd(userName,pwd,role){
        return new Promise((resolve, reject)=> {
            let sql = `INSERT INTO USER VALUES (NULL,?,?,NULL,NULL,NULL,NULL,NOW(),?,default);`;
            pool.query(sql, [userName,pwd,role]).then((data)=> {
                resolve(data)
            }).catch((err)=> {
                reject(err)
            })
        })
    },
    //登陆
    loginuser(userName,pwd){
    "use strict";
    return new Promise(function (resolve, reject) {
        let sql = "select * from user where userName=? and state = 1 and role =1" ;
        pool.query(sql,[userName])
            .then(function(data){
                let result;
                if(data.length>0){
                    if(data[0].pwd==pwd){
                        result = 1 ; //登录成功
                    }else{
                        result = 2; //密码不正确
                    }
                }else{
                    result = 0; // 账号不存在
                }
                if(result==1)
                    resolve({code:result,data:data[0]});
                else
                    resolve({code:result});
            }).catch(function(err){
                reject(err);
            });
    });
}
};