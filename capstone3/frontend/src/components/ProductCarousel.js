import { Row, Col } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import image1 from '../assets/carousel-image1.jpg';
import image2 from '../assets/carousel-image2.jpg';
import image3 from '../assets/carousel-image3.jpg';

export default function ProductCarousel() {
  return (
    <div className="col-xl-12 p-0">
      <div className="container-fluid text-dark min-vw-100 p-3 p-md-5 py-5 py-lg-5 row">
        <div className="col-md-6 col-lg-6 col-xl-6 my-lg-auto mt-md-5">
          <Carousel data-bs-theme="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image1}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image2}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image3}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 pl-md-5 py-lg-5 my-auto">
          <p className="mb-0">Best Quality Products</p>
          <h1 className="mt-2 text-md-left">Join The Eco Movement!</h1>
          <p>
            To mitigate the pressure this puts on our planet and offset the carbon, we've simplified our packaging and added a feature called EcoCart which analyzes the carbon footprint of each transaction, recommends an offset amount for your specific order
          </p>
          <Link to="/products" className="btn btn-primary">Buy Now!</Link>
        </div>
      </div>
    </div>
  );
}
