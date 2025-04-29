import './App.css';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import { Routes, Route } from 'react-router-dom';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Favourites from './pages/Favourites';
import Product from './pages/Product';
import CategoryProduct from './pages/CategoryProduct';
import ProfilePage from './pages/ProfilePage';
import { ToastContainer } from 'react-toastify';
import BlogPage from './pages/BlogList';
import Chatbot from './Chatbot';

import PaymentPage from './pages/PaymentPage';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PT1lF2KXWWRtS4wteQaFVjBqVZDyEYk9TZydkmEwRCwk7ClXJQPGc2yYMgTnxyQK521noLavAM7nOVVSzA7tNXw00lsCFsTYb');

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/favourites' element={<Favourites />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/category/:categoryId' element={<CategoryProduct />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/blogs' element={<BlogPage />} />
        <Route path='/chatbot' element={<Chatbot />} />

        {/* ✅ Wrap PaymentPage in Elements */}
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <PaymentPage />
            </Elements>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}

export default App;
