var express = require('express');
var router = express.Router();
var productHelpers=require("../helpers/product-helpers");
// const userHelpers = require('../helpers/user-helpers');
// const adminHelpers =require("../helpers/admin-helper");
// const uploadController = require("../upload/controllers");

const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect("/login")
  }
}

/* GET users listing. */
router.get('/', verifyLogin, (req, res, next)=> {

  productHelpers.getAllProducts().then((shoes)=>{

    res.render('admin/view-products',{
      style:"demo13.min.css",
      style2:"demo-diamart.min.css",
      shoes}
  )
})
})

router.get('/add-product',function(req,res){
  res.render("admin/add-product")
})


router.post("/add-product", (req,res)=>{
  // console.log(req.body);
 
    productHelpers.addProduct(req.body,(id)=>{
 

     if(req.files){

      const images = req.files.image;
      req.flash("arrayLength",images.length)
      console.log(images);
      for(let i = 0 ; i < images.length; i++){

          images[i].mv('./public/images/'+id+i+".jpg",(err)=> {
            if(err){
              res.send(err);
              }
          })
          }
        }
      
        res.render("admin/add-product")
 
  })
  
})

router.get("/edit-product/:id",async(req,res,next)=>{
  let product=await productHelpers.getProduct(req.params.id)
  console.log(product)
  res.render("admin/edit-product",{product})
})

router.post("/edit-product/:id",(req,res)=>{
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect("/admin")
    if(req.files.image){
      let id=req.params.id
      let image=req.files.image
      image.mv("./public/images/shoes/"+id+".jpg")
    }
  })
})

router.get("/delete-product/:id",(req,res)=>{
  let proId=req.params.id;
  // console.log(proId);
  productHelpers.deleteProduct(proId).then((response)=>{
    console.log(response);
    res.redirect("/admin")
  })
  
})


module.exports = router;
