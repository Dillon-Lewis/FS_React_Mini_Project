import { Component } from 'react';
import { ListGroup, Button, Container, Alert, Accordion } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addItem } from '../Redux/cartSlice'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const user = JSON.parse(sessionStorage.getItem('user'));

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            error: null,
        };
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        axios.get('http://127.0.0.1:5000/products')
            .then(response => {
                this.setState({ product: response.data });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ error: 'Error fetching products. Please try again later.' });
            });
    };

    addToCart = (product) => {
        console.log('Adding to cart:', product);
        const { addItem } = this.props; 
        const item = {
            product_id: product.id,
            product_name: product.product_name,
            price: product.price,
            quantity: 1,
        };
        addItem(item);
        alert('Product added to your cart!'); 
    };

    deleteProduct = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            axios.delete(`http://127.0.0.1:5000/products/${productId}`)
                .then(() => {
                    this.fetchProducts();
                })
                .catch(error => {
                    console.error('Error deleting product:', error);
                    this.setState({ error: 'Error deleting product. Please try again later.' });
                });
        }
    };

    render() {
        const { error, product } = this.state;

        return (
            <Container>
                {error && <Alert variant="danger">{error}</Alert>}
                <h2 className='text-center my-4'>Most Popular Products</h2>
                <ListGroup>
                    {product.map(product => (
                        <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
                            <Accordion flush>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>{product.product_name}</Accordion.Header>
                                    <Accordion.Body>
                                        <h5>Price</h5>
                                        <p>{product.price}</p>
                                        <h5>Short Description</h5>
                                        <p>{product.product_description}</p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <Button variant="outline-danger" size="md" onClick={() => this.deleteProduct(product.id)}>
                                Delete
                            </Button>
                            <Button variant="success" size="md" onClick={() => this.addToCart(product)}>
                                Add to Cart
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup><br/>
                <h6>Feel like we are missing out on a top seller?</h6><br/>
                <Link to={'/addproduct'}>
                    <Button variant='danger'>Add a product</Button>
                </Link>
            </Container>
        );
    }
}
const mapDispatchToProps = {
    addItem,
};
ProductsList.propTypes = {
    addItem: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(ProductsList);