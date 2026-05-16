import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import VerfiyOtp from "./Pages/VerfiyOtp";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import AddProducts from "./components/core/Products/AddProducts";
import PrivateRoute from "./components/Common/PrivateRoute";
import EditProduct from "./components/core/Products/EditProduct"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/verify-otp" element={<VerfiyOtp />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/product"
        element={
          <PrivateRoute>
            <Product />
          </PrivateRoute>
        }
      >
        <Route path="addProduct" element={<AddProducts />} />
        <Route path="editProduct" element={<EditProduct/>}/>
      </Route>
    </Routes>
  );
}

export default App;
