// var collection=require('../config/collection')
// var db=require("../config/connection")
// const bcrypt=require('bcrypt')
// const { promise, reject } = require('bcrypt/promises')

// // const async = require('hbs/lib/async')
// // const { status } = require('express/lib/response')
// module.exports={
//     doSignup:(userData)=>{
//         return new Promise(async(resolve,reject)=>{
//             userData.pw= await bcrypt.hash(userData.pw,10)
//             db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
//                 resolve(data)
//             })
            
//         })
        
//     },
//     doLogin:(userData)=>{
//         //console.log(userData);
//         return new Promise (async (resolve,reject)=>{
            
//             let loginStatus=false;
//             let response={}
//             let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
//             if(user){
//                 bcrypt.compare(userData.pw,user.pw).then((status)=>{
//                     if(status){
//                         console.log("login success");
//                         response.user=user
//                         response.status=true
//                         resolve(response)

//                     }else{
//                         console.log("login failed");
//                         resolve({status:false})
//                     }
//                 })
//             }else{
//                 console.log("email not found");
//                 resolve({status:false})
//             }
            
//         })
//     }
// }