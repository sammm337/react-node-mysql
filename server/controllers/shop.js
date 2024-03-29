const Product = require('../models/product');
const Cart = require('../models/cart')



exports.getProduct = (req, res, next) => {
  const prodId = req.params.id //used to extract the dynamic parameter
  Product.findAll({where:{id:prodId}}).then(products=>
   { res.json(products)}
  )

}

exports.getIndex = (req, res, next) => {
  Product.findAll().then(products=>{
    res.json(products)
  }).catch(err=>{
    console.log(err)
  })
  
};

exports.postCart = (req, res, next) => {
  console.log(req.body.id)
  const prodId = req.body.id;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};
  


exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.id;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
         res.json(products)
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};