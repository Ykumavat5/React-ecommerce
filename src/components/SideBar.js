import React from "react";

const Sidebar = () => {
    return (

        //  component Sidebar 
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar">

            <div className="offcanvas-header justify-content-between">
                <h4 className="fw-normal text-uppercase fs-6">Menu</h4>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body">

                <ul className="navbar-nav justify-content-end menu-list list-unstyled d-flex gap-md-3 mb-0">
                    <li className="nav-item border-dashed active">
                        <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#fruits"></use></svg>
                            <span>Fruits and vegetables</span>
                        </a>
                    </li>
                    <li className="nav-item border-dashed">
                        <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#dairy"></use></svg>
                            <span>Dairy and Eggs</span>
                        </a>
                    </li>
                    <li className="nav-item border-dashed">
                        <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#meat"></use></svg>
                            <span>Meat and Poultry</span>
                        </a>
                    </li>
                    <li className="nav-item border-dashed">
                        <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#seafood"></use></svg>
                            <span>Seafood</span>
                        </a>
                    </li>
                    <li className="nav-item border-dashed">
                        <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#bakery"></use></svg>
                            <span>Bakery and Bread</span>
                        </a>
                    </li>
                    <li className="nav-item border-dashed">
                        <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#canned"></use></svg>
                            <span>Canned Goods</span>
                        </a>
                    </li>
                    <li className="nav-item border-dashed">
                        <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#frozen"></use></svg>
                            <span>Frozen Foods</span>
                        </a>
                    </li>
                    <li className="nav-item border-dashed">
                        <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#pasta"></use></svg>
                            <span>Pasta and Rice</span>
                        </a>
                    </li>
                    <li className="nav-item border-dashed">
                        <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#breakfast"></use></svg>
                            <span>Breakfast Foods</span>
                        </a>
                    </li>
                    <li className="nav-item border-dashed">
                        <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#snacks"></use></svg>
                            <span>Snacks and Chips</span>
                        </a>
                    </li>
                    <li className="nav-item border-dashed">
                        <button className="btn btn-toggle dropdown-toggle position-relative w-100 d-flex justify-content-between align-items-center text-dark p-2" data-bs-toggle="collapse" data-bs-target="#beverages-collapse" aria-expanded="false">
                            <div className="d-flex gap-3">
                                <svg width="24" height="24" viewBox="0 0 24 24"><use href="#beverages"></use></svg>
                                <span>Beverages</span>
                            </div>
                        </button>
                        <div className="collapse" id="beverages-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal ps-5 pb-1">
                                <li className="border-bottom py-2"><a href="index.html" className="dropdown-item">Water</a></li>
                                <li className="border-bottom py-2"><a href="index.html" className="dropdown-item">Juice</a></li>
                                <li className="border-bottom py-2"><a href="index.html" className="dropdown-item">Soda</a></li>
                                <li className="border-bottom py-2"><a href="index.html" className="dropdown-item">Tea</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item border-dashed">
                        <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#spices"></use></svg>
                            <span>Spices and Seasonings</span>
                        </a>
                    </li>
                    <li className="nav-item border-dashed">
                        <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#baby"></use></svg>
                            <span>Baby Food and Formula</span>
                        </a>
                    </li>
                    <li className="nav-item border-dashed">
                        <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#health"></use></svg>
                            <span>Health and Wellness</span>
                        </a>
                    </li>
                    <li className="nav-item border-dashed">
                        <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#household"></use></svg>
                            <span>Household Supplies</span>
                        </a>
                    </li>
                    <li className="nav-item border-dashed">
                        <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#personal"></use></svg>
                            <span>Personal Care</span>
                        </a>
                    </li>
                    <li className="nav-item border-dashed">
                        <a href="index.html" className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                            <svg width="24" height="24" viewBox="0 0 24 24"><use href="#pet"></use></svg>
                            <span>Pet Food and Supplies</span>
                        </a>
                    </li>
                </ul>

            </div>

        </div>
    );
}

export default Sidebar;