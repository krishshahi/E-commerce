import { CategoryForm } from "./category-form.component";
import { AdminBreadCrumb } from "../breadcrumb";
import { useEffect, useState } from "react";
import { getCategoryByCategoryId } from "../../../service/category.service";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploader } from "../../../service/axios.service";

export const CategoryEdit = () => {
    let params = useParams();
    let [category, setCategory] = useState();
    let navigate = useNavigate();

    const getCategoryById = async () => {
        try{
            let result = await getCategoryByCategoryId(params.id);
            
            setCategory(result.result);

        } catch(error) {
            console.log("Error: ", error);
        }
    }
    useEffect(() => {
        document.title = "Category Update From";
        getCategoryById()
    }, [])
    
    const onCategoryEdit = async (data) => {
        try{
            let image = null;

            if(typeof data.image === 'string'){
                delete data.image;
            } else {
                image = data['image'];
            }
            data.brands = data.brands.map((o) => o._id);
            data.parent_id = data.parent_id._id;

            console.log(data);
            let response = await uploader("/category/"+data._id, "put", data, 'image', image, true);
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
    return (
        <>
        <AdminBreadCrumb
            page_title="Category Update"
        />
            <CategoryForm 
                category={category}
                onFormSubmit={onCategoryEdit}
            />
        </>
    );
}