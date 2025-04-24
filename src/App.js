// import logo from './logo.svg';
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
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from './components/CheckoutForm';
import { ToastContainer } from 'react-toastify';

// import { AuthProvider } from './AuthContext';
// import { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';

function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };
  // const stripePromise = loadStripe('your-publishable-key-here');

  return (
    <div className="App">
      {/* <Routes>
        <Route 
          path="/" 
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/login" 
          element={<Login onLogin={handleLogin} />} 
        />
        <Route path="*" element={<Error />} />
      </Routes> */}

      {/* <AuthProvider> */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/favourites' element={<Favourites />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/category/:categoryId' element={<CategoryProduct />} />
        <Route path='/profile' element={<ProfilePage />} />

        {/* <Route path="/pay" element={<Elements stripe={stripePromise}><CheckoutForm /> </Elements>} /> */}

        <Route path="*" element={<Error />} />
      </Routes>
      {/* </AuthProvider> */}
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
