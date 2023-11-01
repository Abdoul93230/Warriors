import React, { useState } from "react";
import { X } from "react-feather";
import image1 from "../../Images/sac.png";

import "./AdminStoreAddpub.css";

function AdminStoreAddpub() {
  const [val, setVal] = useState(true);
  return (
    <div className="AdminStoreAddpub">
      <div className="left">
        {val ? (
          <div>
            <h1 style={{ color: "white" }}>pubs</h1>
            <div className="contCarde">
              {[
                { name: "categorie1", image: image1, id: 1 },
                { name: "categorie2", image: image1, id: 2 },
              ]?.map((param, index) => {
                return (
                  <div className="carde" key={index}>
                    <h4>
                      {" "}
                      Categorie:
                      {param.name}
                    </h4>
                    <img src={param.image} alt="loading" />
                    <span>
                      <X />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <h1>Auccune pub enregistrer pour le moment .</h1>
        )}
      </div>
      {/* <div className="left">
        {allPub && allPub.length > 0 ? (
          <div>
            <h1>pub</h1>
            <div className="contCarde">
              {allPub?.map((param, index) => {
                return (
                  <div className="carde" key={index}>
                    <h4>
                      {" "}
                      Categorie:
                      {
                        allCategories?.find(
                          (item) => item._id === param.clefCategorie
                        )?.name
                      }
                    </h4>
                    <img src={param.image} alt="loading" />
                    <span>
                      <X onClick={() => deletProductPub(param._id)} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <h1>Auccune pub enregistrer pour le moment .</h1>
        )}
      </div> */}
      <div
        className="right"
        style={{ backgroundColor: "transparent", color: "white" }}
      >
        <h5 style={{ color: "white" }}>Ajouter une pub :</h5>
        <form>
          <div className="formGroup">
            <span>Images</span>
            <input type="file" required="required" />

            <span>Categorie</span>
            <select>
              <option>choisir</option>
              {["categorie1", "categorie2", "categorie3", "categorie4"]?.map(
                (param, index) => {
                  return <option key={index}>{param}</option>;
                }
              )}
            </select>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default AdminStoreAddpub;
