import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminStore.css";
import {
  Bell,
  // Edit,
  Grid,
  Home,
  Inbox,
  LogOut,
  Menu,
  Octagon,
  PlusSquare,
  Search,
  Settings,
  ShoppingCart,
  Sunrise,
  Trash,
  User,
  Users,
} from "react-feather";
import image1 from "../../Images/IHFt.jpg";
import Dashboard1 from "../Dashboard1/Dashboard1";
import AdminAddProduct from "../AdminAddProduct/AdminAddProduct";
import AdminStoreProducts from "../AdminStoreProducts/AdminStoreProducts";
import AdminStoreProductUpdate from "../AdminStoreProductUpdate/AdminStoreProductUpdate";
import AdminStoreAddpub from "../AdminStoreAddpub/AdminStoreAddpub";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AvatarEditor from "react-avatar-editor";
import { useRef } from "react";
import LoadingIndicator from "../../Pages/LoadingIndicator ";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function AdminStore() {
  const USER = JSON.parse(localStorage.getItem(`userSellerH227`));
  const [vUser, setVUser] = useState(null);
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [image2, setImage2] = useState(null);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const navigue = useNavigate();
  const params = useParams();
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

  const chg1 = () => {
    const style = document.querySelector(".AdminStore .left").classList;
    if (style.contains("show")) {
      style.remove("show");
    } else {
      style.add("show");
    }
  };
  const handleScaleChange = (e) => {
    setScale(parseFloat(e.target.value));
  };

  useEffect(() => {
    axios
      .get(`${BackendUrl}/getSeller/${USER.id}`)
      .then((resp) => {
        setVUser(resp.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [USER.id]);

  const setImage = () => {
    const id = USER.id;
    setLoading(true);
    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!editorRef.current) {
      console.log("L'éditeur de photos n'est pas défini");
      setLoading(false);
      return;
    }

    const editedCanvas = editorRef.current.getImage();

    // Vérifiez si editedCanvas est défini
    if (!editedCanvas) {
      console.log("Aucune image dans l'éditeur de photos");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    if (image2 !== null) {
      ///////////////////////////////////////////
      editedCanvas.toBlob((blob) => {
        const editedFile = new File([blob], "edited_image.png", {
          type: "image/png",
        });

        if (allowedImageTypes.includes(editedFile.type)) {
          // setLoading(true);

          formData.append("image", editedFile);
          axios
            .put(`${BackendUrl}/setImage/${id}`, formData)
            .then((res) => {
              setLoading(false);
              handleAlert(res.data.data);
              setEditingPhoto(false);

              axios
                .get(`${BackendUrl}/getSeller/${USER.id}`)
                .then((resp) => {
                  setVUser(resp.data);
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              setLoading(false);
              handleAlertwar("OPeration non effectuer.");
              console.log(error);
            });
        } else {
          console.log("Non, le type de fichier édité n'est pas autorisé");
        }
      });
      ///////////////////////////////////////////
    } else {
      handleAlertwar("image Incorrect.");
      return;
    }
  };

  const handleFileInputChange = (param) => {
    const selectedFile = param;

    if (selectedFile) {
      const allowedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      if (allowedImageTypes.includes(selectedFile.type)) {
        setImage2(selectedFile);
        return true;
      } else {
        handleAlertwar(
          "Le fichier sélectionné n'est pas une image valide (JPEG, PNG, GIF, WebP autorisés)."
        );
        setEditingPhoto(false);
        setImage2(null);
        return false;
      }
    }
  };

  return (
    <>
      <LoadingIndicator loading={loading}>
        <div className="AdminStore">
          <div className="left">
            <div className="SideBar">
              <div className="top">
                <h1>
                  Adminis <Menu className="menue" onClick={chg1} />
                </h1>
                <img
                  src={
                    vUser?.image !==
                    "https://chagona.onrender.com/images/image-1688253105925-0.jpeg"
                      ? vUser?.image
                      : image1
                  }
                  alt="loading"
                />
                <label
                  htmlFor="imagS1"
                  onClick={() => setEditingPhoto(true)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#515C6F",
                    cursor: "pointer",
                    fontFamily: "serif",
                    fontWeight: "6000",
                  }}
                >
                  Change
                </label>
                <input
                  type="file"
                  id="imagS1"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileInputChange(e.target.files[0])}
                />
                <h4>{vUser?.name}</h4>
                <h5>{vUser?.storeName} Admin</h5>
                <h6
                  onClick={() => {
                    navigue("/AdminStore/Dashboard");
                    chg1();
                  }}
                >
                  <Home className="i" /> Dashboard
                </h6>
              </div>
              <div className="bottom">
                <h5>Product</h5>
                <ul>
                  <li
                    onClick={() => {
                      navigue("/AdminStore/AddProduct");
                      chg1();
                    }}
                  >
                    <PlusSquare className="i" /> Add Product
                  </li>
                  <li
                    onClick={() => {
                      navigue("/AdminStore/products");
                      chg1();
                    }}
                  >
                    <Trash className="i" /> Products
                  </li>
                  {/* <li>
                <Edit className="i" /> Update Product
              </li> */}
                  <li>
                    <Grid className="i" /> Add Categorie
                  </li>
                  <li
                    onClick={() => {
                      navigue("/AdminStore/AdminStoreAddpub");
                      chg1();
                    }}
                  >
                    <Octagon className="i" />
                    Pub
                  </li>
                </ul>
                <h5>Customer</h5>
                <ul>
                  <li
                    onClick={() => {
                      navigue("/AdminStore/orders");
                      chg1();
                    }}
                  >
                    <ShoppingCart className="i" /> Ordes
                  </li>
                  <li>
                    <Users className="i" />
                    Customer
                  </li>
                  <li>
                    <Inbox className="i" />
                    Inbox
                  </li>
                  <li>
                    <Octagon className="i" /> Coupon
                  </li>
                </ul>
              </div>
              <div className="btn">
                <button>
                  <LogOut /> LogOut
                </button>
                <button>
                  <Settings /> Settings
                </button>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="top T">
              <div className="search">
                <form>
                  <input type="search" placeholder="Search" />
                  <span className="i">
                    <Search />
                  </span>
                </form>
              </div>
              <div className="plus">
                <Sunrise className="i" />
                <Bell className="i" />
                <Settings className="i" />
                <User className="i" />
              </div>
            </div>
            <div
              className="divMenu"
              style={{
                width: "100%",
                height: "auto",
                marginTop: 46,
                color: "#bec6d3",
                cursor: "pointer",
              }}
            >
              <Menu className="Imshow" onClick={chg1} />
            </div>
            <div className="bottom">
              {params.cat === "AddProduct" ? (
                <AdminAddProduct />
              ) : params.cat === "products" ? (
                <AdminStoreProducts />
              ) : params.cat === "AdminStoreProductUpdate" ? (
                <AdminStoreProductUpdate />
              ) : params.cat === "AdminStoreAddpub" ? (
                <AdminStoreAddpub />
              ) : (
                <Dashboard1 />
              )}
            </div>
          </div>
          {editingPhoto && (
            <div
              className="editPhoto"
              style={{
                position: "absolute",
                width: "100%",
                height: "100vh",
                top: "0px",
                left: "0px",
                zIndex: 100,

                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",

                  background: "rgba(0, 0, 0, 0.747)",
                  paddingTop: "100px",
                }}
              >
                <div
                  className="item"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0px 0px 6px #ff6969",
                    borderRadius: "10px",
                    width: 320,
                    margin: "0px auto",
                  }}
                >
                  <AvatarEditor
                    ref={editorRef}
                    image={image2}
                    width={130}
                    height={130}
                    border={10}
                    borderRadius={50}
                    scale={scale}
                    style={{
                      width: "80%",
                      height: "230px",
                      margin: "10px auto",
                    }}
                  />
                  <input
                    type="range"
                    min="1"
                    max="2"
                    step="0.01"
                    value={scale}
                    onChange={handleScaleChange}
                    style={{
                      width: "80%",
                      margin: "0px auto",
                      marginBottom: "15px",
                    }}
                  />
                  <label
                    htmlFor="imagS1"
                    onClick={() => setEditingPhoto(true)}
                    style={{
                      width: "280px",
                      color: "#fff",
                      cursor: "pointer",
                      background: "#ff6969",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "15px",
                      fontFamily: "serif",
                      fontWeight: "bold",
                      margin: "10px auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Select Images
                  </label>
                  <button
                    onClick={() => {
                      setEditingPhoto(false);
                      setImage2(null);
                    }}
                    style={{
                      width: "280px",
                      color: "#fff",
                      cursor: "pointer",
                      background: "#ff6969",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "15px",
                      fontFamily: "serif",
                      fontWeight: "bold",
                      fontSize: "20px",
                      margin: "10px auto",
                    }}
                  >
                    Annuler
                  </button>
                  {image2 ? (
                    <button className="deux" onClick={setImage}>
                      Enregistrer
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          )}
          {/* <SideBar /> */}
        </div>
      </LoadingIndicator>
      <ToastContainer />
    </>
  );
}

export default AdminStore;
