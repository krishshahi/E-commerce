import { Navbar, Container, Nav, Row, Col, Card } from "react-bootstrap";
import "./home.css"
import { HomeHeaderComponent } from "../../components/home/header";
import { SliderComponent } from "../../components/home/slider/slider.component";
import { CategoryList } from "../../components/home/category-list/category-list.component";


export const HomeLayout = () => {
    
    return (<>

        <HomeHeaderComponent />

        <SliderComponent />

        <CategoryList />

        <Container className="mt-5">
            <Row>
                <Col>
                    <h4 className="text-center">
                        Latest Products
                    </h4>
                    <hr />
                </Col>
            </Row>
        </Container>

        <Container className="mt-5">
            <Row>
                <Col sm={12} md={3} className="mt-3">
                    <Card>
                        <Card.Img variant="top" src="/cactus-1.jpeg" />
                        <Card.Body>

                            <Card.Title><a href="/">Cactus playing toy</a></Card.Title>
                            <Card.Text>
                                <span>NPR. 500</span> <del className="text-red">NPR. 1000</del>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={3} className="mt-3">
                    <Card>
                        <Card.Img variant="top" src="/earphone-1.jpeg" />
                        <Card.Body>
                            <Card.Title><a href="/">Remax: Earphone, RM-345</a></Card.Title>
                            <Card.Text>
                                <span>NPR. 500</span> <del className="text-red">NPR. 1000</del>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={3} className="mt-3">
                    <Card>
                        <Card.Img variant="top" src="/oneplus-1.jpeg" />
                        <Card.Body>
                            <Card.Title><a href="/">OnePlus Nord 2 CE</a></Card.Title>
                            <Card.Text>
                                <span>NPR. 500</span> <del className="text-red">NPR. 1000</del>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={3} className="mt-3">
                    <Card>
                        <Card.Img variant="top" src="/oven-1.jpeg" />
                        <Card.Body>
                            <Card.Title><a href="/">LG Microwave Oven, Microwae with grill option</a></Card.Title>
                            <Card.Text>
                                <span>NPR. 500</span> <del className="text-red">NPR. 1000</del>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={3} className="mt-3">
                    <Card>
                        <Card.Img variant="top" src="/women-jacket-1.jpeg" />
                        <Card.Body>
                            <Card.Title><a href="/">Women Jacet for summer</a></Card.Title>
                            <Card.Text>
                                <span>NPR. 500</span> <del className="text-red">NPR. 1000</del>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>


        <footer className="mt-5">
            <Navbar fixed="bottom" bg="dark" variant="dark">

                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </footer>
    </>)
}