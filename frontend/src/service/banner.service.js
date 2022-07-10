import { httpGet } from "./axios.service"

export const getAllBanners = async () => {
   try{
    let result = await httpGet('/banner', null, true);
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

export const getActiveBanners = async () => {
    try{
     let result = await httpGet('/banner/status/active', null, true);
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

export const getBannerByBannerId = async (id) => {
    try{
        let result = await httpGet('/banner/'+id, null, true);
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