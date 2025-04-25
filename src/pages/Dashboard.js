import React, { useState } from 'react';
// , { useEffect }
// import { useAuth } from '../AuthContext';
// import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Svg from '../components/Svg';
import MainBanner from '../components/MainBanner';
import Cart from '../components/Cart';
import Categorys from '../components/Categorys';
import Sidebar from '../components/SideBar';
import Product from '../components/Products';
import AdvertisementBanner from '../components/AdvertisementBanner';
import FeaturedProduct from '../components/FeaturedProduct';
// import Signup from '../components/Signup';
import PopularProduct from '../components/PopularProducts';
import LatestProducts from '../components/LatestProducts';
import LatestBlogs from '../components/LatestBlogs';
import DownloadAppBanner from '../components/DownloadAppBanner';
import BottomCards from '../components/BottomCards';
import Footer from '../components/Footer';
import FloatingChatButton from '../FloatingChatButton';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Svg />
      <Header setSearchQuery={setSearchQuery} />
      <Sidebar />
      {searchQuery === '' && <MainBanner />}
      
      <Cart />
      {searchQuery === '' && <Categorys />}
      <Product searchQuery={searchQuery}/>
      <AdvertisementBanner />
      <FeaturedProduct />
      <PopularProduct />
      <LatestProducts />
      <LatestBlogs />
      <DownloadAppBanner />
      <BottomCards />
      <FloatingChatButton />

      <Footer />
    </>
  );
};

export default Dashboard;
