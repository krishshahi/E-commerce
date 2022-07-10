import {Container, Row, Col} from "react-bootstrap"
import { AdminBreadCrumb } from "../breadcrumb"
import DataTable, { createTheme } from 'react-data-table-component';
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllCategories } from "../../../service/category.service";
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

export const CategoryList = () => {
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true
        },
        {
            name: "Is Parent",
            selector: row => ((row.parent_id) ? 'NO' : "Yes")
        },
        {
            name: "Brand",
            selector: row => <BrandFormatter data={row.brands} />
        },
        {
            name: 'Image',
            selector: row =>  <ImageFormatter image={row.image} type="category" customStyle={{"width": "100px"}} />,
        },
        
        {
            name: 'Status',
            selector: row => <StatusFormatter status={row.status}/>,
            sortable: true
        },
        {
            name: 'Action',
            selector: row => <ActionButton afterAction={getCategorys} url={'/category/'+row._id} />,
        },
    ];

    let [data, setData] = useState([]);

    const getCategorys = async () => {
        try {
            let result = await getAllCategories();
            setData(result.result);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        document.title = "Category List";
        getCategorys()
    }, [])
    
    return (<>
        <AdminBreadCrumb
            page_title="Category List"
        />

        <Container>
            <Row>
                <Col>
                    <NavLink to={"/admin/category/create"} className="btn btn-sm btn-success float-end">
                        <i className="fa fa-plus"></i>
                        Add Category
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