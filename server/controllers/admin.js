const Product = require('../models/product');
exports.postAddProduct = (req, res, next) => {
  
  
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  //console.log(req.user)

  req.user.createProduct({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description,
   
  })
  .then(result=>{
    
    console.log("product created")
    res.json({"redirect":"/"})
  }).catch(err=>{
    console.log(err)
  })
  
};
exports.EditProduct =(req,res,next)=>{

 const prodId=req.body.id;
 const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
 Product.findByPk(prodId)
 .then(product=>{
  console.log(product)
  product.title=updatedTitle;
  product.price=updatedPrice;
  product.description=updatedDescription;
  product.imageUrl=updatedImageUrl;
 return  product.save();
 })
 .then(result=>{
  res.json({"redirect":"/"})
  console.log("Updated product")
 })
 .catch(err=>console.log(err))

  

}




exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.id;
  Product.findByPk(prodId)
  .then(product=>{
   product.destroy();
  })
  .catch(err=>{
    console.log(err);
  })

};

