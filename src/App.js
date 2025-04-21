// import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import { Routes, Route } from 'react-router-dom';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Favourites from './pages/Favourites';
import Product from './pages/Product';
// import { AuthProvider } from './AuthContext';
// import { useState } from 'react';


// import { Swiper, SwiperSlide } from 'swiper/react';

function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

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
        
        <Route path="*" element={<Error />} />
      </Routes>
      {/* </AuthProvider> */}
    </div>
  );
}

export default App;
