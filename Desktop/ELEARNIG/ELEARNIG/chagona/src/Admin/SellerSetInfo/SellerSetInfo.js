import React, { useEffect, useState } from "react";
import "./SellerSetInfo.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Edit3,
  PhoneCall,
  Shuffle,
} from "react-feather";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function SellerSetInfo() {
  const navigue = useNavigate();

  const [userRegion, setUserRegione] = useState("");
  const [userVille, setUserVille] = useState("");
  const [userStoreName, setUserStoreName] = useState("");
  const [userSlug, setUserSlug] = useState("");
  const [category, setUserCategory] = useState("");
  const [userIdentityCard, setUserIdentityCard] = useState(null);
  const [message, setMessage] = useState(null);
  const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  function goBack() {
    // window.history.back();
    navigue("/SignUpStore");
  }

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
  const [isloading, setIsloading] = useState(false);

  const validateCredentials = () => {
    // setIsloading(true);
    const region = userRegion.trim();
    const ville = userVille.trim();
    const storeName = userStoreName.trim();
    const slug = userSlug.trim();
    const Identity = userIdentityCard;
    const categorie = category;

    if (category === "" || category === "choix") {
      handleAlertwar("Veuillez selectionner une category de produits.");
      return false;
    } else if (storeName === "" || storeName.length < 3) {
      handleAlertwar(
        "Veuillez entrer un nom de storeName valide au moins 3 string."
      );
      return false;
    } else if (region === "" || region.length < 3) {
      handleAlertwar("Veuillez entrer un nom de region valide.");
      return false;
    } else if (ville === "" || ville.length < 3) {
      handleAlertwar("Veuillez entrer un nom de ville valide.");
      return false;
    } else if (slug === "" || slug.length < 3) {
      handleAlertwar("Veuillez entrer un bon slogant pour votre Reference.");
      return false;
    } else if (Identity == null || !allowedImageTypes.includes(Identity.type)) {
      handleAlertwar("Veuillez entrer une photo Identite correcte.");
      return false;
    } else {
      console.log(categorie);
      const data = JSON.parse(localStorage.getItem("registrationH227"));
      const userData = {
        titel: "etape2",
        email: data.email,
        name: data.name,
        password: data.password,
        phone: data.phone,
        region: region,
        ville: ville,
        storeName: storeName,
        slug: slug,
        identity: Identity,
        categorie: category,
      };
      localStorage.setItem("registrationH227", JSON.stringify(userData));

      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("name", data.name);
      formData.append("password", data.password);
      formData.append("phone", data.phone);
      formData.append("region", region);
      formData.append("ville", ville);
      formData.append("storeName", storeName);
      formData.append("slug", slug);
      formData.append("image", Identity);
      formData.append("categorie", category);
      setIsloading(true);
      axios
        .post(`${BackendUrl}/createSeller`, formData)
        .then((response) => {
          const dateActuelle = new Date();
          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          const dateInscription = dateActuelle.toLocaleDateString(
            "fr-FR",
            options
          );

          if (response.status === 200) {
            const message = `<h1>Nouveau Seller Inscrit sur Habou227</h1>
              <p>Cher(e)Habou227,</p>
              <p>Nous avons le plaisir de vous informer qu'un nouvel utilisateur s'est inscrit sur Habou227. Voici les détails de l'utilisateur :</p>
              <ul>
                  <li>Nom : ${data.name}</li>
                  <li>Adresse e-mail : ${data.email}</li>
                  <li>Date d'inscription : ${dateInscription}</li>
              </ul>
              <p>Vous pouvez vérifier ces informations dans notre base de données pour assurer le suivi approprié. N'hésitez pas à contacter l'utilisateur pour le saluer et l'orienter dans son expérience de magasinage en ligne.</p>
              <p>Si vous avez des questions ou avez besoin d'informations supplémentaires, n'hésitez pas à me contacter à [abdoulrazak9323@gmail.com] ou par téléphone au [+227 87727501].</p>
              <p>Nous sommes ravis d'accueillir de nouveaux utilisateurs sur Habou227 et espérons que cette nouvelle inscription contribuera à notre croissance continue.</p>
              <p>Cordialement,</p>
              <p>Abdoul Razak<br>L'équipe Habou227</p>`;
            const emailData = {
              senderEmail: data.email,
              subject: "Nouveau utilisateur",
              message: `<div>${message}</div`,
              titel: `<br/><br/><h3>Nouveau Seller sur Habou227</h3>`,
            };

            axios
              .post(`${BackendUrl}/sendMail`, emailData)
              .then((response) => {})
              .catch((error) => {
                console.error("Erreur lors de la requête email:", error);
              });
          }
          setIsloading(false);
          localStorage.removeItem("registrationH227");
          handleAlert(response.data.message);
          navigue("/ValidationDemandeStore");
        })
        .catch((error) => {
          setIsloading(false);
          console.log(error.response.status);
          if (error.response.status === 400) {
            handleAlertwar(error.response.data.message);
            return;
          }
          if (error.response.status === 409) {
            setIsloading(false);
            handleAlertwar(error.response.data.message);
            return;
          }
          // console.log(error.response.data.message);
          console.log(error.response);
        });
      //// sans oublier de supprimer l'objet registrationH227 dans le localstorage apres l'envoi de la demande.
      //// et aussi de mettre un objet qui va permetre d'afficher la page du message de validation  et de cacher les pages de registration jusqu'a ce que il puisse se connecter avec ces identifiants
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("registrationH227"));
    if (data && data.titel === "etape2") {
      setMessage("veuiller finaliser votre enregistrement.");
      setUserRegione(data.region);
      setUserVille(data.ville);
      setUserStoreName(data.storeName);
      setUserSlug(data.slug);
      setUserIdentityCard(data.identity);
      if (category.length <= 0) {
        setUserCategory(data.categorie);
      }
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
        <div className="SellerSetInfo">
          <p>{message ? message : ""}</p>
          <div className="conte">
            <h3>
              <span>Habou227</span> Seller Central
            </h3>
            <h4>
              <ArrowLeft onClick={() => goBack()} className="i" /> Final Step
            </h4>
            <ul>
              <li>
                <div className="left">
                  <Edit3 />
                </div>
                <div className="right">
                  <label>category :</label>
                  <select
                    id="category"
                    name="category"
                    onChange={(e) => {
                      const selectedText =
                        e.target.options[e.target.selectedIndex].text;
                      setUserCategory(selectedText);
                    }}
                  >
                    <option value="mode">choix</option>
                    <option value="mode">Mode et vêtements</option>
                    <option value="electronique">
                      Électronique et gadgets
                    </option>
                    <option value="maison">Maison et jardin</option>
                    <option value="beaute">Beauté et soins personnels</option>
                    <option value="sports">Sports et loisirs</option>
                    <option value="artisanat">Artisanat et créations</option>
                    <option value="bijoux">Bijoux et montres</option>
                    <option value="alimentation">
                      Alimentation et boissons
                    </option>
                    <option value="livres">Livres et médias</option>
                    <option value="voyage">Voyage et hébergement</option>
                    <option value="services">Services professionnels</option>
                  </select>
                </div>
              </li>
              <li>
                <div className="left">
                  <Edit3 />
                </div>
                <div className="right">
                  <label>Store Name :</label>
                  <input
                    type="text"
                    value={userStoreName}
                    onChange={(e) => setUserStoreName(e.target.value)}
                    placeholder="tape here"
                  />
                </div>
              </li>
              <li>
                <div className="left">
                  <PhoneCall />
                </div>
                <div className="right">
                  <label>Votre Region :</label>
                  <input
                    type="text"
                    value={userRegion}
                    onChange={(e) => setUserRegione(e.target.value)}
                    placeholder="Niger"
                  />
                </div>
              </li>
              <li>
                <div className="left">
                  <Edit3 />
                </div>
                <div className="right">
                  <label>Votre ville:</label>
                  <input
                    type="text"
                    value={userVille}
                    onChange={(e) => setUserVille(e.target.value)}
                    placeholder="Niamey/Saga"
                  />
                </div>
              </li>
              <li>
                <div className="left">
                  <Shuffle />
                </div>
                <div className="right">
                  <label>Slug:</label>
                  <input
                    type="text"
                    value={userSlug}
                    onChange={(e) => setUserSlug(e.target.value)}
                    placeholder="tape here"
                  />
                </div>
              </li>
              <li>
                <div className="left">
                  <Calendar />
                </div>
                <div className="right">
                  <label>Identity Card :</label>
                  <input
                    type="file"
                    onChange={(e) => setUserIdentityCard(e.target.files[0])}
                  />
                </div>
              </li>
            </ul>
            <button onClick={validateCredentials}>
              Submit{" "}
              <span>
                <ChevronRight />
              </span>
            </button>
            <p>
              Don't have an account? Swipe right to{" "}
              <span
              // onClick={() => {
              //   navigue("/SignUpStore");
              // }}
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

export default SellerSetInfo;
