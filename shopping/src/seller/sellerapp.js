import { HashRouter, Routes, Route } from "react-router-dom";
import SellerHeader from './sellerheader';
import Mydashboard from "./dashboard";
import Myorder from "./order";
import Productlist from "./productlist";
import NewProduct from "./newproduct";





const SellerModule = () =>{
   return(
    <HashRouter>
        <SellerHeader/>
        <Routes>
            <Route exact path = "/" element={<Mydashboard/>} />
            <Route exact path = "/order"  element = {<Myorder/>} />
            <Route exact path = "/newproduct" element = {<NewProduct/>} />
            <Route exact path = "/productlist" element = {<Productlist/>} />
        </Routes>
    </HashRouter>
   )
}

export default SellerModule;