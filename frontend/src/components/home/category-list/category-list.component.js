import { Container, Row, Col, Card } from "react-bootstrap"
import { useEffect, useState } from "react"
import { getAllCategories } from "../../../service/category.service";
import { NavLink } from "react-router-dom";

export const CategoryList = () => {
    let [cats, setCats] = useState([])
    let [loading, setLoading] =  useState(true);



    useEffect(() => {
        getAllCategories()
        .then((res) => {
            setCats(res.result);
        })
    }, [loading])

    return (<>

        <Container className="mt-5">
            <Row>
                <Col>
                    <h4 className="text-center">
                        Category
                    </h4>
                    <hr />
                </Col>
            </Row>
        </Container>

        <Container>
            <Row>
                {
                    cats && cats.map((o, i) => (

                        <Col sm={6} md={2} key={i} >
                            <Card>
                                <NavLink to={"/category/"+o._id}>
                                    <Card.Img variant="top" src={process.env.REACT_APP_IMAGE_URL+"/category/"+o.image} />
                                </NavLink>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    </>)
}