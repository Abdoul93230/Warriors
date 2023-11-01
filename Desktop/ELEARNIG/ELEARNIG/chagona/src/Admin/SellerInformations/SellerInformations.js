import React from "react";
import "./SellerInformations.css";
import {
  ArrowLeftCircle,
  Calendar,
  ChevronDown,
  Image,
  MessageCircle,
  ShoppingBag,
  Star,
} from "react-feather";

function SellerInformations() {
  return (
    <div className="SellerInformations">
      <div className="Top">
        <ArrowLeftCircle className="i" />
        <h4>Seller Information</h4>
      </div>
      <div className="midel1">
        <div className="left">
          <h3>Shop1103079034 Store</h3>
          <span>2 followers</span>
          <p>
            <Calendar className="i" /> Niaamey / Niger Sep 01,2023
          </p>
        </div>
        <div className="right">
          <button>Follow</button>
          <span>Business License</span>
        </div>
        <div className="use">
          <ShoppingBag />
        </div>
      </div>
      <div className="midel2">
        <h3>
          Store Credibility <span className="span">Details</span>
        </h3>
        <div className="credite">
          <div className="un">
            <h2>3.7</h2>
            <p>store rating</p>
          </div>
          <div className="deux">
            <p>items as described</p>
            <p>communication</p>
            <p>shipping speed</p>
          </div>
          <div className="trois">
            <p>-</p>
            <p>-</p>
            <p>-</p>
          </div>
        </div>
      </div>
      <div className="midel3">
        <h2>Customer Reviews(0)</h2>
        <div className="conte">
          <div className="un">
            <div>
              {" "}
              <span>0</span>.0%
            </div>
            <p>Positive review</p>
          </div>
          <div className="deux">
            <p>
              Positive <span>0</span>
            </p>
            <p>
              Nqatural <span>0</span>
            </p>
            <p>
              Negqtive <span>0</span>
            </p>
          </div>
        </div>
      </div>
      <div className="midel4">
        <h4>
          Default{" "}
          <span>
            <ChevronDown />
          </span>
        </h4>
        <div className="choix">
          <span>All (0)</span>
          <span>
            <Image /> (0)
          </span>
          <span>Ni (0)</span>
          <span>
            <MessageCircle /> (0)
          </span>
        </div>
        <div className="choix2">
          <span>
            5 <Star className="i" />
          </span>
          <span>
            4 <Star className="i" />
          </span>
          <span>
            3 <Star className="i" />
          </span>
          <span>
            2 <Star className="i" />
          </span>
          <span>
            1 <Star className="i" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default SellerInformations;
