import React, { useState, useEffect } from "react";
import "./AdminAddProduct.css";
import ReactQuill from "react-quill";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function AdminAddProduct() {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ font: [] }],
      [{ size: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "video", "image"],
      [{ color: [] }, { background: [] }],
    ],
  };

  const user = JSON.parse(localStorage.getItem("userSellerH227"));
  const [isWaiting, setIsWaitting] = useState(false);
  const [Image1, setImage1] = useState(null);
  const [Image2, setImage2] = useState(null);
  const [Image3, setImage3] = useState(null);
  const [nouveauChampImages, setNouveauChampImages] = useState(null);
  const [name, setName] = useState("");
  const [quantite, setQuantite] = useState(1);
  const [prix, setPrix] = useState(0);
  const [marque, setMarque] = useState("");
  const [prixPromo, setPrixPromo] = useState(0);
  const [smailDescription, setSmailDescription] = useState("");
  const [description, setDescription] = useState("Enter The Description");

  const [categories, setCategories] = useState(null);
  const [typeProduits, setTypeProduits] = useState(null);
  const [ClefType, setClefType] = useState(null);

  const [tails, setTails] = useState([11.4, 33, 33, 42]);

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

  useEffect(() => {
    axios
      .get(`${BackendUrl}/getAllCategories`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${BackendUrl}/getAllType`)
      .then((res) => {
        setTypeProduits(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const createProduct = () => {
    const errorMessages = {
      image1: "Vous devez mettre l'image1",
      image2: "Vous devez mettre l'image2",
      image3: "Vous devez mettre l'image3",
      name: "Vous devez mettre un nom de produit valide",
      quantite: "la quantite du produit n'est pas valide",
      prix: "le prix du produit n'est pas valide",
      colors: "Vous devez mettre au moins une couleur du produit",
      tails: "Vous devez mettre au moins une taille du produit",
      descriptionLength: "La description doit comporter au moins 20 caractères",
      priceInvalid: "Le prix est incorrect",
      quantityInvalid: "La quantité n'est pas valide",
      categorieInvalid: "La catégorie n'est pas valide",
      typeDeProduitsInvalid: "Le type de produits n'est pas valide",
      fournisseurInvalid: "Le fournisseur n'est pas valide",
    };

    const regexNumber = /^\d+$/;

    if (name.length < 2) {
      handleAlertwar(errorMessages.name);
      return;
    }
    if (prix < 2) {
      handleAlertwar(errorMessages.prix);
      return;
    }
    if (quantite < 1) {
      handleAlertwar(errorMessages.quantite);
      return;
    }

    if (!Image1) {
      handleAlertwar(errorMessages.image1);
      return;
    }
    if (!Image2) {
      handleAlertwar(errorMessages.image2);
      return;
    }
    if (!Image2) {
      handleAlertwar(errorMessages.image2);
      return;
    }

    if (description.length <= 20) {
      handleAlertwar(errorMessages.descriptionLength);
      return;
    }

    if (!regexNumber.test(prix) || Number(description.price) < 40) {
      handleAlertwar(errorMessages.priceInvalid);
      return;
    }

    if (!regexNumber.test(quantite) || Number(quantite) <= 0) {
      handleAlertwar(errorMessages.quantityInvalid);
      return;
    }

    if (ClefType === "Select Type" || !ClefType) {
      handleAlertwar(errorMessages.typeDeProduitsInvalid);
      return;
    }
    if (name.length < 2) {
      handleAlertwar(errorMessages.name);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image1", Image1);
    formData.append("image2", Image2);
    formData.append("image3", Image3);
    formData.append("quantite", quantite);
    formData.append("prix", prix);
    formData.append("prixPromo", prixPromo);
    formData.append("description", description);
    formData.append("taille", tails);
    formData.append("couleur", []);
    formData.append("ClefType", ClefType);
    formData.append("Clefournisseur", user.id);
    formData.append("marque", marque);
    if (nouveauChampImages && nouveauChampImages.length > 0) {
      for (const file of nouveauChampImages) {
        formData.append("nouveauChampImages", file);
      }
    }

    setIsWaitting(true);

    axios
      .post(`${BackendUrl}/product`, formData)
      .then((res) => {
        handleAlert(res.data.message);
        setIsWaitting(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {!isWaiting ? (
        <div className="AdminAddProduct">
          <div className="top">
            <h2>Add Product</h2>
          </div>
          <div className="bottom">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createProduct();
              }}
            >
              <label>
                Select Type
                <select
                  onChange={(e) => {
                    setClefType(
                      typeProduits[Number(e.target.selectedIndex) - 1]?._id
                    );
                  }}
                >
                  <option>Select Type</option>
                  {typeProduits ? (
                    typeProduits.map((param, index) => {
                      return (
                        <option key={index}>{`${param.name}--> ${
                          categories.find(
                            (item) => item?._id === param?.clefCategories
                          )?.name
                        }`}</option>
                      );
                    })
                  ) : (
                    <option>Aucun</option>
                  )}
                </select>
              </label>
              <div className="Fgroup">
                <label htmlFor="name">
                  Name
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </label>
                <label htmlFor="slug">
                  Marque
                  <input
                    type="text"
                    id="slug"
                    placeholder="marque"
                    onChange={(e) => setMarque(e.target.value)}
                  />
                </label>
              </div>
              <div className="Fgroup">
                <label htmlFor="tailles">
                  tailles
                  <div className="conte">
                    {tails.map((param, index) => {
                      return (
                        <input
                          key={index}
                          onChange={(e) => {
                            if (e.target.value === "0") {
                              let newArear = [...tails];
                              newArear = [
                                ...newArear.slice(0, index),
                                ...newArear.slice(index + 1),
                              ];
                              setTails(newArear);
                            } else {
                              const newArear = [...tails];
                              newArear[index] = e.target.value;
                              setTails(newArear);
                            }
                          }}
                          type="number"
                          defaultValue={param}
                        />
                      );
                    })}
                    <button
                      onClick={() => {
                        const newArear = [...tails];
                        newArear.push(0.1);
                        setTails(newArear);
                      }}
                    >
                      Add
                    </button>
                  </div>
                </label>
                <label htmlFor="quantite">
                  Quantity
                  <input
                    type="number"
                    min={0}
                    id="quantite"
                    placeholder="quantite"
                    defaultValue={quantite}
                    onChange={(e) => {
                      setQuantite(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div className="Fgroup">
                <label htmlFor="prix">
                  Prix
                  <input
                    type="number"
                    min={2}
                    id="prix"
                    placeholder="prix"
                    defaultValue={prix}
                    onChange={(e) => {
                      setPrix(e.target.value);
                    }}
                  />
                </label>
                <label htmlFor="prixPro">
                  Prix Promo
                  <input
                    type="number"
                    min={0}
                    id="prixPro"
                    placeholder="Prix Promo"
                    defaultValue={prixPromo}
                    onChange={(e) => {
                      setPrixPromo(e.target.value);
                    }}
                  />
                </label>
              </div>
              {/* <label htmlFor="Sdesc">
                semail description
                <textarea
                  minLength={0}
                  maxLength={500}
                  defaultValue={smailDescription}
                  placeholder="semail description"
                  onChange={(e) => setSmailDescription(e.target.value)}
                />
              </label> */}
              <label>Descriptions</label>

              <ReactQuill
                theme="snow"
                value={description}
                onChange={(data) => setDescription(data)}
                modules={modules}
                className="edit"
              />
              <label>
                Upload Images p1:
                <input
                  type="file"
                  onChange={(e) => {
                    setImage1(e.target.files[0]);
                  }}
                />
              </label>
              <label>
                Upload Images p2:
                <input
                  type="file"
                  onChange={(e) => {
                    setImage2(e.target.files[0]);
                  }}
                />
              </label>
              <label>
                Upload Images p3:
                <input
                  type="file"
                  onChange={(e) => {
                    setImage3(e.target.files[0]);
                  }}
                />
              </label>
              <label>
                Upload Image colors(max:4)
                <input
                  type="file"
                  multiple // Ajoutez cet attribut pour permettre la sélection de plusieurs fichiers
                  onChange={(e) => {
                    setNouveauChampImages(e.target.files); // Utilisez e.target.files pour récupérer tous les fichiers sélectionnés
                  }}
                />
              </label>
              <input type="submit" onSubmit={createProduct} value="Submit" />
            </form>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Patientez Creation En Encours....</h1>
        </div>
      )}

      <ToastContainer />
    </>
  );
}

export default AdminAddProduct;
