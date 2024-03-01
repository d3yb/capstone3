import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function ProductView() {
    const { productId } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1); // State for quantity
    const [totalQuantity, setTotalQuantity] = useState(1); // State for total quantity

    const addToCart = () => {
        const subTotal = price * totalQuantity;

        fetch(`http://localhost:4000/carts/${productId}/add-to-cart`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                productId,
                productName: name,
                price,
                quantity: totalQuantity, // Send total quantity to backend
                subTotal
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.message);
            if (data.error === 'Admin users are forbidden to perform this action') {
                Swal.fire({
                    title: "Error",
                    icon: 'error',
                    text: "Admin users are forbidden to perform this action"
                })
            } else if (data.message === 'Product added to cart successfully') {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'You have successfully added this item to your cart!'
                })

                navigate("/products");
            } else {
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "Something went wrong. Please try again."
                });
            }
        })
        .catch(error => {
            console.error('Error adding product to cart:', error);
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Internal server error. Please try again later."
            });
        });
    }

    // Function to handle incrementing quantity
    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
        setTotalQuantity(prevTotalQuantity => prevTotalQuantity + 1); // Update total quantity
    };

    // Function to handle decrementing quantity
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
            setTotalQuantity(prevTotalQuantity => prevTotalQuantity - 1); // Update total quantity
        }
    };

    useEffect(() => {
        fetch(`http://localhost:4000/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
        });
    }, [productId]);

    return (
        <Container className="mt-5">
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Title>{name}</Card.Title>
                            <Card.Subtitle>Description:</Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
                            <Card.Subtitle>Price:</Card.Subtitle>
                            <Card.Text>PhP {price}</Card.Text>
                            <ButtonGroup size="sm" aria-label="Basic example" className="mb-3">
                                <Button variant="dark" className="border-5" onClick={decrementQuantity}>-</Button>
                                <Button variant="light" className="border-5">{quantity}</Button>
                                <Button variant="dark" className="border-5" onClick={incrementQuantity}>+</Button>
                            </ButtonGroup>
                            <br/>
                            {user.id !== null ?
                                <Button variant="primary" onClick={addToCart} block={true}>Add to Cart</Button>
                                :
                                <Link className="btn btn-danger btn-block" to="/login">Please Login!</Link>
                            }
                        </Card.Body>		
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
