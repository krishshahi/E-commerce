import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { httpDelete } from "../../../service/axios.service";

export const ActionButton = (props) => {

    const deleteData = async () => {
        try {
            let response = await httpDelete(props.url, true);
            return response;
        } catch(error) {
            throw error;
        }
    }

    const deleteItem = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData()
                .then((respnse) => {
                    toast.success(respnse.msg)
                    props.afterAction()
                })
                .catch((err) => {
                    console.log("error: ", err)
                })
                
            }
        })
    }

    return (
        <>
            <NavLink to={'/admin'+props.url+"/edit"} className="btn btn-sm btn-success circular-btn" style={{ "marginRight": "10px" }}>
                <i className="fa fa-pen"></i>
            </NavLink>
            <a className="btn btn-sm btn-danger circular-btn" onClick={deleteItem}>
                <i className="fa fa-trash"></i>
            </a>
        </>
    )
}