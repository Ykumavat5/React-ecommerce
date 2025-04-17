import React from 'react';
// , { useEffect }
// import { useAuth } from '../AuthContext';
// import { useNavigate } from 'react-router-dom';
// Import components
import Header from '../components/Header';
import Svg from '../components/Svg';
import MainBanner from '../components/MainBanner';
import Cart from '../components/Cart';
import Categorys from '../components/Categorys';
import Sidebar from '../components/SideBar';
import Product from '../components/Product';
import AdvertisementBanner from '../components/AdvertisementBanner';
import FeaturedProduct from '../components/FeaturedProduct';
// import Signup from '../components/Signup';
import PopularProduct from '../components/PopularProducts';
import LatestProducts from '../components/LatestProducts';
import LatestBlogs from '../components/LatestBlogs';
import DownloadAppBanner from '../components/DownloadAppBanner';
import BottomCards from '../components/BottomCards';
import Footer from '../components/Footer';

const Dashboard = () => {
  // const { user } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
   
  //   if (!user) {
  //     navigate('/login');
  //   }
  // }, [user, navigate]);

  // if (!user) {
  //   return <div className="text-center mt-5">Loading Dashboard...</div>;
  // }

  return (
    <>
      <Svg />
      <Header />
      <Sidebar />
      <MainBanner />
      <Cart />
      <Categorys />
      <Product />
      <AdvertisementBanner />
      <FeaturedProduct />
      {/* <Signup /> */}
      <PopularProduct />
      <LatestProducts />
      <LatestBlogs />
      <DownloadAppBanner />
      <BottomCards />
      <Footer />
    </>
  );
};

export default Dashboard;
