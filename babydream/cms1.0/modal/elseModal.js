/**
 * Created by Mr.Zzy on 2017/11/14.
 */
"use strict";
const pool=require("./sqlPool.js");
// 获取专家表中所有专家数据
module .exports={
    getList(){
        return new Promise(function(resolve,reject){
            let sql="select * from specialist";
            pool.query(sql,[]).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    //分页 显示数据
    getNber(nameber,name,page){
        return new Promise(function(resolve,reject){
            let parame=[];
            let sql="select *  from specialist where 1=1";
            if(nameber)
            {
                sql+=" and id=?";
                parame.push(nameber)
            }
            if(name)
            {
                sql+=" and NAME like ?";
                parame.push("%"+name+"%")
            }
            if(page)
            {
                sql+=" limit ?,?";  //  获取ID的值
                parame.push((page-1)*4); // 添加总页数
                parame.push(4);// 每页显示4条数据
            }
            pool.query(sql,parame,(err,data)=>{
                if(err)
                {
                    console.log(err.message);
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    //  分页 查询
    getpage(nameber,name){
        return new Promise((resolve,reject)=>{
            let sql =" select count(*) as toltal from specialist where 1=1";
            nameber=nameber||"";
            name=name||"";
            let param=[];
            if(nameber!="")
            {
                sql+=" and id=?";
                param.push(nameber)
            }
            if(name!="")
            {
                sql+=" and name like ?";
                param.push("%"+name+"%")
            }
            console.log(sql)
            pool.query(sql,param,(err,data)=>{
                if(err)
                {
                    console.log("fgdfg",err.message);
                    reject(err)
                }else{
                    resolve(data)
                }
            })

        })
    },
    // 新增的数据
    getXine(name,title,des,createUser,date,state){
        console.log('数据为',name,title,createUser,date,state)
        return new Promise((resolve,reject)=>{
            let sql ="INSERT INTO specialist VALUES (?,?,?,?,?,?,?)";
            pool.query(sql,[null,name,title,des,parseInt(createUser),date,state]).then((data)=>{
                resolve(data);
            }).catch((err)=> {
                console.log(err);
                reject(err)
            })
        })
    },
    //启用禁用
    starytstate(id,state)
    {
        return new Promise((resolve,reject)=>{
            pool.query("update specialist set state=? where id=?",[state,id],(err,data)=>{
                if(err)
                {
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    // 返回修改ID发送请求得到当前id的表中数据的值显示到模态框
    getSpecail(id)
    {
        return new Promise((resolve,reject)=>{
            pool.query("select * from  specialist  where id=?",[id],(err,data)=>{
                if(err)
                {
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    },
    // 修改的数据
    updateSpectialbyid(id,name,title,state,des){
        return new Promise((resolve,reject)=>{
            pool.query("update  specialist set name=?,title=?,state=?,description=? where id=?",
                [name,title,parseInt(state),des,parseInt(id)],(err,data)=>{
                if(err)
                {
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    }

};