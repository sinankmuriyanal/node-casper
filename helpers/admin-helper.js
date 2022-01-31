const { getMaxListeners } = require('../app');
var collection=require('../config/collection')
var db=require("../config/connection")
const bcrypt=require('bcrypt')
 const { promise, reject } = require('bcrypt/promises');
const async = require('hbs/lib/async');

module.exports={
    doSignup:()=>{
        let adminData={
            email:"adhil@gmail.com",
            pw:"786",
        }
        // console.log((adminData));
        return new Promise(async(resolve,reject)=>{
            adminData.pw= await bcrypt.hash(adminData.pw,10)
            db.get().collection(collection.ADMIN_COLLECTION).insertOne(adminData).then((data)=>{
                resolve(adminData)
            })
            
        })
        
    },
    doLogin:(adminData)=>{
        
        return new Promise (async (resolve,reject)=>{
            
            let loginStatus=false;
            let response={}
            let admin=await db.get().collection(collection.ADMIN_COLLECTION).findOne({email:adminData.email})
            if(admin){
                bcrypt.compare(adminData.pw,admin.pw).then((status)=>{
                    if(status){
                        console.log("login success");
                        response.admin=admin
                        response.status=true
                        resolve(response)

                    }else{
                        console.log("login failed");
                        resolve({status:false})
                    }
                })
            }else{
                console.log("email not found");
                resolve({status:false})
            }
            
        })
    }
}