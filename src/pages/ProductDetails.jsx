import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../data/products'

const ProductDetails = () => {
  const {id} = useParams()
  const [product, setProduct] = useState(null)
  const navigate = useNavigate()

  // need to add a dependency to run this code again
  useEffect(()=>{
    const foundProduct = getProductById(id)
    console.log(foundProduct);

    if(!foundProduct){
        navigate("/")
        return // skip the rest of the function 
    }

    setProduct(foundProduct) // will got an issue if nothing found so need to make if above
    // [id]: means whatever here in this list, when they've changed, the function will run again
  },[id])

  if(!product){
    // if we don't find the product we actually navigate the user 
    return <div>Loading...</div>
  }

  return (
    <div className="page">
        <div className="container">
          <div className="product-detail">
            <div className="product-detail-image">
              <img src={product.image} alt={product.name}/>
            </div>
            <div className="product-detail-content">
              <h1 className="product-detail-name">{product.name}</h1>
              <p className="product-detail-price">{product.price}</p>
              <p className="product-detail-description">{product.description}</p>
              <button className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProductDetails