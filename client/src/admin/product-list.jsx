import React from 'react'
import { Link } from "react-router-dom";
import Navigation from '../Navbar/Navigation';

export default function AdminProduct({prods,length,handleClickEdit,handleRedirect,handleClickDelete}) {
  function handleClick(){}
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
                <Link to={`/edit-product/${product.id}`} className="btn" onClick={()=>{
                  handleClickEdit(product.id)
                }} >Update</Link>
<Link className="btn" to="/" onClick= {()=>{handleClickDelete(product.id)}}>Delete</Link>
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
