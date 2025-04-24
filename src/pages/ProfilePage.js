import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Svg from '../components/Svg';
import Sidebar from '../components/SideBar';
import Cart from '../components/Cart';
import Footer from '../components/Footer';
import Profile from '../components/Profile';
import { useAuth } from '../AuthContext'; // make sure path is correct

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/dashboard'); // or "/login" if you prefer
    }
  }, [user, navigate]);

  // Optional: prevent rendering while checking auth
  if (!user) return null;

  return (
    <>
      <Svg />
      <Header />
      <Sidebar />
      <Cart />
      <Profile />
      <Footer />
    </>
  );
};

export default ProfilePage;
