import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom';
import { useState, useContext } from 'react';
import UserContext from '../UserContext';
import { Form, Button, Image} from 'react-bootstrap';
import ProductSearch from './ProductSearch'
import cart_icon from '../assets/cart_icon.png'

export default function AppNavbar(){
	const { user } = useContext(UserContext);

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
	      <Container fluid>
	        <Navbar.Brand as={Link} to="/">Eco Cart</Navbar.Brand>
	        <ProductSearch />
	        <Navbar.Toggle aria-controls="navbarScroll" />
	        <Navbar.Collapse id="navbarScroll">
	          <Nav
	            className="my-2 ms-auto"
	            navbarScroll>
	            <Nav.Link as={Link} to="/" exact="true">Home</Nav.Link>

	           {(user.id !== null) ? 

					user.isAdmin 
						?
						<>
							<Nav.Link as={Link} to="/products" exact="true">Dashboard</Nav.Link>
							<Nav.Link as={Link} to="/addProduct">Add Product</Nav.Link>
							<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
						</>
						:
						<>
							<Nav.Link as={Link} to="/products" exact="true">Products</Nav.Link>
							<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
							<Nav.Link as={Link} to="/get-cart">
								<img src={cart_icon}/>
							</Nav.Link>
					</>
					: 
					<>
						<Nav.Link as={Link} to="/products" exact="true">Products</Nav.Link>
						<Nav.Link as={Link} to="/register">Register</Nav.Link>
						<Nav.Link as={Link} to="/login">Login</Nav.Link>
					</>
				}
	          </Nav>
	        </Navbar.Collapse>
	       
	      </Container>
	    </Navbar>
	)
}