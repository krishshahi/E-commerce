import { Navigate } from "react-router-dom";
import { getLocalStorage } from "../utilities/helpers";

export const PrivateRoute = ({component}) => {
    // TODO: logic implement 
    let token = localStorage.getItem('stack_7_token') ?? '';
    let user = JSON.parse(localStorage.getItem('stack_7_user')) ?? {};
    let is_logged_in = false; 

    return is_logged_in ? component : <Navigate to="/login"></Navigate>
}


export const AdminPrivateRoute = ({component}) => {
    // TODO: logic implement 
    let token = getLocalStorage('stack_7_token');
    let local_user = getLocalStorage('stack_7_user');

    let is_logged_in = token ? true : false;
    let role = null;
    if(local_user && local_user['role']) {
        role = local_user['role'].toLowerCase();
    }
    // let role = local_user['role'].toLowerCase() ?? null; 
    return is_logged_in && role === 'admin' ? component : <Navigate to="/login"></Navigate>
}