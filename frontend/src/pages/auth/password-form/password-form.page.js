import { useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"

export const PasswrodForm = (props) => {

    const [data, setData] = useState();
    const [err, setErr] = useState();
    return (<>

        <Container>
            <Row>
                <Col>


                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        props.handleSubmit(data);
                    }}>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" onChange={(e) => {
                                setData({
                                    ...data,
                                    password: e.target.value
                                })
                            }} required type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control onChange={(e) => {
                                if(data.password !== e.target.value) {
                                    setErr("Password and confirm password does not match")
                                } else {
                                    setErr();
                                    setData({
                                        ...data,
                                        re_password: e.target.value
                                    })
                                }

                            }} name="confirm_password" required type="password" placeholder="Password" />
                            <span className="text-danger">{err}</span>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>)
}