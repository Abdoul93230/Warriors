import React, { useEffect, useState } from "react";

import "./App.css";
import Store from "./Store/Store";
import AdminStore from "./Admin/AdminStore/AdminStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SellerInformations from "./Admin/SellerInformations/SellerInformations";
import ContactSeller from "./ContactSeller/ContactSeller";
import Ordes from "./Admin/Ordes/Ordes";
import Login from "./Admin/AdminStore/Login/Login";
import SignUp from "./Admin/SignUp/SignUp";
import SellerSetInfo from "./Admin/SellerSetInfo/SellerSetInfo";
import ValidationDemandeStore from "./Admin/ValidationDemandeStore/ValidationDemandeStore";

const BackendUrl = process.env.REACT_APP_Backend_Url;
function App() {
  const [etape, setEtape] = useState("");
  const [acces, setAcces] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("registrationH227"));
    if (data && data.titel === "etape1") {
      setEtape("etape2");
    } else if (data && data.titel === "etape2") {
      setEtape("etape2");
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userSellerH227"));

    if (user) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      axios
        .get(`${BackendUrl}/Sellerverify/${user.id}`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.isvalid) {
            setAcces(true);
            // console.log(acces);
          } else {
            setEtape("etape3");
          }
          // console.log(response);
        })
        .catch((error) => {
          setAcces(false);
          console.log(error.response);
          setVerificationComplete(true);
        })
        .finally(() => {
          setVerificationComplete(true);
        });
    } else {
      setVerificationComplete(true);
    }
  }, []);

  const chg = () => {
    setAcces(true);
  };

  const spinnerStyle = {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderTop: "4px solid #FF6969",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    animation: "spin 1s linear infinite",
    margin: "auto",
  };

  const spinnerContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Centre le spinner verticalement sur la page
  };

  return (
    <div>
      <BrowserRouter>
        {verificationComplete ? (
          <Routes>
            <Route
              path="/"
              element={
                acces ? (
                  <AdminStore />
                ) : etape === "etape1" ? (
                  <SignUp />
                ) : etape === "etape2" ? (
                  <SellerSetInfo />
                ) : (
                  <Login chg={chg} />
                )
              }
            />
            <Route path="/SignUpStore" element={<SignUp />} />
            <Route path="/Store" element={<Store />} />
            <Route
              path="/SellerSetInfo"
              element={
                etape === "etape1" || etape === "etape2" ? (
                  <SellerSetInfo />
                ) : (
                  <SignUp />
                )
              }
            />
            <Route
              path="/ValidationDemandeStore"
              element={<ValidationDemandeStore />}
            />
            <Route
              path="/AdminStore"
              element={
                acces ? (
                  <AdminStore />
                ) : etape === "etape3" ? (
                  <ValidationDemandeStore />
                ) : (
                  <Login chg={chg} />
                )
              }
            />
            <Route
              path="/AdminStore/:cat"
              element={
                acces ? (
                  <AdminStore />
                ) : etape === "etape3" ? (
                  <ValidationDemandeStore />
                ) : (
                  <Login chg={chg} />
                )
              }
            />
            <Route
              path="/AdminStore/:cat/:id"
              element={
                acces ? (
                  <AdminStore />
                ) : etape === "etape3" ? (
                  <ValidationDemandeStore />
                ) : (
                  <Login chg={chg} />
                )
              }
            />
            <Route
              path="/AdminStore/orders"
              element={
                acces ? (
                  <Ordes />
                ) : etape === "etape3" ? (
                  <ValidationDemandeStore />
                ) : (
                  <Login chg={chg} />
                )
              }
            />
            <Route
              path="/SellerInformations/:id"
              element={
                acces ? (
                  <SellerInformations />
                ) : etape === "etape3" ? (
                  <ValidationDemandeStore />
                ) : (
                  <Login chg={chg} />
                )
              }
            />
            <Route
              path="/ContactSeller/:id"
              element={<ContactSeller chg={chg} />}
            />
          </Routes>
        ) : (
          <div style={spinnerContainerStyle}>
            <div style={spinnerStyle}></div>
          </div>
        )}
      </BrowserRouter>

      <ToastContainer />
    </div>
  );
}

export default App;
