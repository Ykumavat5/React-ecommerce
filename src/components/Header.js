import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
// import useCategories from './reuse/useCategories';
import { CartContext } from './reuse/CartContext';

const Header = ({ setSearchQuery }) => {
    // const categorys = useCategories();
    const { user, logout } = useAuth();
    const { cart } = useContext(CartContext);
    const cartCount = cart.length;
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            <header className='sticky-top' style={{ backgroundColor: "whitesmoke" }}>
                <div className="container-fluid">
                    <div className="row py-3 border-bottom">

                        <div className="col-sm-4 col-lg-2 text-center text-sm-start d-flex gap-3 justify-content-center justify-content-md-start">
                            <div className="d-flex align-items-center my-3 my-sm-0">
                                <Link to="index.html">
                                    <img src="/assets/images/logo.svg" alt="logo" className="img-fluid" />
                                </Link>
                            </div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                                aria-controls="offcanvasNavbar">
                                <svg width="24" height="24" viewBox="0 0 24 24"><use href="#menu"></use></svg>
                            </button>
                        </div>

                        <div className="col-sm-6 offset-sm-2 offset-md-0 col-lg-4">
                            <div className="search-bar row bg-light p-2 rounded-4">

                                <div className="col-11 col-md-7">
                                    <form id="search-form" className="text-center" action="index.html" method="post">
                                        <input type="text" className="form-control border-0 bg-transparent" placeholder="Search for more than 20,000 products"
                                            onChange={handleInputChange} />
                                    </form>
                                </div>
                                <div className="col-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <ul className="navbar-nav list-unstyled d-flex flex-row gap-3 gap-lg-5 justify-content-center flex-wrap align-items-center mb-0 fw-bold text-uppercase text-dark">
                                <li className="nav-item active">
                                    <Link to="/dashboard" className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle pe-3" role="button" id="pages" data-bs-toggle="dropdown" aria-expanded="false">other</Link>
                                    <ul className="dropdown-menu border-0 p-3 rounded-0 shadow" aria-labelledby="pages">
                                        <li><Link to="#index" className="dropdown-item">About Us </Link></li>
                                        <li><Link to="#myOrders" className="dropdown-item">My Orders </Link></li>
                                        <li><Link to="#index" className="dropdown-item">My Account </Link></li>
                                        {/* <li><Link to="#index" className="dropdown-item">Checkout </Link></li> */}
                                        {/* <li><Link to="#latest-blog" className="dropdown-item">Blog </Link></li> */}
                                        {/* <li><Link to="index.html" className="dropdown-item">Single Post </Link></li> */}
                                    </ul>
                                </li>
                                {!user && (
                                    <li className='nav-item'>
                                        <Link to="/login" className='nav-link'>Login</Link>
                                    </li>
                                )}
                                {user && (
                                    <li className='nav-item'>
                                        <button className='nav-link btn btn-link' onClick={logout}>Logout</button>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div className="col-sm-8 col-lg-2 d-flex gap-5 align-items-center justify-content-center justify-content-sm-end">
                            <ul className="d-flex justify-content-end list-unstyled m-0">
                                <li>
                                    <a href="/dashboard" className="p-2 mx-1">
                                        <svg width="24" height="24"><use href="#user"></use></svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="/favourites" className="p-2 mx-1">
                                        <svg width="24" height="24"><use href="#heart"></use></svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="/dashboard" className="p-2 mx-1 position-relative" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                                        <svg width="24" height="24"><use href="#shopping-bag"></use></svg>
                                        {cartCount > 0 && (
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {cartCount}
                                                <span className="visually-hidden">cart items</span>
                                            </span>
                                        )}
                                    </a>
                                </li>

                            </ul>
                        </div>

                    </div>
                </div>
            </header>
        </>
    );

};
export default Header;