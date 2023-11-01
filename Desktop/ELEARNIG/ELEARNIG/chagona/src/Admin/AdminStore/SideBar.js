import React from "react";
import "./SideBar.css";
import image1 from "../../Images/IHFt.jpg";
import {
  Edit,
  Grid,
  Home,
  Inbox,
  LogOut,
  Menu,
  Octagon,
  PlusSquare,
  Settings,
  ShoppingCart,
  Trash,
  Users,
} from "react-feather";

function SideBar() {
  return (
    <div className="SideBar">
      <div className="top">
        <h1>
          Adminis <Menu />
        </h1>
        <img src={image1} alt="loading" />
        <h4>ED Roh</h4>
        <h5>Vp Dognaye Admin</h5>
        <h6>
          <Home className="i" /> Dashbord
        </h6>
      </div>
      <div className="bottom">
        <h5>Product</h5>
        <ul>
          <li>
            <PlusSquare className="i" /> Add Product
          </li>
          <li>
            <Trash className="i" /> Delete Product
          </li>
          <li>
            <Edit className="i" /> Update Product
          </li>
          <li>
            <Grid className="i" /> Add Categorie
          </li>
          <li>
            <Octagon className="i" />
            Pub
          </li>
        </ul>
        <h5>Customer</h5>
        <ul>
          <li>
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
  );
}

export default SideBar;
