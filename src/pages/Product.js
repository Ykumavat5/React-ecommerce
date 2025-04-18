import React from 'react';
import Header from '../components/Header';
import Svg from '../components/Svg';
import Sidebar from '../components/SideBar';
import Cart from '../components/Cart';
import ViewProduct from '../components/reuse/viewProduct';

const Favourites = () => {

  return (
    <>
      <Svg />
      <Header />
      <Sidebar />
      <Cart />
      <ViewProduct />
    </>
  );
};

export default Favourites;
