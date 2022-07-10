import { useEffect } from "react";
import { AdminBreadCrumb } from "../breadcrumb"
import { BrandForm } from "./brand-form.component";
import { toast } from 'react-toastify';
import { uploader } from '../../../service/axios.service';
import {useNavigate} from "react-router-dom"

export const BrandCreate = () => {
    let navigate = useNavigate();

    useEffect(() => {
        document.title = "Brand Create From";
    }, [])
    const addBrand = async (values) =>{
        try{
            let response = await uploader("/brand", "post", values, 'image', values['image'], true);
            if(response.status) {
                toast.success(response.msg);
                navigate("/admin/brand")
            }
        } catch(e) {
            // TODO: Error 
            console.error("Exception: ", e);
            toast.error(e);
        }
    } 
    return (<>
        <AdminBreadCrumb
            page_title="Brand Create"
        />
        <div className="card mb-4">
            <div className="card-body">
                <BrandForm 
                onFormSubmit={addBrand}/>
            </div>
        </div>
    </>);
}