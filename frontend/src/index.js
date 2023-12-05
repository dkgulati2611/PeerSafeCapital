import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./app.js";
import Home from "./pages/home/home.js";
import Login from "./pages/login/login.js";
import Dashboard from "./pages/dashboard/dashboard.js";
import Request from "./pages/requests/requests.js";
import Signup from './pages/signup/signup.js';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Market from './pages/market/market.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<App />}>
            <Route path = "/" element = {<Home />} />
            <Route path = "/home" element = {<Home />} />
            <Route path = "/login" element = {<Login />} />
            <Route path = "/dashboard" element = {<Dashboard />} />
            <Route path = "/requests" element = {<Request />} />
            <Route path = "/market" element = {<Market />} />
            <Route path = "/signup" element = {<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

    <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
    <script
      src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
      crossorigin></script>
    <script
      src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
      crossorigin></script>
    <script>var Alert = ReactBootstrap.Alert;</script>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
