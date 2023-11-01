import React, { useEffect, useState } from "react";
import "./SignUp.css";
import {
  User,
  ChevronRight,
  PhoneCall,
  MessageSquare,
  LogIn,
  Lock,
} from "react-feather";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function SignUp() {
  const navigue = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [message, setMessage] = useState(null);
  const handleAlert = (message) => {
    toast.success(`${message} !`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleAlertwar = (message) => {
    toast.warn(`${message} !`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const [isloading, setIsloading] = useState(false);
  const regexPhone = /^[0-9]{8,}$/;

  const validateCredentials = () => {
    const name = userName.trim();
    const email = userEmail.trim();
    const password = userPassword.trim();
    const phoneNumber = userPhone.trim();

    if (name === "" || name.length < 3) {
      handleAlertwar("Veuillez entrer un nom valide au moins 3 string.");
      return false;
    } else if (!validateEmail(email)) {
      handleAlertwar("Veuillez entrer une adresse e-mail valide.");
      return false;
    } else if (password === "" || password.length < 6) {
      handleAlertwar(
        "Veuillez entrer un mot de passe valide au moins 6 carracters."
      );
      return false;
    } else if (!regexPhone.test(phoneNumber) || phoneNumber.length > 11) {
      handleAlertwar("Veuillez entrer un numero fonctionnel");
      return false;
    } else {
      // Mettre un setIntervall de 2 seconds avant de passer
      const userData = {
        titel: "etape1",
        email: userEmail,
        name: userName,
        password: userPassword,
        phone: userPhone,
      };
      localStorage.setItem("registrationH227", JSON.stringify(userData));
      navigue("/SellerSetInfo");
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("registrationH227"));
    if (data && (data.titel === "etape1" || data.titel === "etape2")) {
      setMessage("veuiller finaliser votre enregistrement.");
      setUserEmail(data.email);
      setUserName(data.name);
      setUserPassword(data.password);
      setUserPhone(data.phone);
    }
  }, []);

  return (
    <>
      {isloading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ textAlign: "center" }}>
            Traitement en cours Veuillez Patientez....
          </h1>
        </div>
      ) : (
        <div className="AdminStoreSignUp">
          <p>{message ? message : ""}</p>
          <div className="conte">
            <h3>
              Get Started Selling on <span>Habou227</span>
            </h3>
            <ul>
              <li>
                <div className="left">
                  <MessageSquare />
                </div>
                <div className="right">
                  <label>Email</label>
                  <input
                    value={userEmail}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                    type="email"
                    placeholder="janedoe123@email.com"
                  />
                </div>
              </li>
              or
              <li>
                <div className="left">
                  <PhoneCall />
                </div>
                <div className="right">
                  <label>Phone Number</label>
                  <input
                    type="number"
                    defaultValue={userPhone}
                    onChange={(e) => {
                      setUserPhone(e.target.value);
                    }}
                    placeholder="+227 87727501"
                  />
                </div>
              </li>
              <li>
                <div className="left">
                  <User />
                </div>
                <div className="right">
                  <label>UserName</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    placeholder="janedoe12345"
                  />
                </div>
              </li>
              <li>
                <div className="left">
                  <Lock />
                </div>
                <div className="right">
                  <label>Password</label>
                  <input
                    type="password"
                    value={userPassword}
                    onChange={(e) => {
                      setUserPassword(e.target.value);
                    }}
                    placeholder="*******************"
                  />
                </div>
              </li>
            </ul>

            <button
              style={{ color: "white" }}
              onClick={() => {
                validateCredentials();
              }}
            >
              Next{" "}
              <span>
                <ChevronRight />
              </span>
            </button>
            <p>
              By creating an account, you agree to our{" "}
              <span>Terms of Service</span> and <span>Privacy Policy</span>
            </p>
            <p
              className="lo"
              onClick={() => {
                navigue("/");
              }}
            >
              <LogIn className="i" /> Login
            </p>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default SignUp;
