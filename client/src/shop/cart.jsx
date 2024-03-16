import React, { useState } from 'react'
import { useEffect } from 'react';
import Navigation from '../Navbar/Navigation'
import { useNavigate } from 'react-router-dom';
export default function Cart() {
  const navigate=useNavigate()
  const [cartProd,setCartProd]=useState([])
  useEffect(() => {
    fetch('/api/getCart', {
         method: 'post',
         headers: {
           'Content-Type': 'application/json'
         },
       })
         .then(res => res.json())
         .then(data => {
          setCartProd(data)
          console.log(data)
           ;
         })
         .catch(error => {
           console.error('Error:', error);
         });

         

}, []);
function handleClick(id){
  fetch('/deleteProduct', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({"productId":id})
  })
    .then(res => res.json())
    .then(data => {
    navigate(data.redirect)
  
      
    })
    .catch(error => {
      console.error('Error:', error);
    });

}
  return (
    <div>
    <Navigation/>
    <main>
      {cartProd.length > 0 ? (
        <div className="grid">
          {cartProd.map((product) => (
            <article key={product.id} className="card product-item">
              <header className="card__header">
                <h1 className="product__title">{product.title}</h1>
                
              </header>
              <div className="card__image">
                <img src={product.imageUrl} alt={product.cartItem.title} />
              </div>
              <div className="card__content">
                <h2 className="product__price">${product.price}</h2>
                <h3 className='product__price'>QTY: {product.cartItem.quantity}</h3>
                {/* <p className="product__description">{product.productData.description}</p> */}
              </div>
              <div className="card__actions">
              <button className='btn' onClick={()=>{handleClick(product.productData.id)}}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h1>No Products Found!</h1>
      )}
    </main>
  </div>
  )
}
