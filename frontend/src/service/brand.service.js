import { httpGet } from "./axios.service"

export const getAllBrands = async () => {
   try{
    let result = await httpGet('/brand', null, true);
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

export const getBrandByBrandId = async (id) => {
    try{
        let result = await httpGet('/brand/'+id, null, true);
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