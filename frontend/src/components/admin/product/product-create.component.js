import { useEffect } from "react";
import { AdminBreadCrumb } from "../breadcrumb"
import { ProductForm } from "./product-form.component";
import { toast } from 'react-toastify';
import { uploader } from '../../../service/axios.service';
import {useNavigate} from "react-router-dom"

export const ProductCreate = () => {
    let navigate = useNavigate();

    useEffect(() => {
        document.title = "Product Create From";
    }, [])
    const addProduct = async (values) =>{
        try{
            console.log(values);
            if(values.discount) {
                values.discount_type = values.discount.discount_type;
                values.discount_value = values.discount.discount_value;
            }
            // delete values.discount;

            let response = await uploader("/product", "post", values, 'image', values['image'], true);
            if(response.status) {
                toast.success(response.msg);
                navigate("/admin/product")
            }
        } catch(e) {
            // TODO: Error 
            console.error("Exception: ", e);
            toast.error(e);
        }
    } 
    return (<>
        <AdminBreadCrumb
            page_title="Product Create"
        />
        <div className="card mb-4">
            <div className="card-body">
                <ProductForm 
                onFormSubmit={addProduct}/>
            </div>
        </div>
    </>);
}