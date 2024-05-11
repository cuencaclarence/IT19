import { BrowserRouter, Routes, Route } from "react-router-dom";


import LoginChoice from "./pages/LoginChoice";

//dealer

import LoginDealer from "./pages/dealerPage/Login";
import DashboardDealer from './pages/dealerPage/dashboard'
import Add from "./pages/dealerPage/content/Add";


//user page

import WelcomePage from './pages/userPage/Welcome'
import CustomerLogin from './pages/userPage/LoginPage'
import CustomerHome from "./pages/userPage/CustomerHome"
import CarInfo from "./pages/userPage/CarInfo";
import Records from "./pages/userPage/Records";


//admin

import LoginAdmin from './pages/Admin/Login'
import AdminDashboard from './pages/Admin/Dashboard'



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/admin-login" element={<LoginAdmin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        
          <Route path="/" element={<LoginChoice />} /> 

          <Route path="/dealer-login" element={<LoginDealer />} /> 
          <Route path="/dashboardDealer" element={<DashboardDealer />} /> 
          <Route path="/addInventory" element={<Add />} /> 


          <Route path="/home" element={<WelcomePage />} /> 
          <Route path="/customer-login" element={<CustomerLogin />} /> 
          <Route path="/customer-home" element={<CustomerHome />} /> 
          <Route path="/carInfo/:vin_id" element={<CarInfo />} />   
          <Route path="/records" element={<Records />} />   


            
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
