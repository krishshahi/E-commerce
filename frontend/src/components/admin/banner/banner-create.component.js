import { useEffect } from "react";
import { AdminBreadCrumb } from "../breadcrumb"
import { BannerForm } from "./banner-form.component";
import { toast } from 'react-toastify';
import { uploader } from '../../../service/axios.service';
import {useNavigate} from "react-router-dom"

export const BannerCreate = () => {
    let navigate = useNavigate();

    useEffect(() => {
        document.title = "Banner Create From";
    }, [])
    const addBanner = async (values) =>{
        try{
            let response = await uploader("/banner", "post", values, 'image', values['image'], true);
            if(response.status) {
                toast.success(response.msg);
                navigate("/admin/banner")
            }
        } catch(e) {
            // TODO: Error 
            console.error("Exception: ", e);
            toast.error(e);
        }
    } 
    return (<>
        <AdminBreadCrumb
            page_title="Banner Create"
        />
        <div className="card mb-4">
            <div className="card-body">
                <BannerForm 
                onFormSubmit={addBanner}/>
            </div>
        </div>
    </>);
}