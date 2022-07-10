import { getLocalStorage } from "../../../utilities/helpers"
import { NavLink } from "react-router-dom";

export const AdminSidebar = () => {
    let user = getLocalStorage('stack_7_user');

    return (
        <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Core</div>
                    <NavLink className="nav-link" to={"/"+user.role.toLowerCase()}>
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </NavLink>

                    {
                        user && user.role.toLowerCase() === 'admin' ? <>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#banner" aria-expanded="false" aria-controls="banner">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-image"></i>
                            </div>
                                Banner
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="banner" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <NavLink to={'/admin/banner/create'} className="nav-link" >Banner Add</NavLink>
                                <NavLink to={'/admin/banner'} className="nav-link">Banner List</NavLink>
                            </nav>
                        </div>
                        </> : <></>
                    }

                    

                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#brand" aria-expanded="false" aria-controls="brand">
                        <div className="sb-nav-link-icon">
                        <i className="fas fa-dolly"></i>
                        </div>
                        Brand
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="brand" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <NavLink to={'/admin/brand/create'} className="nav-link" >Brand Add</NavLink>
                            <NavLink to={'/admin/brand'} className="nav-link">Brand List</NavLink> 
                        </nav>
                    </div>

                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#category" aria-expanded="false" aria-controls="category">
                        <div className="sb-nav-link-icon"><i className="fas fa-sitemap"></i></div>
                        Category
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="category" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <NavLink className="nav-link" to="/admin/category/create">Category Add</NavLink>
                            <NavLink className="nav-link" to="/admin/category">Category List</NavLink>
                        </nav>
                    </div>

                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#user" aria-expanded="false" aria-controls="user">
                        <div className="sb-nav-link-icon"><i className="fas fa-users"></i></div>
                        User
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="user" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <NavLink className="nav-link" to="/admin/user/create">User Add</NavLink>
                            <NavLink className="nav-link" to="/admin/user">User List</NavLink>
                        </nav>
                    </div>

                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#products" aria-expanded="false" aria-controls="products">
                        <div className="sb-nav-link-icon"><i className="fas fa-shopping-basket"></i></div>
                        Product
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="products" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                        <NavLink className="nav-link" to="/admin/product/create">Product Add</NavLink>
                            <NavLink className="nav-link" to="/admin/product">Product List</NavLink></nav>
                    </div>

                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-shopping-cart"></i></div>
                        Order
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <a className="nav-link" href="layout-static.html">Order Add</a>
                            <a className="nav-link" href="layout-sidenav-light.html">Order List</a>
                        </nav>
                    </div>

                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-sack-dollar"></i></div>
                        Transactions
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <a className="nav-link" href="layout-sidenav-light.html">Transactions List</a>
                        </nav>
                    </div>

                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-comments"></i></div>
                        Review
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <a className="nav-link" href="layout-sidenav-light.html">Review List</a>
                        </nav>
                    </div>

                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-gifts"></i></div>
                        Offers
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <a className="nav-link" href="layout-static.html">Offers Add</a>
                            <a className="nav-link" href="layout-sidenav-light.html">Offers List</a>
                        </nav>
                    </div>

                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-ad"></i></div>
                        Ads
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <a className="nav-link" href="layout-static.html">Ads Add</a>
                            <a className="nav-link" href="layout-sidenav-light.html">Ads List</a>
                        </nav>
                    </div>

                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-blog"></i></div>
                        Blog
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <a className="nav-link" href="layout-static.html">Blog Add</a>
                            <a className="nav-link" href="layout-sidenav-light.html">Blog List</a>
                        </nav>
                    </div>

                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-cogs"></i></div>
                        Misc
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <a className="nav-link" href="layout-static.html">Misc Add</a>
                            <a className="nav-link" href="layout-sidenav-light.html">Misc List</a>
                        </nav>
                    </div>


                    
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                {user.name}
            </div>
        </nav>
    </div>
    )
}