const express =require('express')
const app=express()
const bodyParser = require('body-parser');
app.use(bodyParser.json())



const adminRoutes=require('./routes/admin');
const shopRoutes = require('./routes/shop');
const sequelize=require('./util/database');

const Product=require('./models/product')
const User=require('./models/user')
const Cart=require('./models/cart')
const CartItem=require('./models/cart-item')

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{ 
        // console.log(user)
        req.user=user;
        next();
    })
    .catch(err=>{
        console.log(err)
    })
})

app.use(shopRoutes);  
app.use(adminRoutes);

Product.belongsTo(User,{constraints:true ,onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart)
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});


sequelize
// .sync({force:true})
.sync()
.then(res=>{
  return User.findByPk(1);
})
.then(user=>{
    if(!user){
     return User.create({name:"Sam",email:'something@gmail.com'})
    }
    return user;
})
.then(user=>{
  user.createCart()
})
.then(cart=>{
    app.listen('5001',()=>{console.log("server started on port 5001")})

})
.catch(err=>{
    console.log(err)
})



    
   
    
     