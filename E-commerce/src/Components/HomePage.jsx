import { Container, Col, Row } from "react-bootstrap";

const HomePage = () => {

const user = JSON.parse(sessionStorage.getItem('user'));
console.log(user); 

    
    return (
        <Container>
            <Col>
                <Row className="Welcome m-4 text-center display-3">
                <b>Welcome Back {user.name}!</b>
                </Row>
                <Row className="m-4 text-center">
                    <h4>We appriciate your continued support!</h4>
                </Row>
                
            </Col>
        </Container>
    );
};

export default HomePage;