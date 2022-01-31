var express = require('express');
var router = express.Router();
var MongoCliet= require("mongodb").MongoClient
var productHelpers=require("../helpers/product-helpers")
var adminHelper=require("../helpers/admin-helper")


const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect("/login")
  }
}
/* GET home page. */
router.get('/', (req, res, next)=> {
  productHelpers.getAllProducts("below1000").then((below1000)=>{
    productHelpers.getAllProducts("latest").then((latest)=>{
      productHelpers.getAllProducts("combo").then((combo)=>{
        res.render('index', {
          style:"demo13.min.css",
          style2:"demo-diamart.min.css",
            below1000,latest,combo
          });
      })
    })
  })
  
  
});

router.post('/submit',(req,res) => {
  console.log(req.body)
  MongoCliet.connect("mongodb://localhost:27017",function(err,client){
    if(err)
    console.log("error")
    else
    client.db("sinan").collection("user").insertOne(req.body)
  })
  res.send("got it")
})

router.get('/product-page', function(req, res, next) {

  res.render('products/product-page',{
    style:"demo13.min.css",
    style2:"demo-diamart.min.css"
  });
 
});

router.get("/products/shoes",(req,res)=>{
  productHelpers.getAllProducts("shoe").then((shoes)=>{
    // console.log(shoes);
    res.render("products/shoes",{shoes,style:"demo13.min.css"})
  })
  
})

router.get("/products/watches",(req,res)=>{
  productHelpers.getAllProducts("watch").then((watches)=>{
    // console.log(shoes);
    res.render("products/watches",{watches,style:"demo13.min.css"})
  })
  
})

router.get("/products/speakers",(req,res)=>{
  productHelpers.getAllProducts("speaker").then((speakers)=>{
    // console.log(shoes);
    res.render("products/speakers",{speakers,style:"demo13.min.css"})
  })
  
})

router.get("/products/",async (req,res,next)=>{
  let product= await productHelpers.getProduct(req.query.id)
 
  
  var array = [];

  for (var i = 0; i < product.number; i++) {
     array.push(i);
  }

 

  var productImages=[]
  for(let i = 0 ; i < array.length; i++){
  productImages.push(req.query.id+array[i])
  }

  
  res.render("products/product-page",{
    product,productImages,array,
    style:"demo13.min.css",
    style2:"demo-diamart.min.css"})
})

router.get("/about",(req,res)=>{
  res.render("about",{
    style:"demo13.min.css"
  })
})

router.get("/contact-us",(req,res)=>{
  res.render("contact-us",{
    style:"demo13.min.css"
  })
})

router.get('/products/airpods', function(req, res, next) {
  const values = ["1","2","3","4"]
  
  res.render('products/airpods', {values
  ,style:"demo13.min.css"});
  /*res.render("airpods",{airpod});*/
});

router.get("/login",(req,res)=>{
  // adminHelper.doSignup();
  res.render("ajax/login",{
    style:"demo13.min.css"
  })
})


router.get('/admin', function(req, res, next) {

  productHelpers.getAllProducts().then((shoes)=>{
    res.render('admin/view-products',{shoes}
  )
})
})

router.post("/login",(req,res)=>{
  
  // console.log(req.body);
  adminHelper.doLogin(req.body).then((response)=>{
    if(response.status){
      
      req.session.admin=response.admin;
      req.session.admin.loggedIn=true;
      res.redirect("/admin")
    }else{
      req.session.adminLoginErr="invalid username or password"
      res.redirect("/login")
    }
  })
})
module.exports = router;
