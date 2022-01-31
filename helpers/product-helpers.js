const { ObjectId } = require("bson")
var collection=require('../config/collection')
var db=require("../config/connection")


module.exports={

    addProduct:(product,callback)=>{
        
        db.get().collection(collection.PRODCUTS_COLLECTION).insertOne(product).then((data)=>{
            
                callback(data.insertedId)
        }
        )
    },
    getAllProducts:(category)=>{
        if(category==null)
        return new Promise(async(resolve,reject)=>{
            let products= await db.get().collection(collection.PRODCUTS_COLLECTION).find().toArray()
            resolve(products)
        })
        else
        return new Promise(async(resolve,reject)=>{
            let products= await db.get().collection(collection.PRODCUTS_COLLECTION).find({Category:category}).toArray()
            resolve(products)
        })
    },
    getProduct:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODCUTS_COLLECTION).findOne({_id:ObjectId(proId)}).then((response)=>{
                
                resolve(response)
            })
        })
    },


    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODCUTS_COLLECTION)
            .updateOne({_id:ObjectId(proId)},{
                $set:{
                    name:proDetails.name,
                    Category:proDetails.Category,
                    Price:proDetails.Price,
                    description:proDetails.description
                }
            }).then(()=>{
                resolve()
            })
        })
    },

    deleteProduct:(prodId)=>{
        console.log(prodId);
        return new Promise((resolve,reject)=>{
              db.get().collection(collection.PRODCUTS_COLLECTION).deleteOne({_id:ObjectId(prodId)}).then((response)=>{
                console.log(response);
                resolve(response)
                // reject(err)
            })
            
        })
    },
}