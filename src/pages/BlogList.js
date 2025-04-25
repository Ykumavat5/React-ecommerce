import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Svg from '../components/Svg';
import Sidebar from '../components/SideBar';
import Cart from '../components/Cart';
import Footer from '../components/Footer';
import { useAuth } from '../AuthContext';
import BlogListing from '../components/BlogListing';

const BlogPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/dashboard');
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
      <BlogListing />
      <Footer />
    </>
  );
};

export default BlogPage;
