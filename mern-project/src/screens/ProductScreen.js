import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { productDetail } from '../actions/productActions'

const ProductScreen = () => {

    const param = useParams()
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetail)
    const [qty, setQty] = useState(1)
    const navigate = useNavigate()
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(productDetail(param.id))
    }, [])

    const addToCartHandler = () => {
        navigate(`/cart/${param.id}?qty=${qty}`)
    }


    return (
        <>
            <Link className='btn btn-light my-3' to='/'> Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} />
                </Col>
                <Col md={3}>
                    <ListGroup.Item>
                        <h3>
                            {product.name}
                        </h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price:${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description:{product.description}
                    </ListGroup.Item>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col xs='auto' className='my-1'>
                                            <Form.Control
                                                as="select"
                                                value={qty}
                                                onChange={(e) => setQty(e.target.value)}
                                            >
                                                {
                                                    [...Array(product.countInStock).keys()].map((x,index) => (
                                                        <option key={index} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                            }

                            <ListGroup.Item>
                                <Button
                                    onClick={addToCartHandler}
                                    className='btn-block'
                                    type='button'
                                    disabled={product.countInStock === 0}>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen