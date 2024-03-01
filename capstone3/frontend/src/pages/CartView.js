import { useContext, useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function CartView() {
    const { user } = useContext(UserContext);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = () => {
        fetch(`http://localhost:4000/carts/get-cart`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setCartItems(data.cart.cartItems); // Access cartItems from data.cart
        })
        .catch(error => {
            console.error('Error fetching cart:', error);
            // Handle error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch cart data',
            });
        });
    };

    return (
        <>
            <h1 className="text-center my-4">Check Out</h1>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(product => (
                        <tr key={product._id}>
                            <td>{product.productName}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.subTotal}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
