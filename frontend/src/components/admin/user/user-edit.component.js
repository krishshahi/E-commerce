import { UserForm } from "./user-form.component";
import { AdminBreadCrumb } from "../breadcrumb";
import { useEffect, useState } from "react";
import { getUserByUserId } from "../../../service/user.service";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploader } from "../../../service/axios.service";

export const UserEdit = () => {
    let params = useParams();
    let [user, setUser] = useState();
    let navigate = useNavigate();

    const getUserById = async () => {
        try{
            let result = await getUserByUserId(params.id);
            
            setUser(result.result);

        } catch(error) {
            console.log("Error: ", error);
        }
    }
    useEffect(() => {
        document.title = "User Update From";
        getUserById()
    }, [])
    
    const onUserEdit = async (data) => {
        try{
            let image = null;

            if(typeof data.image === 'string'){
                delete data.image;
            } else {
                image = data['image'];
            }

            let response = await uploader("/user/"+data._id, "put", data, 'image', image, true);
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
    return (
        <>
        <AdminBreadCrumb
            page_title="User Update"
        />
            <UserForm 
                user={user}
                onFormSubmit={onUserEdit}
            />
        </>
    );
}