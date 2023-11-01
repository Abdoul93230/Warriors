import React, { useState } from "react";
import "./AdminStoreProducts.css";
import { Trash, X } from "react-feather";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useEffect } from "react";
import axios from "axios";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function AdminStoreProducts() {
  const [showPop, setShowPop] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [erreur, setErreur] = useState(null);
  const [products, setProducts] = useState([]);
  const [perPage] = useState(14);
  const [isWaiting, setIsWaitting] = useState(false);
  const [idSup, setIdSup] = useState(null);
  const navigue = useNavigate();

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const displayedProducts = products.slice(
    currentPage * perPage,
    (currentPage + 1) * perPage
  );

  useEffect(() => {
    setTotalPage(Math.ceil(products.length / perPage));
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userSellerH227"));
    axios
      .get(`${BackendUrl}/searchProductBySupplier/${user.id}`)
      .then((res) => {
        if (res.data.data.length > 0) {
          setProducts(res.data.data);
          setTotalPage(Math.ceil(res.data.data.length / perPage));
          setErreur(null);
        }
      })
      .catch((error) => {
        if (error.request.status === 404)
          setErreur(error.response.data.message);
        console.log(error.response);
      });
  }, []);

  const SupprimerProduct = (id) => {
    setIsWaitting(true);
    axios
      .delete(`${BackendUrl}/Product/${id}`)
      .then((rep) => {
        const user = JSON.parse(localStorage.getItem("userSellerH227"));
        axios
          .get(`${BackendUrl}/searchProductBySupplier/${user.id}`)
          .then((res) => {
            if (res.data.data.length > 0) {
              setProducts(res.data.data);
              setTotalPage(Math.ceil(res.data.data.length / perPage));
              setErreur(null);
            }
          })
          .catch((error) => {
            if (error.request.status === 404)
              setErreur(error.response.data.message);
            console.log(error.response);
          });
        alert(rep.data.message);
        setIsWaitting(false);
        setIdSup(null);
        setShowPop(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {!isWaiting ? (
        <div className="AdminStoreProducts">
          <h2>Products</h2>

          <div className="conteCarde">
            {!erreur ? (
              displayedProducts.map((param, index) => {
                return (
                  <div key={index} className="carde">
                    <img
                      onClick={() =>
                        navigue(
                          `/AdminStore/AdminStoreProductUpdate/${param._id}`
                        )
                      }
                      src={param.image1}
                      alt="loading"
                    />
                    <h4>{param.name.slice(0, 20)}...</h4>
                    <h5>Quantite : {param.quantite}</h5>
                    <h6>Disponible: oui</h6>
                    <p>Prix:{param.prix} f</p>
                    <span>
                      <Trash
                        onClick={() => {
                          setShowPop(true);
                          setIdSup(param._id);
                        }}
                      />
                    </span>
                  </div>
                );
              })
            ) : (
              <h1>{erreur}</h1>
            )}
          </div>
          {products.length > perPage ? (
            <ReactPaginate
              pageCount={totalPage}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          ) : (
            <></>
          )}
          {showPop ? (
            <div className="contePop">
              <div className="popop">
                <h3>
                  Delete{" "}
                  <span
                    onClick={() => {
                      setShowPop(false);
                    }}
                  >
                    <X className="i" />
                  </span>
                </h3>
                <p>
                  Etes vous vraiment Sure de bien Vouloir Supprimer ce produit (
                  {idSup}) la !
                </p>
                <img
                  src={
                    displayedProducts?.find((item) => item._id === idSup).image1
                  }
                  alt="loading"
                />
                <div className="choix">
                  <button
                    onClick={() => {
                      setShowPop(!showPop);
                    }}
                  >
                    annuller !
                  </button>
                  <button
                    onClick={() => {
                      SupprimerProduct(idSup);
                    }}
                  >
                    Supprimer !
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
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
          <h1>Patientez Supression En Encours....</h1>
        </div>
      )}
    </>
  );
}

export default AdminStoreProducts;
