import { httpGet } from "./axios.service"

export const getAllProducts = async () => {
   try{
    let result = await httpGet('/product', null, true);
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

export const getProductByProductId = async (id) => {
    try{
        let result = await httpGet('/product/'+id, null, true);
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


export const getProductByCategoryId = async(cat_id) => {
    try {
        let result = await httpGet('/product/getproducts/'+cat_id);
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
        let response = await httpGet('/product/get-parents', null, true);
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

export const getSearchedProduct = async (keyword) => {
    try{
        let response = await httpGet('/product/search?q='+keyword);
        if(response.status){
            return response.result
        } else {
            throw response.msg;
        }
    } catch(error) {
        throw error;
    }
}