import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error,loading, products} = productList
  
  useEffect(() => {
    dispatch(listProducts())
  }, [])

  

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product, index) => (
          <Col sm={12} md={6} lg={4} key={index}>
            <Product product={product} />
          </Col>
        ))}

      </Row>
    </>
  )
}

export default HomeScreen