import { httpGet } from "./axios.service"

export const getAllCategories = async () => {
   try{
    let result = await httpGet('/category', null, true);
    if(result.status) {
        return result;
    } else {
        throw result.msg
    }
   } catch(error) {
        // TODO: Error handler 
        throw error;
   }
}

export const getCategoryByCategoryId = async (id) => {
    try{
        let result = await httpGet('/category/'+id, null, true);
        if(result.status) {
            return result;
        } else {
            throw result.msg
        }
       } catch(error) {
            // TODO: Error handler 
            throw error;
       }
}

export const getAllParents = async () => {
    try{
        let response = await httpGet('/category/get-parents', null, true);
        if(response.status) {
            return response.result;
        } else {
            throw response.msg;
        }
    } catch(error) {
        // TODO: Error handler 
        throw error;
    }
}

export const getAllChilds = async (id) => {
    try{
        let response = await httpGet(`/category/${id}/get-childs`, null, true);
        if(response.status) {
            return response.result;
        } else {
            throw response.msg;
        }
    } catch(error) {
        // TODO: Error handler 
        throw error;
    }
}