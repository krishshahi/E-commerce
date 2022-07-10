import { Col, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const SingleProduct = (props) => {
    let { product } = props;
    return (<>
        <Col sm={12} md={2} className="mt-3">
            <Card>
                <NavLink to={"/product/" + product._id}>
                    <Card.Img variant="top" src={process.env.REACT_APP_IMAGE_URL + "/product/" + product.images[0]} />
                </NavLink>
                <Card.Body>
                    <NavLink to={"/product/" + product._id}>

                        <Card.Title><a href="/">{product.title}</a></Card.Title>
                    </NavLink>
                    <Card.Text>
                        <span>NPR. {product.after_discount}</span> <del className="text-red">NPR. {product.price}</del>
                    </Card.Text>
                </Card.Body>

            </Card>
        </Col>
    </>)
}
// Compilation
// Run 