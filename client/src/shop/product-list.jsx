import React from 'react'
import '/Users/samruddhishinde/Desktop/react-node/client/src/css/product.css'
import{useState,useEffect} from 'react'
import { Link, Navigate } from "react-router-dom";
import Navigation from '../Navbar/Navigation';
function Products({prods,length,handleClick2,handleClick}) {
 

      return (
      <div>
        <Navigation/>
        <main>
          {length > 0 ? (
            <div className="grid">
              {prods.map((product) => (
                <article key={product.id} className="card product-item">
                  <header className="card__header">
                    <h1 className="product__title">{product.title}</h1>
                  </header>
                  <div className="card__image">
                    <img src={product.imageUrl} alt={product.title} />
                  </div>
                  <div className="card__content">
                    <h2 className="product__price">${product.price}</h2>
                    <p className="product__description">{product.description}</p>
                  </div>
                  <div className="card__actions">
                    <Link to={`/details/${product.id}`} className="btn" onClick={()=>{
                      handleClick(product.id)
                    }} >Details</Link>
                    <Link className="btn" to="/cart" onClick={()=>handleClick2(product.id)}>Add to Cart</Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <h1>No Products Found!</h1>
          )}
        </main>
      </div>
    );
  }
  


export default Products
