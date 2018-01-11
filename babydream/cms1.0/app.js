/**
 * Created by zx on 2017/10/31.
 */
"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const logger = require("morgan");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const myEjs = require("ejs");
const multer = require("multer");
//日志
app.use(logger("dev"));

//配置ejs
app.set("views",__dirname+"/views");
app.engine("html",myEjs.__express);
app.set("view engine","html");

//读取post数据
app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.bodyParser({uploadDir:'./public/upload'}));

//上传文件配置
app.use(multer({dest:'./public/upload',rename:function (filedname,filename) {
    return filename+"_"+Date.now();
}}));


//路由引用
const userRoute = require("./route/userRouter.js");
const viewRoute = require("./route/viewRouter.js");
const courseRoute = require("./route/courseRouter.js");
const uploadRoute = require("./route/uploadRouter.js");
const musicRoute = require("./route/musicRouter.js");
const agencyRoute = require("./route/agencyRouter.js");
const orderRoute = require("./route/orderRouter.js");
const replyRoute = require("./route/replyRouter");
const elesRoute = require("./route/elseRoute.js");
const bbsRoute = require("./route/bbsRouter.js");
const activityRouter = require("./route/activityRouter.js");
const storeRouter = require("./route/storeRouter.js");




//cookie配置
app.use(cookieparser());
app.use(session({
    name:"test",
    secret:"1234",
    cookie:{maxAge:3000},
    rolling:true,
    resave:true
}));


//路由
app.use("/",viewRoute);
app.use("/",uploadRoute);
app.use("/user",userRoute);
app.use("/course",courseRoute);
app.use("/music",musicRoute);
app.use("/agency",agencyRoute);
app.use("/order",orderRoute);
app.use("/comment",replyRoute);
app.use("/bbs",bbsRoute);
app.use("/reply",replyRoute);
app.use("/activity",activityRouter);
app.use("/",storeRouter);
app.use("/",elesRoute);



//配置静态资源
app.use(express.static(path.join(__dirname,"public")));

//cros
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.listen(9999,function(){
    console.log("服务器已开启~~")
});

