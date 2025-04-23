import React from "react";
import useCategories from './reuse/useCategories';

const Sidebar = () => {
    const categorys = useCategories();

    return (

        //  component Sidebar 
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar">

            <div className="offcanvas-header justify-content-between">
                <h4 className="fw-normal text-uppercase fs-6">Menu</h4>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body">

                <ul className="navbar-nav justify-content-end menu-list list-unstyled d-flex gap-md-3 mb-0">
                    {categorys.length > 0 ? (
                        categorys.map((cat) => (
                            <li className="nav-item border-dashed active">
                            <a href={`/category/${cat.id}`} className="nav-link d-flex align-items-center gap-3 text-dark p-2">
                                <svg width="24" height="24" viewBox="0 0 24 24"><use href={cat.icon}></use></svg>
                                <span>{cat.name}</span>
                            </a>
                        </li>
                      
                        ))
                    ) : (
                        <option disabled>No categories available</option>
                    )}
                </ul>

            </div>

        </div>
    );
}

export default Sidebar;