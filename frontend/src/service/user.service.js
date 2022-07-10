import { httpGet } from "./axios.service"

export const getAllUsers = async () => {
   try{
    let result = await httpGet('/user', null, true);
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

export const getUserByUserId = async (id) => {
    try{
        let result = await httpGet('/user/'+id, null, true);
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

export const getUserByType = async (type) => {
    try{
        let result = await httpGet('/user?type='+type, null, true);
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