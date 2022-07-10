import { BannerForm } from "./banner-form.component";
import { AdminBreadCrumb } from "../breadcrumb";
import { useEffect, useState } from "react";
import { getBannerByBannerId } from "../../../service/banner.service";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploader } from "../../../service/axios.service";

export const BannerEdit = () => {
    let params = useParams();
    let [banner, setBanner] = useState();
    let navigate = useNavigate();

    const getBannerById = async () => {
        try{
            let result = await getBannerByBannerId(params.id);
            
            setBanner(result.result);

        } catch(error) {
            console.log("Error: ", error);
        }
    }
    useEffect(() => {
        document.title = "Banner Update From";
        getBannerById()
    }, [])
    
    const onBannerEdit = async (data) => {
        try{
            let image = data['image'];

            delete data['image'];

            // console.log("Image: ", image);

            let response = await uploader("/banner/"+data._id, "put", data, 'image', [image], true);
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
    return (
        <>
        <AdminBreadCrumb
            page_title="Banner Update"
        />
            <BannerForm 
                banner={banner}
                onFormSubmit={onBannerEdit}
            />
        </>
    );
}