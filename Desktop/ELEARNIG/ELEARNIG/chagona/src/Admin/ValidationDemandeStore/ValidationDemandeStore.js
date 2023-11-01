import React from "react";
import "./ValidationDemandeStore.css";
import { Check, ChevronRight } from "react-feather";

function ValidationDemandeStore() {
  return (
    <div className="ValidationDemandeStore">
      <div className="carde">
        <span>
          <Check style={{ width: "50px", height: "50px" }} />
        </span>
        <h2>Demande Envoyer avec success!</h2>

        <h4>Elle est en cours de traitement.</h4>
        <p>Nous vous informerons dès que votre compte sera validé et créé.</p>

        <button
        // onClick={() => navigue("/Order")}
        >
          Annuler !{" "}
          <span>
            <ChevronRight />
          </span>
        </button>
      </div>
    </div>
  );
}

export default ValidationDemandeStore;
