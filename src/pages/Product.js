import React from 'react';
import Header from '../components/Header';
import Svg from '../components/Svg';
import Sidebar from '../components/SideBar';
import Cart from '../components/Cart';
import ViewProduct from '../components/reuse/viewProduct';
import Footer from '../components/Footer';

const Product = () => {

  return (
    <>
      <Svg />
      <Header />
      <Sidebar />
      <Cart />
      <ViewProduct />
      <Footer />

    </>
  );
};

export default Product;
