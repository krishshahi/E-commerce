import { useNavigate, NavLink } from "react-router-dom";
import { toogleSidebar } from "../../../assets/js/admin";
import { getLocalStorage } from "../../../utilities/helpers";
export const AdminTopNav = () => {
    let navigate = useNavigate();


    let user = getLocalStorage('stack_7_user');


    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('stack_7_user');
        localStorage.removeItem('stack_7_token');
        navigate('/login');
    }
    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            
            <NavLink to={"/"+user.role.toLowerCase()} className="navbar-brand ps-3">
                Admin Panel
            </NavLink>
            
            <button onClick={toogleSidebar} className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
            
            <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                
            </div>
            
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#!">Profile</a></li>
                        <li><a className="dropdown-item" href="#!">Password Change</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );

}