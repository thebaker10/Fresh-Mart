import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CheckOut } from "./Pages/CheckOutPage";
import { LoginPage } from "./Components/LoginPage";
import { RegistrationPage } from "./Components/RegistrationPage";
import { HomePage } from "./Pages/HomePage";
import { ProductPage } from "./Pages/ProductPage"
import {OrderHistory} from "./Pages/OrderHistory"
import {OrderDetails} from "./Pages/OrderDetails"
import { FavoritePage } from "./Pages/FavoritePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/product/:productID" element={<ProductPage/>}></Route>
        <Route path="CheckOut" element={<CheckOut/>}></Route>
        <Route path="RegistrationPage" element={<RegistrationPage/>}></Route>
        <Route path="LoginPage" element={<LoginPage/>}></Route>
        <Route path="OrderHistory" element={<OrderHistory/>}></Route>
        <Route path="OrderDetails/:orderID" element={<OrderDetails/>}></Route>
        <Route path="FavoritePage" element={<FavoritePage/>}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
