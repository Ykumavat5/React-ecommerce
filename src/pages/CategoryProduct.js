import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Svg from '../components/Svg';
import Sidebar from '../components/SideBar';
import Cart from '../components/Cart';
import ViewCategoryProduct from '../components/reuse/viewCategoryProduct';
import Footer from '../components/Footer';
import Categorys from '../components/Categorys';

const CategoryProduct = () => {
    const [searchQuery, setSearchQuery] = useState("");
  
  // Get categoryId from URL params
  const { categoryId } = useParams();
  console.log("categoryid :", categoryId);

  return (
    <>
      <Svg />
      <Header  setSearchQuery={setSearchQuery}/>
      <Sidebar />
      <Cart />
      {/* <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/dashboard">
              <i className="bi bi-house-door-fill"></i> Dashboard
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">View Product</li>
        </ol>
      </nav> */}
      <Categorys />
      <ViewCategoryProduct categoryId={categoryId}   searchQuery={searchQuery}/>
      <Footer />
    </>
  );
};

export default CategoryProduct;
