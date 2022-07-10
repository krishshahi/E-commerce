import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { HomeHeaderComponent } from "../../../components/home/header";
import "./login.css";
import {useNavigate} from "react-router-dom";
import { notify, validateEmail, setLocalStore, getLocalStorage } from "../../../utilities/helpers";
import { httpPost } from "../../../service/axios.service";

const default_state = {
    email: '',
    password: '',
    remember_me: false
};
export const LoginPage = () => {
    let navigate = useNavigate();
    let [data, setData] = useState(default_state);
    let [err, setErr] =  useState({email: '', password: ''});
    let [disabled, setDisabled] = useState(false);

    const handleChange = (e) => {
        let {name, value, checked} = e.target;
        if(name === 'remember_me') {
            value = checked;
        }
        setData({
            ...data,
            [name]: value
        });
        validateField(name, value);
    }

    const validateField = (field, val) => {
        let errMsg = "";
        switch(field) {
            case "email": 
                errMsg = val ? (validateEmail(val) ? '' : "Invalid Email Format") : "Email field is required";
                break;
            case "password": 
                errMsg = val ? (val.length < 8 ? 'Password must be 8 cahracter long' : "") : "Password field is required";
                break;
        }
            setErr({
                ...err,
                [field]: errMsg
            })


    }

    useEffect(()=>{
        let token = getLocalStorage('stack_7_token');
        let local_user = getLocalStorage('stack_7_user');
        let is_logged_in = token && token !== null ? token : null; 
        let role = null;
        
        if(local_user && local_user?.role) {
            role = local_user?.role.toLowerCase();
        }
        if(is_logged_in) {
            navigate('/'+role);
        }
    }, [])

    useEffect(() => {
        // let errs = Object.keys(err).map((key) => err[key] != '');
        let counter = 0;
        for(let key in err){
            if(err[key]) {
                counter++;
            }
        }

        if(counter) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
        
    }, [err])
    let width = 12;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let response = await httpPost('/login', data);
            console.log(response);
            if(response.status) {
                let user = response.result.user;
                setLocalStore('stack_7_token', response.result.token);
                setLocalStore("stack_7_user", {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: user.role_id.name
                });
                notify("You are successfully logged in", 'success');
                navigate("/"+user.role_id.name.toLowerCase())
            }
        } catch(error) {
            console.log("Login error: ", error)
        }

    }
    return (
        <>
            <HomeHeaderComponent />
            <Container >
                <Row className="mt-5">
                    <Col className="offset-sm-2" sm={8} md={6} lg={6}>
                        
                         
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control onChange={handleChange} type="email" placeholder="Enter email" name="email" />
                                    <span className="text-danger">{err?.email}</span>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=>{
                                        setData({...data, password: e.target.value});
                                        validateField(e.target.name, e.target.value)
                                    }} />
                                    <span className="text-danger">{err?.password}</span>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember Me" name="remember_me" value={true} onChange={handleChange} />
                                </Form.Group>
                                <Button variant="primary" type="submit" disabled={disabled}>
                                    Submit
                                </Button>
                            </Form>
                        
                    </Col>

                </Row>
            </Container>
        </>
    );

}
