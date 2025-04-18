import React from 'react';
import Header from '../components/Header';
import Svg from '../components/Svg';
import Sidebar from '../components/SideBar';
import FavouriteListing from '../components/FavouriteListing';
import Cart from '../components/Cart';

const Favourites = () => {

  return (
    <>
      <Svg />
      <Header />
      <Sidebar />
      <Cart />
      <FavouriteListing />
    </>
  );
};

export default Favourites;
