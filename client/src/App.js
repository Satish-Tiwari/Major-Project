import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from "./Context/UserContext.jsx";

import Navbar from "./Components/Navbar";

import Products from "./Components/Products";
import ViewSingleProduct from "./Components/Pages/ViewSingleProduct";
import Cart from "./Components/Pages/Cart";
import ProceedToCheckout from "./Components/Pages/ProceedToCheckout";

import Login from "./Components/Utils/Login";
import SignUp from "./Components/Utils/SignUp";
import User from "./Components/Pages/Dashboard/User";
import MyOrders from "./Components/Pages/Dashboard/MyOrders";
import ViewSingleOrder from "./Components/Pages/Dashboard/ViewSingleOrder";

import Clothes from "./Components/Pages/SubPages/Clothes";
import Mobile from "./Components/Pages/SubPages/Mobile";
import Books from "./Components/Pages/SubPages/Books";
import KitchenAccessories from "./Components/Pages/SubPages/KitchenAccessories";
import DairyBreakfast from "./Components/Pages/SubPages/DairyBreakfast";
import Fruits from "./Components/Pages/SubPages/Fruits";

import ErrorPage from "./Components/Utils/ErrorPage";
import Footer from "./Components/Pages/Footer";

function App() {
  return (
    <>
      <UserContext>
        <BrowserRouter>
          <Navbar/>
          <ToastContainer />
          <div className="mt-20">
            <Routes>
              <Route exect path="/" element={<Products/>}/>
              <Route exect path="/product/:id" element={<ViewSingleProduct/>}/>
              <Route exect path="/cart" element={<Cart/>}/>
              <Route exect path="/checkout" element={<ProceedToCheckout/>}/>              
              
              <Route exect path="/login" element={<Login/>}/>
              <Route exect path="/signup" element={<SignUp/>}/>
              <Route exect path="/my-account" element={<User/>}/>
              <Route exect path="/my-orders" element={<MyOrders/>}/>
              <Route exect path="/my-order/:id" element={<ViewSingleOrder/>}/>

              <Route exect path="/clothes" element={<Clothes/>}/>
              <Route exect path="/mobiles" element={<Mobile/>}/>
              <Route exect path="/books" element={<Books/>}/>
              <Route exect path="/kitchen-accessories" element={<KitchenAccessories/>}/>
              <Route exect path="/dairy-breakfast" element={<DairyBreakfast/>}/>
              <Route exect path="/fruits" element={<Fruits/>}/>

              <Route exect path="/*" element={<ErrorPage/>}/>
            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
      </UserContext>
    </>
  );
}

export default App;
