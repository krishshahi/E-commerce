import { useEffect, useState } from "react";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import { setKeyword } from "../../../reducers/search-reducer";
import { setCartCounter } from "../../../reducers/cart-reducer";
export const HomeHeaderComponent = () => {
    let [query, setQuery] = useSearchParams();

    let [keyword, setSearchKeyword] = useState(query.get('q'));

    let [counter, setCounter] = useState(0);



    const navigate = useNavigate();
    const dispatch = useDispatch();

    let central_key = useSelector((state) => {
        return state.search.keyword
    })

    let total = useSelector((state) => {
        return state.cart.counter
    }) 

    // setCounter(total);

    const handleSubmit = (e) => {
        e.preventDefault();
        // central state update 
        dispatch(setKeyword({keyword: keyword}))      
        navigate("/search?q="+keyword)
    }

    useEffect(() => {
        dispatch(setCartCounter())
        setCounter(total);
    }, [total])
    if(keyword) {
        central_key =  keyword
    }
    return (<>
     <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>

                    <NavLink className="nav-link" to="/admin/login">Login</NavLink>
                </Nav>

                <NavLink className="nav-link" style={{color: "#FFFFFF"}} to="/cart">
                    Cart: {counter}
                </NavLink>

                <Form onSubmit={handleSubmit}>
                    <Form.Control
                        type="search"
                        name="keyword"
                        defaultValue={central_key}
                        onChange={(e) => {
                            setSearchKeyword(e.target.value)
                        }}
                        placeholder="Enter your search keyword"

                    />
                </Form>
            </Container>
        </Navbar>
    </>);
}