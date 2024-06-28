import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import "./assets/styles/App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Voter from "./components/register/Voter";
import Candidate from "./components/register/Candidate";
import Vote from "./components/Vote";
import Lists from "./components/Lists";
import ElectionCommission from "./components/ElectionCommission";
import store from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="dark:bg-gray-900 h-screen overflow-y-auto">
          <div className="container m-auto flex flex-col gap-5 dark:bg-gray-900">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/voterRegister" element={<Voter />} />
              <Route path="/candidateRegister" element={<Candidate />} />
              <Route path="/Vote" element={<Vote />} />
              <Route path="/Lists" element={<Lists />} />
              <Route
                path="/ElectionCommission"
                element={<ElectionCommission />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
