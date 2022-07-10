import { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { HomeHeaderComponent } from "../../../components/home/header";
import { setCartCounter } from "../../../reducers/cart-reducer";
import { getProductByProductId } from "../../../service/product.service";

const ProductDetail = () => {
    let dispath = useDispatch()
    let [product, setProduct] = useState();
    let params = useParams();

    let [qty, setQty] = useState(0);


    const getProductDetail = async () => {
        try {
            let result = await getProductByProductId(params.id);
            setProduct(result.result);
        } catch (error) {
            console.error("Error: ", error);
        }
    }


    const addToCart = () => {
        let current_product = {
            id: product._id,
            title: product.title,
            image: process.env.REACT_APP_IMAGE_URL+"/product/"+product.images[0],
            price: product.after_discount
        }
        let cart = JSON.parse(localStorage.getItem('stack_7_cart')) ?? [];
        if(cart.length) {
            // exists
            let index = null;
            cart.forEach((value, ind) => {
                if(value.id === current_product.id){
                    index = ind;
                }
            })
            
            if(index === null) {
                //non existing item
                current_product['qty'] = qty
                current_product['amount'] = qty * product.after_discount
                cart.push(current_product); 
            } else {
                // existing item
                if(qty <= 0) {
                    cart.splice(index, 1);
                    if(cart.length <= 0){
                        localStorage.removeItem('stack_7_cart');
                    }
                } else {
                    cart[index].qty = qty;
                    cart[index].amount = qty * product.after_discount
                }
            }
            localStorage.setItem('stack_7_cart', JSON.stringify(cart));

        } else {
            // cart create
            current_product['qty'] = qty
            current_product['amount'] = qty * product.after_discount
            cart.push(current_product);
            localStorage.setItem('stack_7_cart', JSON.stringify(cart));
        }

        dispath(setCartCounter());
        toast.success("Cart updated successfully.")
    }

    useEffect(() => {
        getProductDetail()
    }, [params])
    return (<>
        <HomeHeaderComponent />
        <ToastContainer />
        {
            product ? <>
                <Container className="mt-5">

                    <Row>

                        <Col sm={12} md={6}>
                            <Carousel fade>
                                {
                                    product.images && product.images.map((o, i) => (

                                        <Carousel.Item key={i}>
                                            <img
                                                className="d-block w-100"
                                                src={process.env.REACT_APP_IMAGE_URL + "/product/" + o}
                                                alt="Third slide"
                                            />
                                        </Carousel.Item>
                                    ))
                                }
                            </Carousel>
                        </Col>

                        <Col sm={12} md={6}>
                            <h1>{product.title}</h1>
                            <p>{product?.category[0].title}</p>
                            <p>
                                NPR. {product.after_discount}
                                { product.discount.discount_value ? <>
                                    &nbsp;&nbsp;
                                    <del className="text-danger">
                                        <small><em> NPR. {product.price}</em></small>
                                    </del>
                                </> : <></>}
                            </p>

                            <input type="number" min={0} className="form-control form-control-sm mb-3"
                                onChange={(e) => {
                                    setQty(e.target.value)
                                }}
                            />
                            <Button className="btn btn-sm btn-success" onClick={addToCart}>
                                Add To Cart
                            </Button>
                        </Col>

                    </Row>

                    <Row>
                        
                        <Col dangerouslySetInnerHTML={{__html: product.description}}></Col>

                    </Row>

                </Container>
            </> : <></>
        }
    </>)
}
export default ProductDetail;