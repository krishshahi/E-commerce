import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import {HomeLayout} from "../pages/layout/home.layout"
import { ErrorPage } from "../pages/error/404";
import { AboutUs } from "../pages/home/aboutus";

import { AdminLayout } from "../pages/layout/admin.layout";

import { 
    AdminDashboard,

    Banner,
    Brand,
    Category, 
    Product, 
    User,
} from "../pages/admin";

import {
    BannerList,
    BannerCreate,
    BannerEdit,

    BrandList,
    BrandCreate,
    BrandEdit,

    CategoryList,
    CategoryCreate,
    CategoryEdit,

    UserList,
    UserCreate,
    UserEdit,
    
    ProductList,
    ProductCreate,
    ProductEdit
} from "../components/admin";

import { SellerLayout } from "../pages/layout/seller.layout";
import { AdminPrivateRoute } from "./private.routes";
import { LoginPage } from "../pages/auth/login/login.page";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ActivateUser } from "../pages/auth/activate/activate-user.page";
import { CategoryProductList } from "../pages/home/category/category-list.page";
import { SearchResult } from "../pages/home/search/search-result.page";
import ProductDetail from "../pages/home/product/detail.page";
import CartPage from "../pages/home/product/cart.page";

import {Provider} from "react-redux";
import { store } from "../store";


const Logout = () => {
    let navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('stack_7_user');
        localStorage.removeItem('stack_7_token');
        // localStorage.clear()
        navigate('/login');
    },[]);
    
    return (<></>);
}





export const AppRoutes = () => {
    return (
        <Provider store={store}>
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<HomeLayout />}></Route>
                <Route path="/about" element={<AboutUs />}></Route>
                <Route path="/category/:id" element={<CategoryProductList />}></Route>

                <Route path="/login" element={<LoginPage />}></Route>

                <Route path="/admin/login" element={<LoginPage />}></Route>
                <Route path="/activate/:token" element={<ActivateUser />}></Route> 
                <Route path="/search" element={<SearchResult />}></Route>

                <Route path="/product/:id" element={<ProductDetail />}></Route>

                <Route path="/cart" element={<CartPage />}></Route>



                <Route path="/admin" element={<AdminPrivateRoute component={<AdminLayout />}/>}>
                    
                    <Route index element={<AdminDashboard />}></Route>

                    <Route path="category" element={<Category />}>
                        <Route index element={<CategoryList />}></Route>
                        <Route path="create" element={<CategoryCreate />}></Route>
                        <Route path=":id/edit" element={<CategoryEdit />}></Route>
                    </Route>

                    <Route path="banner" element={<Banner />}>
                        <Route index element={<BannerList />}></Route>
                        <Route path="create" element={<BannerCreate />}></Route>
                        <Route path=":id/edit" element={<BannerEdit />}></Route>
                    </Route>
                    <Route path="brand" element={<Brand />}>
                        <Route index element={<BrandList />}></Route>
                        <Route path="create" element={<BrandCreate />}></Route>
                        <Route path=":id/edit" element={<BrandEdit />}></Route>
                    </Route>

                    <Route path="user" element={<User />}>
                        <Route index element={<UserList />}></Route>
                        <Route path="create" element={<UserCreate />}></Route>
                        <Route path=":id/edit" element={<UserEdit />}></Route>
                    </Route>

                    <Route path="product" element={<Product />}>
                        <Route index element={<ProductList />}></Route>
                        <Route path="create" element={<ProductCreate />}></Route>
                        <Route path=":id/edit" element={<ProductEdit />}></Route>
                    </Route>
                </Route>



                <Route path="/seller" element={<SellerLayout />}>
                    <Route index element={<>Seller Dashbord</>}></Route>
                </Route>

                <Route path="/customer" element={<SellerLayout />}>
                    <Route index element={<>Seller Dashbord</>}></Route>
                </Route>

                <Route path="/logout" element={<Logout />}></Route>
                <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
        </BrowserRouter>
        </Provider>
    );
}