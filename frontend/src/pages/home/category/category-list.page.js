import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom"
import { SingleProduct } from "../../../components/common/single-product/single-product";
import { HomeHeaderComponent } from "../../../components/home/header"
import { getProductByCategoryId } from "../../../service/product.service";
import { Container, Row } from "react-bootstrap";


export const CategoryProductList = () => {
    let params = useParams();
    let [products, setProducts] =  useState();

    useEffect(() => {
        getProductByCategoryId(params.id)
        .then((result) => {
            setProducts(result.result)
        })
        .catch((error) => {
            console.error(error);
        })

    }, [])
    return (
        <>
            <HomeHeaderComponent />
            <Container>

                <Row>
                    {
                        products && products.map((o, i) => (
                            <SingleProduct 
                                product={o}
                                key={i}
                            />
                        ))
                    }
                </Row>

                

            </Container>
        </>
    )
}