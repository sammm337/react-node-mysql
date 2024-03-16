const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/api/getProducts', shopController.getIndex);
   


router.get("/api/details/:id",shopController.getProduct);





router.post('/api/cart', shopController.postCart);

router.post('/api/getCart',shopController.getCart);

router.post('/deleteProduct',shopController.postCartDeleteProduct);


module.exports = router;
