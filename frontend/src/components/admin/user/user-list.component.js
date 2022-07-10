import {Container, Row, Col} from "react-bootstrap"
import { AdminBreadCrumb } from "../breadcrumb"
import DataTable, { createTheme } from 'react-data-table-component';
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllUsers } from "../../../service/user.service";
import { toast } from "react-toastify";
import { useState } from "react";
import { ImageFormatter, StatusFormatter } from "../../common/table/formatter";
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

export const UserList = () => {
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true
        },
        {
            name: 'Image',
            selector: row =>  <ImageFormatter image={row.image} type="user" customStyle={{"width": "100px"}} />,
        },
        
        {
            name: 'Status',
            selector: row => <StatusFormatter status={row.status}/>,
            sortable: true
        },
        {
            name: 'Action',
            selector: row => <ActionButton afterAction={getUsers} url={'/user/'+row._id} />,
        },
    ];

    let [data, setData] = useState([]);

    const getUsers = async () => {
        try {
            let result = await getAllUsers();
            
            setData(result.result);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        document.title = "User List";
        getUsers()
    }, [])
    
    return (<>
        <AdminBreadCrumb
            page_title="User List"
        />

        <Container>
            <Row>
                <Col>
                    <NavLink to={"/admin/user/create"} className="btn btn-sm btn-success float-end">
                        <i className="fa fa-plus"></i>
                        Add User
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