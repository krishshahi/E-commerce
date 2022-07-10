import { HomeHeaderComponent } from "../../../components/home/header"
import { getSearchedProduct } from "../../../service/product.service";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SingleProduct } from "../../../components/common/single-product/single-product";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export const SearchResult = () => {
    let [query, setQuery] = useSearchParams();
    // let [keyword,setKeyword] = useState(query.get('q'))
    let keyword = useSelector((state) => {
        return state.search.keyword
    })
    let [products, setProducts] = useState([])

    const getSearchResult = async () => {
        try {
            if(query.get('q') && !keyword) {
                keyword = query.get('q');
            }
            
            let result = await getSearchedProduct(keyword);

            if(result) {
                setProducts(result);
            }
        } catch(error) {
            console.error("Error: ", error)
        }
    }
    useEffect(() => {
        getSearchResult();
    }, [keyword])
    return (<>
        <HomeHeaderComponent />
        <Container>
            <Row>
                <Col>
                    <h4>Search Result: </h4>
                </Col>
            </Row>
            <Row>
                {
                    products && products.map((o, i) => (
                        <SingleProduct product={o} key={i} />
                    ))
                }
            </Row>
        </Container>
    </>)
}