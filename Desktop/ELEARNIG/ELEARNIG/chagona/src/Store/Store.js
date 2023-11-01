import React, { Fragment, useState } from "react";
import "./Store.css";
import image1 from "../Images/vtnike3.jpg";
import image2 from "../Images/sac.png";
import image3 from "../Images/pub3.jpg";
import Popup from "reactjs-popup";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Feather,
  Heart,
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  X,
  Home,
  User,
  ArrowRight,
  Grid,
  Rss,
} from "react-feather";

function Store() {
  const navigue = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const chg1 = (n) => {
    const styles = document.getElementsByClassName("sty");
    for (let i = 0; i < styles.length; i++) {
      if (i !== n && styles[i].classList.contains("style")) {
        styles[i].classList.remove("style");
      }
    }
    styles[n].classList.add("style");
  };
  const chg2 = (n) => {
    const styles = document.getElementsByClassName("sty2");
    for (let i = 0; i < styles.length; i++) {
      if (i !== n && styles[i].classList.contains("style2")) {
        styles[i].classList.remove("style2");
      }
    }
    styles[n].classList.add("style2");
  };

  const chg3 = (index) => {
    const styles = document.getElementsByClassName("like");
    if (styles[index].classList.contains("likee")) {
      styles[index].classList.remove("likee");
    } else {
      styles[index].classList.add("likee");
    }
  };

  const chg4 = () => {
    const style = document.querySelector(".Store .Categories");
    if (style.classList.contains("show")) {
      style.classList.remove("show");
    } else {
      style.classList.add("show");
    }
  };

  const [option, setOption] = useState("home");

  return (
    <div className="Store">
      <div className="top">
        <ul>
          <li>
            <ChevronLeft />
          </li>
          <li className="s">
            <form>
              <input type="search" placeholder="Search in this store" />
              <span className="search">
                <Search />
              </span>
            </form>
          </li>
          <li>
            <Popup
              trigger={
                <button
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "none",
                    background: "transparent",
                  }}
                >
                  {" "}
                  <span className="plu">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </button>
              }
              position="bottom center"
            >
              <div
                style={{
                  // height: 200,`
                  background: "white",
                  boxShadow: "0px 0px 8px #515C6F",
                  marginRight: "0px",
                  borderRadius: "12px",
                  marginLeft: -165,
                }}
              >
                <ul
                  className="pop"
                  style={{
                    width: 180,
                    listStyleType: "none",
                    padding: 10,
                    fontFamily: "serif",
                    marginTop: 5,
                  }}
                >
                  <li
                    style={{
                      margin: "15px 2px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Home style={{ marginRight: 10 }} /> Home
                  </li>
                  <li
                    style={{
                      margin: "15px 2px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Heart style={{ marginRight: 10 }} /> Wish List
                  </li>
                  <li
                    style={{
                      margin: "15px 2px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <User style={{ marginRight: 10 }} /> Account
                  </li>
                  <li
                    style={{
                      margin: "15px 2px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Feather style={{ marginRight: 10 }} /> App Suggestion
                  </li>
                </ul>
              </div>
            </Popup>
          </li>
        </ul>
      </div>
      <div className="midel">
        <ul>
          <li>
            <ShoppingBag onClick={() => navigue("/SellerInformations/1")} />
          </li>
          <li>
            <h4>Shop 1103079034 Store</h4>
            <p>2 followers</p>
          </li>
          <li>
            <button>Follow</button>
          </li>
        </ul>
        <div className="reviews">
          <span>0%</span>
          <span>
            Customer reviews <ChevronRight className="i" />
          </span>
        </div>
      </div>
      <div className="midel2">
        <ul>
          <li
            className="sty style"
            onClick={() => {
              chg1(0);
              setOption("home");
            }}
          >
            Home
          </li>
          <li
            className="sty"
            onClick={() => {
              chg1(1);
              setOption("all items");
            }}
          >
            All items
          </li>
          <li
            className="sty"
            onClick={() => {
              chg1(2);
              setOption("New arrivals");
            }}
          >
            New arrivals
          </li>
        </ul>
      </div>
      {option === "home" ? (
        <div className="home">
          <div className="carousel-container">
            <Slider {...settings}>
              {[image2, image3, image2].length > 0 ? (
                [image2, image3, image2].map((param, index) => {
                  return (
                    <div className="slide" key={index}>
                      <img src={param} alt="loading" />

                      <div className="button">
                        <h6>SEE MORE</h6>
                        {/* <h6 onClick={() => navigue(`/PubDet/${param._id}`)}>
                              SEE MORE
                            </h6> */}
                        <span>
                          <ChevronRight />
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}

              {/* Ajoutez d'autres éléments de diapositives ici */}
            </Slider>
          </div>
          <div className="reduct">
            <div className="left">
              <h2>XOF 3,808</h2>
              <p>Spend XOF42,315, Get XOF3,808 off(excludes shipping costs)</p>
            </div>
            <div className="right">
              <span>SN49WDVYUJAC</span>
              <button>Collect</button>
            </div>
          </div>
          <div className="hot_deals">
            <h2
              onClick={() => {
                setOption("all items");
                chg1(1);
              }}
            >
              Hot deals <ArrowRight style={{ width: 20, height: 20 }} />
            </h2>
            <div className="contCarde">
              {[1, 2, 3].map((param, index) => {
                return (
                  <div key={index} className="carde">
                    <img src={image1} alt="loading" />
                    <h3>
                      XOF <span>11,303F</span>
                    </h3>
                    <h4>112 sold</h4>
                    <span className="s">{+index + 1}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="new_arrivals">
            <h2
              onClick={() => {
                setOption("New arrivals");
                chg1(2);
              }}
            >
              New arrivals <ArrowRight style={{ width: 20, height: 20 }} />
            </h2>
            <div className="contCarde">
              {[1, 2, 3].map((param, index) => {
                return (
                  <div key={index} className="carde">
                    <img src={image1} alt="loading" />
                    <h3>
                      XOF <span>11,303F</span>
                    </h3>
                    {/* <h4>112 sold</h4>
                    <span className="s">{+index + 1}</span> */}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="prod">
            <h2>Picked for you</h2>
            <div className="contCarde">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((param, index) => {
                return (
                  <div key={index} className="carde">
                    <img src={image1} alt="loading" />
                    <h3>
                      XOF <span>11,303F</span>
                    </h3>
                    <h4>112 sold</h4>
                    <p>Golf Jacket Vest For Men summ...</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : option === "all items" ? (
        <div className="body">
          <div className="top">
            <ul>
              <li className="sty2 style2" onClick={() => chg2(0)}>
                Best match
              </li>
              <li className="sty2" onClick={() => chg2(1)}>
                Ordes
              </li>
              <li className="sty2" onClick={() => chg2(2)}>
                Prices
              </li>
            </ul>
            <span>Free shipping</span>
          </div>
          <div className="conteCarde">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((param, index) => {
              return (
                <div key={index} className="carde">
                  <img src={image1} alt="loading" />
                  <h4>
                    XOF <span>9 000F</span>
                  </h4>
                  <h2>Extra 6% off with coins</h2>
                  <h5>5 sold</h5>
                  <h6>Korean Autumn Women Golf We...</h6>
                  <h3>+ Shipping: XOF 2 000F</h3>
                  <Heart className="like" onClick={() => chg3(index)} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="new_arrival">
          <h3>Promo</h3>
          <div className="contCardePromo">
            {[1, 2, 3].map((param, index) => {
              return (
                <div key={index} className="carde">
                  <img src={image1} alt="loadin" />
                  <h3>
                    XOF <span>18 000F</span>
                  </h3>
                  <h4>
                    XOF <span>36 000F</span>
                  </h4>
                  <span className="promo">-50%</span>
                </div>
              );
            })}
          </div>
          {[
            { date: "2023-09-3", item: [1, 2] },
            { date: "2023-07-25", item: [1, 2, 3] },
          ].map((param, index) => {
            return (
              <Fragment key={index}>
                <h2>{param.date}</h2>
                {param.item.map((item, index) => {
                  return (
                    <div key={index} className="cardeConte">
                      <div className="carde">
                        <img src={image1} alt="loading" />
                        <div className="det">
                          <h6>Korean Autumn Women Golf We...</h6>
                          <h5>5 sold</h5>
                          <h4>
                            XOF <span>9 000F</span>
                          </h4>

                          <h3>+ Shipping: XOF 2 000F</h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      )}
      <div className="nav">
        <ul>
          <li onClick={chg4}>
            <Grid /> Categories
          </li>
          <li>
            <Rss /> Feed
          </li>
          <li onClick={() => navigue("/ContactSeller/1")}>
            <MessageCircle /> Contact Seller
          </li>
        </ul>
      </div>
      <div className="Categories">
        <div className="Top">
          <X className="i" onClick={chg4} />
        </div>

        <ul>
          {["Hommes", "Femmes", "Enfants", "Sacs", "Montre"].map(
            (param, index) => {
              return (
                <li key={index}>
                  <Menu style={{ marginRight: 10, marginLeft: 5 }} /> {param}
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
}

export default Store;
