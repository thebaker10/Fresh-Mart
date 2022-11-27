import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CheckOut } from "./Pages/CheckOutPage";
import { LoginPage } from "./Components/LoginPage";
import { RegistrationPage } from "./Components/RegistrationPage";
import { HomePage } from "./Pages/HomePage";
import { ProductPage } from "./Pages/ProductPage"
import { OrderHistory } from "./Pages/OrderHistory"
import { OrderDetails } from "./Pages/OrderDetails"

import { AboutPage } from "./Pages/AboutPage";
import { ContactPage } from "./Pages/ContactPage";

import { FavoritePage } from "./Pages/FavoritePage";
import { Category } from "./Pages/Category";
import { getCookie } from "./Services/Util";
import env from "./env.json"
import { $User } from "./Services/State";
import { User } from "./Types/User";


function App() {
  useEffect(() => {
    const userId = getCookie("freshMartUserId")
    if(userId){
      fetch(env.REACT_APP_API_BASE + '/users/' + userId, { credentials: 'include' }).then(b => b.json()).then(user => $User.next(user.data))
    }
    
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/product/:productID" element={<ProductPage />}></Route>
        <Route path="CheckOut" element={<CheckOut />}></Route>
        <Route path="RegistrationPage" element={<RegistrationPage />}></Route>
        <Route path="LoginPage" element={<LoginPage />}></Route>
        <Route path="OrderHistory" element={<OrderHistory />}></Route>
        <Route path="OrderDetails/:orderID" element={<OrderDetails />}></Route>

        <Route path="About" element={<AboutPage />}></Route>
        <Route path="Contact" element={<ContactPage />}></Route>

        <Route path="FavoritePage" element={<FavoritePage />}></Route>
        <Route path="Category" element={<Category />}></Route>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
