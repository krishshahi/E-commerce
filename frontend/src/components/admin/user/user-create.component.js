import { useEffect } from "react";
import { AdminBreadCrumb } from "../breadcrumb"
import { UserForm } from "./user-form.component";
import { toast } from 'react-toastify';
import { uploader } from '../../../service/axios.service';
import {useNavigate} from "react-router-dom"

export const UserCreate = () => {
    let navigate = useNavigate();

    useEffect(() => {
        document.title = "User Create From";
    }, [])
    const addUser = async (values) =>{
        try{
            let response = await uploader("/register", "post", values, 'image', values['image'], true);
            if(response.status) {
                toast.success(response.msg);
                navigate("/admin/user")
            }
        } catch(e) {
            // TODO: Error 
            console.error("Exception: ", e);
            toast.error(e);
        }
    } 
    return (<>
        <AdminBreadCrumb
            page_title="User Create"
        />
        <div className="card mb-4">
            <div className="card-body">
                <UserForm 
                onFormSubmit={addUser}/>
            </div>
        </div>
    </>);
}