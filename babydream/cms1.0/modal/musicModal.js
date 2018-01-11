/**
 * Created by Administrator on 2017/11/16 0016.
 */
"use strict";
const pool=require("./sqlPool.js");

module.exports={
//音乐列表操作

    //音乐列表 ejs，ajax，查询
    musicList(id,musicName,musicPath,createUser,state,pageSize,currentPage){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `SELECT m.*,u.username FROM musiclist AS m LEFT JOIN USER AS u ON u.id=m.createuser  where m.type=1`;
            if (id){//修改时传id就进入这里，查询出一条数据
                sql+=" and m.id = ? ";
                arr.push(id)
            }else{//从查询的input框获取值，如果没有写 或者没有选就为undefined 就不进入if
                if(musicPath){
                    musicName = "%"+musicPath+"%";
                    sql+=" and m.musicPath like ? ";
                    arr.push(musicPath)
                }
                if(musicName){
                    musicName = "%"+musicName+"%";
                    sql+=" and m.musicName like ? ";
                    arr.push(musicName)
                }
                if(createUser){
                    createUser = "%"+createUser+"%";
                    sql+=" and u.username like ? ";
                    arr.push(createUser)
                }
                if(state){
                    sql+=" and m.state = ? ";
                    arr.push(state)
                }
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
    musicListNum(musicName,createUser,state){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `select count(1) as totleCount from musicList  where type=1 `;
            if(musicName){
                musicName = "%"+musicName+"%";
                sql+=" and musicName like ? ";
                arr.push(musicName)
            }
            if(createUser){
                createUser = "%"+createUser+"%";
                sql+=" and createUser like ? ";
                arr.push(createUser)
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
    //新增音乐列表数据
    add(musicName,musicPath,musicType,createUser,state){
        return new Promise((resolve,reject)=>{
            let sql="insert into musicList values (null,?,?,?,now(),?,?)";
            pool.query(sql,[musicName,musicPath,musicType,createUser,state]).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                console.log(err);
                reject(err)
            })
        })
    },

//歌单列表操作
    //歌单列表 ejs，ajax，查询
    songList(id,musicName,musicPath,createUser,state,pageSize,currentPage){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `SELECT m.*,u.username FROM musiclist AS m LEFT JOIN USER AS u ON u.id=m.createuser  where m.type=2`;
            if (id){//修改时传id就进入这里，查询出一条数据
                sql+=" and m.id = ? ";
                arr.push(id)
            }else{//从查询的input框获取值，如果没有写 或者没有选就为undefined 就不进入if
                if(musicName){
                    musicName = "%"+musicName+"%";
                    sql+=" and m.musicName like ? ";
                    arr.push(musicName)
                }
                if(musicPath){
                    musicName = "%"+musicPath+"%";
                    sql+=" and m.musicPath like ? ";
                    arr.push(musicPath)
                }
                if(createUser){
                    createUser = "%"+createUser+"%";
                    sql+=" and u.username like ? ";
                    arr.push(createUser)
                }
                if(state){
                    sql+=" and m.state = ? ";
                    arr.push(state)
                }
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
    songListNum(musicName,createUser,state){
        return new Promise ((resolve,reject)=>{
            let arr=[];
            let sql = `select count(1) as totleCount from musicList where type=2 `;
            if(musicName){
                musicName = "%"+musicName+"%";
                sql+=" and musicName like ? ";
                arr.push(musicName)
            }
            if(createUser){
                createUser = "%"+createUser+"%";
                sql+=" and createUser like ? ";
                arr.push(createUser)
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
    //删除歌单列表
    del(state,id){
        return new Promise ((resolve,reject)=>{
            let sql= `update musicList set state = ? where id = ?`;
            pool.query(sql,[state,id]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
};