import { NavLink } from "react-router-dom"

export const AdminBreadCrumb = (props) => {

    return (<>
        <h1 className="mt-4">{props.page_title}</h1>
        <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
                <NavLink to="/admin">Dashboard</NavLink>
            </li>
            <li className="breadcrumb-item active">{props.page_title}</li>
        </ol>
    </>)
}