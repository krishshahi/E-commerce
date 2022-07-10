import { Outlet } from "react-router-dom";
import "../../assets/css/admin.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap";
import {
    AdminCopyRight,
    AdminSidebar,
    AdminTopNav
} from "../../components/admin";


export const AdminLayout = () => {
    return (<>
        <AdminTopNav />
        <div id="layoutSidenav">
            <AdminSidebar />
            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        <Outlet />
                    </div>
                </main>
                <AdminCopyRight />
            </div>
        </div>
    </>);
}