import React, { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import "./AdminStoreProductUpdate.css";
import { Edit, PlusSquare } from "react-feather";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function AdminStoreProductUpdate() {
  const BackendUrl = process.env.REACT_APP_Backend_Url;
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
  const params = useParams();
  const [isWaiting, setIsWaitting] = useState(false);
  const [imgP, setImgP] = useState(null);
  const [product, setProduct] = useState(null);
  const [Image1, setImage1] = useState(null);
  const [Image2, setImage2] = useState(null);
  const [Image3, setImage3] = useState(null);
  const [imagePlus, setImagePlus] = useState(null);
  const [nouveauChampImages, setNouveauChampImages] = useState(null);
  const [name, setName] = useState("");
  const [quantite, setQuantite] = useState(1);
  const [prix, setPrix] = useState(0);
  const [marque, setMarque] = useState("");
  const [prixPromo, setPrixPromo] = useState(0);
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState(null);
  const [typeProduits, setTypeProduits] = useState(null);
  const [ClefType, setClefType] = useState(null);

  const [tails, setTails] = useState(null);

  const [scale, setScale] = useState(1);
  const editorRef = useRef(null);
  const handleScaleChange = (e) => {
    setScale(parseFloat(e.target.value));
  };

  const handleFileInputChange1 = (param, index) => {
    const selectedFile = param;

    if (selectedFile) {
      const allowedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      if (allowedImageTypes.includes(selectedFile.type)) {
        if (index === 1) {
          setImage1(selectedFile);
          return true;
        } else if (index === 2) {
          setImage2(selectedFile);
          return true;
        } else if (index === 3) {
          setImage3(selectedFile);
          return true;
        } else {
        }
      } else {
        alert(
          "Le fichier sélectionné n'est pas une image valide (JPEG, PNG, GIF, WebP autorisés)."
        );
        return false;
      }
    }
  };

  useEffect(() => {
    const id = params.id;
    axios.get(`${BackendUrl}/Product/${id}`).then((res) => {
      setProduct(res.data.data);
      if (!imgP) setImgP(res.data.data.image1);
      if (!tails) setTails(res.data.data.taille[0].split(","));

      setName(res.data.data.name);
      setPrix(res.data.data.prix);
      setQuantite(res.data.data.quantite);
      setMarque(res.data.data.marque);
      setPrixPromo(res.data.data.prixPromo);
      setClefType(res.data.data.ClefType);
      setDescription(res.data.data.description);
      setNouveauChampImages(res.data.data.pictures);

      // const ctype = res.data.data.ClefType;
      // const cFournisseur = res.data.data.Clefournisseur;

      axios
        .get(`${BackendUrl}/getAllType/`)
        .then((res) => {
          setTypeProduits(res.data.data);

          axios
            .get(`${BackendUrl}/getAllCategories`)
            .then((re) => {
              setCategories(re.data.data);
            })
            .catch((error) => {
              console.log(
                "Erreur lors de la requête vers les catégories :",
                error
              );
            });
        })
        .catch((error) => {
          console.log("Erreur lors de la requête vers les types :", error);
        });
    });
  }, []);

  const handleFileInputChange = (param) => {
    const selectedFiles = param;

    if (selectedFiles) {
      const allowedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      for (let i = 0; i < param.length; i++) {
        if (!allowedImageTypes.includes(selectedFiles[i].type)) {
          return false;
        }
      }
      return true;
    }
  };

  const Update = (e) => {
    e.preventDefault();
    if (name.length < 2) {
      alert("le nom du produits n'est pas valide .");
      return;
    }
    if (marque.length < 2) {
      alert("la marque du produits n'est pas valide .");
      return;
    }
    if (quantite < 1) {
      alert("la quantite du produits n'est pas valide .");
      return;
    }
    if (prix < 1) {
      alert("le prix du produits n'est pas valide .");
      return;
    }
    if (prixPromo < 0) {
      alert("le prixPromo du produits n'est pas valide .");
      return;
    }
    if (description.length < 5) {
      alert("la description du produits n'est pas valide .");
      return;
    }

    const formData = new FormData();
    if (imagePlus && imagePlus.length > 0) {
      if (handleFileInputChange(imagePlus)) {
        for (const file of imagePlus) {
          formData.append("nouveauChampImages", file);
        }
      } else {
        alert(
          "Les fichier sélectionnées ne sont pas des images valide (JPEG, PNG, GIF, WebP autorisés)."
        );
        return;
      }
    }

    formData.append("name", name);
    if (Image1 != null) {
      formData.append("image1", Image1);
    }
    if (Image2 != null) {
      formData.append("image2", Image2);
    }
    if (Image3 != null) {
      formData.append("image3", Image3);
    }

    formData.append("quantite", quantite);
    formData.append("prix", prix);
    formData.append("prixPromo", prixPromo);
    formData.append("description", description);
    formData.append("taille", tails);
    formData.append("couleur", ["colors"]);
    formData.append("ClefType", ClefType);
    // alert(typeProduit);
    formData.append("Clefournisseur", user.id);
    formData.append("marque", marque);

    setIsWaitting(true);
    const id = params.id;
    axios
      .put(`${BackendUrl}/product/${params.id}`, formData)
      .then((res) => {
        alert(res.data.message);

        ////////////////////////////////////////////
        axios.get(`${BackendUrl}/Product/${id}`).then((res) => {
          setProduct(res.data.data);
          if (!imgP) setImgP(res.data.data.image1);
          if (!tails) setTails(res.data.data.taille[0].split(","));

          setName(res.data.data.name);
          setPrix(res.data.data.prix);
          setQuantite(res.data.data.quantite);
          setMarque(res.data.data.marque);
          setPrixPromo(res.data.data.prixPromo);
          setClefType(res.data.data.ClefType);
          setDescription(res.data.data.description);
          setNouveauChampImages(res.data.data.pictures);
          setIsWaitting(false);
        });
        //////////////////////////////////////////////
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {!isWaiting ? (
        <div className="AdminStoreProductUpdate">
          <h3>Update Product (ID : {product?._id})</h3>
          <div className="midele">
            <div className="left">
              <div className="top">
                <div className="un">
                  <div className="col">
                    <img
                      src={product?.image1}
                      alt="loading"
                      onClick={() => setImgP(product?.image1)}
                    />
                    {/* <Delete className="del" /> */}
                    <label htmlFor="i1">
                      <Edit className="M" />
                    </label>
                    <input
                      type="file"
                      id="i1"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        handleFileInputChange1(e.target.files[0], 1);
                      }}
                    />
                  </div>
                  <div className="col">
                    <img
                      src={product?.image2}
                      alt="loading"
                      onClick={() => setImgP(product?.image2)}
                    />
                    {/* <Delete className="del" /> */}
                    <label htmlFor="i2">
                      <Edit className="M" />
                    </label>
                    <input
                      type="file"
                      id="i2"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        handleFileInputChange1(e.target.files[0], 2);
                      }}
                    />
                  </div>
                  <div className="col">
                    <img
                      src={product?.image3}
                      alt="loading"
                      onClick={() => setImgP(product?.image3)}
                    />
                    {/* <Delete className="del" /> */}
                    <label htmlFor="i3">
                      <Edit className="M" />
                    </label>
                    <input
                      type="file"
                      id="i3"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        handleFileInputChange1(e.target.files[0], 3);
                      }}
                    />
                  </div>
                  {/* <div className="col">
                <PlusSquare className="i" />
              </div> */}
                </div>
                <div className="deux">
                  <AvatarEditor
                    ref={editorRef}
                    image={imgP}
                    width={190}
                    height={190}
                    border={2}
                    // borderRadius={50}
                    scale={scale}
                  />
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.01"
                    value={scale}
                    onChange={handleScaleChange}
                    style={{ marginTop: 9, cursor: "pointer" }}
                  />
                  {/* <img src={image} alt="loading" /> */}
                </div>
              </div>
              <h3>Colors {nouveauChampImages?.length}</h3>
              <label htmlFor="ig4">Plus IMG</label>
              <input
                type="file"
                id="ig4"
                multiple
                onChange={(e) => setImagePlus(e.target.files)}
              />
              <div className="color">
                {nouveauChampImages?.map((param, index) => {
                  return (
                    <div className="col" key={index}>
                      <img src={param} alt="loading" />
                      {/* <Delete className="del" />
                  <Edit className="M" /> */}
                    </div>
                  );
                })}

                {nouveauChampImages?.length < 4 ? (
                  <div className="col">
                    <PlusSquare className="i" />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="right">
              <form onSubmit={Update}>
                <label>
                  Select Type :{" "}
                  {typeProduits?.find((item) => item._id === ClefType)?.name}{" "}
                  {`---> `}
                  {
                    categories?.find(
                      (item1) =>
                        item1?._id ===
                        typeProduits?.find((item) => item._id === ClefType)
                          ?.clefCategories
                    )?.name
                  }
                  <select
                    onChange={(e) => {
                      if (e.target.selectedIndex !== 0) {
                        setClefType(
                          typeProduits
                            ? typeProduits[Number(e.target.selectedIndex) - 1]
                                ?._id
                            : null
                        );
                      } else {
                        alert("veuillez selectionner le bon type de produit");
                      }
                    }}
                  >
                    <option>Select Type</option>
                    {typeProduits ? (
                      typeProduits.map((param, index) => {
                        return (
                          <option key={index}>{`${param.name}--> ${
                            categories?.find(
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <label htmlFor="slug">
                    Marque
                    <input
                      type="text"
                      id="slug"
                      value={marque}
                      onChange={(e) => setMarque(e.target.value)}
                    />
                  </label>
                </div>
                <div className="Fgroup">
                  <label htmlFor="tailles">
                    tailles
                    <div className="conte">
                      {tails?.map((param, index) => {
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
                      value={quantite}
                      onChange={(e) => setQuantite(e.target.value)}
                    />
                  </label>
                </div>
                <div className="Fgroup">
                  <label htmlFor="prix">
                    Prix
                    <input
                      type="number"
                      value={prix}
                      min={0}
                      onChange={(e) => setPrix(e.target.value)}
                      id="prix"
                      placeholder="prix"
                    />
                  </label>
                  <label htmlFor="prixPro">
                    Prix Promo
                    <input
                      type="number"
                      min={0}
                      id="prixPro"
                      value={prixPromo}
                      onChange={(e) => setPrixPromo(e.target.value)}
                      placeholder="Prix Promo"
                    />
                  </label>
                </div>
                {/* <label htmlFor="Sdesc">
                  semail description
                  <textarea
                    minLength={0}
                    maxLength={500}
                    placeholder="semail description"
                  />
                </label> */}
                <label>Descriptions</label>
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={(data) => setDescription(data)}
                  modules={modules}
                  placeholder="Écrivez votre message ici..."
                  className="edit"
                />

                <input type="submit" value="Submit" onSubmit={Update} />
              </form>
            </div>
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
          <h1>Patientez mis a jours En Encours....</h1>
        </div>
      )}
    </>
  );
}

export default AdminStoreProductUpdate;
