
import React from 'react';
import Navigation from '../Navbar/Navigation';
import { useNavigate } from 'react-router-dom';

import '/Users/samruddhishinde/Desktop/react-node/client/src/css/product.css'
import '/Users/samruddhishinde/Desktop/react-node/client/src/css/main.css'
const Details = ({product}) => {
 

  return (
    <div>
    <Navigation/>
    <main class="centered">
    <h1>{product.title}</h1>
    <hr/>
    <div>
        <img src={product.imageUrl} style={{height:"500px",width:"500px"}}/>
    </div>
    <h2>${product.price}</h2>
    <p>{product.description}</p>

</main>
</div>
  );
};

export default Details;