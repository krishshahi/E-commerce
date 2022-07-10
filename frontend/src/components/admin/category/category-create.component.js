import { useEffect } from "react";
import { AdminBreadCrumb } from "../breadcrumb"
import { CategoryForm } from "./category-form.component";
import { toast } from 'react-toastify';
import { uploader } from '../../../service/axios.service';
import {useNavigate} from "react-router-dom"

export const CategoryCreate = () => {
    let navigate = useNavigate();

    useEffect(() => {
        document.title = "Category Create From";
    }, [])
    const addCategory = async (values) =>{
        try{
            let response = await uploader("/category", "post", values, 'image', values['image'], true);
            if(response.status) {
                toast.success(response.msg);
                navigate("/admin/category")
            }
        } catch(e) {
            // TODO: Error 
            console.error("Exception: ", e);
            toast.error(e);
        }
    } 
    return (<>
        <AdminBreadCrumb
            page_title="Category Create"
        />
        <div className="card mb-4">
            <div className="card-body">
                <CategoryForm 
                onFormSubmit={addCategory}/>
            </div>
        </div>
    </>);
}