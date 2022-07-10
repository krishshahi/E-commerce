import { HomeHeaderComponent } from "../../../components/home/header";
import { Col, Container, Row } from "react-bootstrap";
import { ImageFormatter } from "../../../components/common/table/formatter";
import DataTable from 'react-data-table-component';
import { NavLink } from "react-router-dom";

const CartPage = () => {
    let cart_items = JSON.parse(localStorage.getItem('stack_7_cart')) ?? [];

    let sum = 0;
    cart_items.forEach(element => {
        sum += Number(element.amount);
    });
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Image',
            selector: row =>  <img className="img img-fluid img-thumbnail" src={row.image} style={{maxWidth: "50px"}}></img>,
        },
        
        {
            name: 'Price',
            selector: row => "NPR. "+ row.price,
            sortable: true
        },
        {
            name: 'Qty',
            selector: row => row.qty,
            sortable: true
        },
        {
            name: 'Amount',
            selector: row => "NPR. "+row.amount,
            sortable: true
        },
    ];

    return (<>
        <HomeHeaderComponent />

        <Container>
            <Row>

                <Col sm={12} md={9}>
                    <h4>Cart Detail</h4>
                    <hr />
                    <div className="card mb-4">
                        <div className="card-body">
                            <DataTable
                                columns={columns}
                                data={cart_items}
                                className=""
                            />
                        </div>
                    </div>
                    
                </Col>
                <Col sm={12} md={3} className="mt-5">
                    <strong>Total Amount: {sum}</strong>
                </Col>
            </Row>

            <Row>
                <Col>
                    <NavLink to="/checkout" className="btn btn-sm btn-success">Checkout</NavLink>
                </Col>
            </Row>
        </Container>
    </>)
}

export default CartPage;