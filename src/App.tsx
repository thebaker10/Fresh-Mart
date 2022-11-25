import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CheckOut } from "./Pages/CheckOutPage";
import { LoginPage } from "./Components/LoginPage";
import { RegistrationPage } from "./Components/RegistrationPage";
import { HomePage } from "./Pages/HomePage";
import { ProductPage } from "./Pages/ProductPage"
import {OrderHistory} from "./Pages/OrderHistory"
import {OrderDetails} from "./Pages/OrderDetails"

import {AboutPage} from "./Pages/AboutPage";
import {ContactPage} from "./Pages/ContactPage";

import { FavoritePage } from "./Pages/FavoritePage";
import { Category } from "./Pages/Category";
import {ForgotPasswordPage} from "./Components/ForgotPasswordPage";
import {ResetPasswordPage} from "./Components/ResetPasswordPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/product/:productID" element={<ProductPage/>}></Route>
        <Route path="CheckOut" element={<CheckOut/>}></Route>
        <Route path="RegistrationPage" element={<RegistrationPage/>}></Route>
        <Route path="LoginPage" element={<LoginPage/>}></Route>
        <Route path="ForgotPassword" element={<ForgotPasswordPage/>}></Route>
        <Route path="ResetPassword/:resetToken/:email" element={<ResetPasswordPage/>}></Route>
        <Route path="OrderHistory" element={<OrderHistory/>}></Route>
        <Route path="OrderDetails/:orderID" element={<OrderDetails/>}></Route>

        <Route path="About" element={<AboutPage/>}></Route>
        <Route path="Contact" element={<ContactPage/>}></Route>

        <Route path="FavoritePage" element={<FavoritePage/>}></Route>
        <Route path="Category" element={<Category/>}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
