import React, { useState } from "react";
import "./Login.css";
import { User, ChevronRight, Lock, PhoneCall } from "react-feather";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BackendUrl = process.env.REACT_APP_Backend_Url;

function Login({ chg }) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [isloading, setIsloading] = useState(false);
  const navigue = useNavigate();
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPhone = /^[0-9]{8,}$/;

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

  const connect = async () => {
    setIsloading(true);

    // Fonction pour gérer les erreurs
    const handleError = (message) => {
      setIsloading(false);
      handleAlertwar(message);
    };

    // Validation de l'email
    if (userEmail.length !== 0 && !regexMail.test(userEmail)) {
      handleError("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    // Validation du mot de passe
    if (userPassword === "" || userPassword.length < 6) {
      handleError("Votre mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    // Validation du numéro de téléphone
    if (
      userPhone.length > 0 &&
      (!regexPhone.test(userPhone) || userPhone.length > 11)
    ) {
      handleError("Veuillez entrer un numéro de téléphone valide.");
      return;
    }

    // Préparation des données de connexion
    const loginData = {
      email: userEmail.length > 0 ? userEmail : null,
      phoneNumber: userPhone.length > 0 ? userPhone : null,
      password: userPassword,
    };

    // console.log(loginData);

    try {
      const response = await axios.post(
        `${BackendUrl}/SellerLogin`,
        loginData,
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      if (response.status === 200) {
        setIsloading(false);
        if (response.data.isvalid) {
          handleAlert(response.data.message);
          chg();
          navigue("/AdminStore");
        } else {
          navigue("/ValidationDemandeStore");
          handleAlert("Validation en coure de traitement");
        }
        localStorage.setItem(`userSellerH227`, JSON.stringify(response.data));
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      handleError(
        error.response && error.response.status === 400
          ? error.response.data.message
          : "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
      );
    }
  };

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
        <div className="AdmiStore">
          <div className="conte">
            <h3>
              <span>Habou227</span> Seller Central
            </h3>
            <ul>
              <li>
                <div className="left">
                  <User />
                </div>
                <div className="right">
                  <label>Email/UserEmail</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
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
                  <Lock />
                </div>
                <div className="right">
                  <label>
                    Password <span>Forgot Password?</span>
                  </label>
                  <input
                    value={userPassword}
                    onChange={(e) => {
                      setUserPassword(e.target.value);
                    }}
                    type="password"
                    placeholder="*******************"
                  />
                </div>
              </li>
            </ul>

            <button onClick={() => connect()}>
              Log In{" "}
              <span>
                <ChevronRight />
              </span>
            </button>
            <p>
              Don't have an account? Swipe right to{" "}
              <span
                onClick={() => {
                  navigue("/SignUpStore");
                }}
              >
                create a new account
              </span>
            </p>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default Login;
