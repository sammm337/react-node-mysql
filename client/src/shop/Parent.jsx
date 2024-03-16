import React from 'react'
import ReactDOM from 'react-dom/client';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom'

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Index from './index';
import Products from './product-list'
import Cart from './cart';
import AdminAddProduct from '../admin/add-product';
import AdminProduct from '../admin/product-list';
import Navigation from '../Navbar/Navigation';
import Order from './order';
import Details from './product-detail';
import EditProducts from '../admin/edit-product';


function Parent() {
  

    const [prods, setProds] = useState([]);
    const [product, setProduct] = useState({});
    const [cartProd,setCartProd]=useState({});
    const[redirect,setRedirect]=useState({})
    const [id,setId]=useState()


    useEffect(() => {
       fetch('/api/getProducts', {
            method: 'get',
            headers: {
              'Content-Type': 'application/json'
            },
          })
            .then(res => res.json())
            .then(data => {
              setProds(data);
              console.log(data);
            })
            .catch(error => {
              console.error('Error:', error);
            });

            

  }, []);
  function handleClickDelete(id)
  { 
    fetch('/delete-product', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({"id":id})
    })
      .then(res => res.json())
     
      .catch(error => {
        console.error('Error:', error);
      });
  }

        function handleClickEdit(id)
        {
        setId(id)
        }

        function handleClick2(id)
        {
          fetch('/api/cart', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body : JSON.stringify({"id":id}),
          })
            .then(res => res.json())
           
            .catch(error => {
              console.error('Error:', error);
            });
  
        }

        function handleClick(id) {
            fetch(`/api/details/${id}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json'
              },
            })
            .then(res => res.json())
            .then(data => {
            
              setProduct(data[0])
              
            })
            .catch(error => {
              console.error('Error:', error);
            });
          }
          console.log(product);


          const router = createBrowserRouter(
           
            [
           
            {
              path: "/",
              element: <Index prods={prods} length={prods.length} handleClick2={handleClick2}/>,
              
            },
            {
              path:"/products",
              element:<Products prods={prods} length={prods.length} handleClick={handleClick} handleClick2={handleClick2}/>
            },
            {
              path:"/cart",
              element:<Cart cartProd={cartProd}/>
            },
            {
              path:"/admin/add-product",
              element:<AdminAddProduct handleRedirect={redirect} />
            },
            {
              path:"/admin/product-list",
              element:<AdminProduct  prods={prods} length={prods.length} handleClick={handleClick} handleClick2={handleClick2} handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete}/>
            },
            {
              path:"/navigation",
              element:<Navigation/>
            },
            {
              path:"/order",
              element:<Order/>
            },
           {
            path:"/details/:id",
            element:  <Details product={product}/>
           },
           {
            path:"/edit-product/:id",
            element:  <EditProducts handleRedirect={redirect} id={id}/>
           },
          
          
          
          
          ]);
  return (
    <div>
      <RouterProvider router={router} >
     
      </RouterProvider>
    </div>
  )
}

export default Parent


