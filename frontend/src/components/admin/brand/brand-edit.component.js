import { BrandForm } from "./brand-form.component";
import { AdminBreadCrumb } from "../breadcrumb";
import { useEffect, useState } from "react";
import { getBrandByBrandId } from "../../../service/brand.service";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploader } from "../../../service/axios.service";

export const BrandEdit = () => {
    let params = useParams();
    let [brand, setBrand] = useState();
    let navigate = useNavigate();

    const getBrandById = async () => {
        try{
            let result = await getBrandByBrandId(params.id);
            
            setBrand(result.result);

        } catch(error) {
            console.log("Error: ", error);
        }
    }
    useEffect(() => {
        document.title = "Brand Update From";
        getBrandById()
    }, [])
    
    const onBrandEdit = async (data) => {
        try{
            let image = null;

            if(typeof data.image === 'string'){
                delete data.image;
            } else {
                image = data['image'];
            }

            let response = await uploader("/brand/"+data._id, "put", data, 'image', image, true);
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
    return (
        <>
        <AdminBreadCrumb
            page_title="Brand Update"
        />
            <BrandForm 
                brand={brand}
                onFormSubmit={onBrandEdit}
            />
        </>
    );
}