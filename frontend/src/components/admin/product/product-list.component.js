import {Container, Row, Col, Badge} from "react-bootstrap"
import { AdminBreadCrumb } from "../breadcrumb"
import DataTable, { createTheme } from 'react-data-table-component';
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllProducts } from "../../../service/product.service";
import { toast } from "react-toastify";
import { useState } from "react";
import { ImageFormatter, StatusFormatter, BrandFormatter } from "../../common/table/formatter";
import { ActionButton } from "../../common/table/action-btns";

createTheme('solarized', {
    text: {
        primary: '#268bd2',
        secondary: '#2aa198',
    },
    background: {
        default: '#002b36',
    },
    context: {
        background: '#cb4b16',
        text: '#FFFFFF',
    },
    divider: {
        default: '#073642',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
}, 'dark');

export const ProductList = () => {
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true
        },
        {
            name: "Category",
            selector: row => ((row.category) ? row.category.map((o) => o.title) : "")
        },
        {
            name: "Price",
            selector: row => "Npr. "+row.after_discount
        },
        {
            name: "Discount",
            selector: row => (row.discount.discount_type !== 'percentage' ? "Npr. " : "")+row.discount.discount_value + (row.discount.discount_type == 'percentage' ? "%" : "")
        },
        {
            name: "Brand",
            selector: row => <Badge bg="info" >{row.brands?.title}</Badge>
        },
        {
            name: 'Image',
            selector: row =>  <ImageFormatter type="product" image={row.images[0]} />,
        },
        
        {
            name: 'Status',
            selector: row => <StatusFormatter status={row.status}/>,
            sortable: true
        },
        {
            name: 'Action',
            selector: row => <ActionButton afterAction={getProducts} url={'/product/'+row._id} />,
        },
    ];

    let [data, setData] = useState([]);

    const getProducts = async () => {
        try {
            let result = await getAllProducts();
            setData(result.result);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        document.title = "Product List";
        getProducts()
    }, [])
    
    return (<>
        <AdminBreadCrumb
            page_title="Product List"
        />

        <Container>
            <Row>
                <Col>
                    <NavLink to={"/admin/product/create"} className="btn btn-sm btn-success float-end">
                        <i className="fa fa-plus"></i>
                        Add Product
                    </NavLink>

                </Col>
            </Row>
        </Container>

        <div className="card mb-4">
            <div className="card-body">
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    className=""
                // theme="solarized"
                />
            </div>
        </div>
    </>)
}