import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import'/Users/samruddhishinde/Desktop/react-node/client/src/admin/forms.css'
import { useState } from 'react'

import Navigation from '../Navbar/Navigation'
import { useEffect } from 'react';
export default function EditProducts({id}) {
  const [product,setProduct]=useState({})
  const[pro,setPro]=useState([])
  const navigate=useNavigate();
  function handleChange(e) {
    
    const { name, value } = e.target;
  
    setProduct(prev=>{
      return {
        ...prev,
        [name]:value,
        id:id
        
        
      }
    })
    // console.log(product);
  }
  

  function handleForm(e) {
    e.preventDefault();
  

  fetch('/edit-product', {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  }).then(res => res.json())
    .then(data => {
   
   navigate(data.redirect)
      
    
    })
    .catch(error => {
      console.error('Error:', error);
    });
 
}
return (
    <main>
      <Navigation/>
    <form className="product-form" >
      <div className="form-control">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" onChange={handleChange} />
      </div>
      <div className="form-control">
        <label htmlFor="imageUrl">Image URL</label>
        <input type="text" name="imageUrl" id="imageUrl" onChange={handleChange} />
      </div>
      <div className="form-control">
        <label htmlFor="price">Price</label>
        <input type="number" name="price" id="price" step="0.01" onChange={handleChange} />
      </div>
      <div className="form-control">
        <label htmlFor="description"  onChange={handleChange} >Description
        <textarea
          name="description"
          id="description"
          rows={5}
          defaultValue={""}
        />
        </label>
      </div>
      {/* <input type="hidden" value={id}/> */}
     
      {/* <Link  className='btn' onClick={handleForm} >Update Product</Link> */}
      <button type="submit" onClick={handleForm}>Update Product</button>
    </form>
  </main>
  

  )
}
