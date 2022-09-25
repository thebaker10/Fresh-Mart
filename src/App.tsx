import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CheckOut } from "./Components/CheckOut";
import { HomePage } from "./Pages/HomePage";
import { ProductPage } from "./Pages/ProductPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/product/:productID" element={<ProductPage/>}></Route>
        <Route path="CheckOut" element={<CheckOut/>}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
