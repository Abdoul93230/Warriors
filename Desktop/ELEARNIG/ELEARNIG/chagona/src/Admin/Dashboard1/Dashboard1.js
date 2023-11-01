import React, { useEffect } from "react";
import "./Dashboard1.css";

import "ol/ol.css"; // Importez les styles CSS d'OpenLayers
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Feature from "ol/Feature";
// import Polygon from "ol/geom/Polygon";
import { Fill, Style } from "ol/style";
// import { Icon } from "ol/style";
import { Circle, Stroke } from "ol/style";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";

import {
  Download,
  MessageSquare,
  ShoppingBag,
  TrendingUp,
  UserPlus,
} from "react-feather";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
} from "recharts";
// import axios from "axios";
// import MapComponent from "../Essss";
// import image3 from "../../Images/R3.png";
// const BackendUrl = process.env.REACT_APP_Backend_Url;

const dataRevenu = [
  {
    name: "Ordinateur",
    Maradi: 590,
    Dosso: 800,
    Niamey: 1400,
  },
  {
    name: "Sacs",
    Maradi: 868,
    Dosso: 967,
    Niamey: 1506,
  },
  {
    name: "Cosmetiques",
    Maradi: 1397,
    Dosso: 1098,
    Niamey: 989,
  },
  {
    name: "Baskettes",
    Maradi: 1480,
    Dosso: 1200,
    Niamey: 1228,
  },
  {
    name: "Telephone",
    Maradi: 1520,
    Dosso: 1108,
    Niamey: 1100,
  },
  {
    name: "Bautes",
    Maradi: 1397,
    Dosso: 1098,
    Niamey: 989,
  },
  {
    name: "Sandales",
    Maradi: 1400,
    Dosso: 680,
    Niamey: 1700,
  },
  {
    name: "Crayons",
    Maradi: 590,
    Dosso: 800,
    Niamey: 1400,
  },
];

const data2 = [
  {
    name: "Ordinateur",
    uv: 4000,
    pv: 2400,
    amt: 2400,
    as: "100k",
  },
  {
    name: "Sacs",
    uv: 3000,
    pv: 1398,
    amt: 2210,
    as: "100k",
  },
  {
    name: "Cosmetiques",
    uv: 2000,
    pv: 9800,
    amt: 2290,
    as: "100k",
  },
  {
    name: "Baskettes",
    uv: 2780,
    pv: 3908,
    amt: 2000,
    as: "100k",
  },
  {
    name: "Telephones",
    uv: 1890,
    pv: 4800,
    amt: 2181,
    as: "100k",
  },
  {
    name: "Bautes",
    uv: 2390,
    pv: 3800,
    amt: 2500,
    as: "100k",
  },
  {
    name: "Sandales",
    uv: 3490,
    pv: 4300,
    amt: 2100,
    as: "100k",
  },
  {
    name: "Crayons",
    uv: 4000,
    pv: 2400,
    amt: 2400,
    as: "100k",
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
    as: "100k",
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
    as: "100k",
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
    as: "100k",
  },
];

const data1 = [
  { name: "Avant", value: 200, fill: "#ffc658" },
  { name: "Plus", value: 350, fill: "#0088fe" },
];

// const USER = JSON.parse(localStorage.getItem(`userSellerH227`));

function Dashboard1() {
  // const [vUser, setVUser] = useState(null);
  useEffect(() => {
    // console.log(USER);
    // axios
    //   .get(`${BackendUrl}/getSeller/${USER.id}`)
    //   .then((resp) => {
    //     setVUser(resp.data.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // Créez une instance de carte OpenLayers
    const map = new Map({
      target: "mape", // ID de l'élément DOM où la carte sera rendue
      layers: [
        new TileLayer({
          source: new OSM(), // Source de tuiles OpenStreetMap
        }),
      ],
      view: new View({
        center: fromLonLat([9, 17]), // Centre de l'Afrique (longitude, latitude)
        zoom: 5, // Niveau de zoom initial pour afficher l'Afrique entière
      }),
    });

    const cities = [
      { name: "Niamey", coordinates: [2.1053, 13.5129] },
      { name: "Zinder", coordinates: [8.9881, 13.7977] }, // Coordonnées de Zinder
      { name: "Dosso", coordinates: [3.2081, 13.0494] }, // Coordonnées de Dosso
      { name: "Tahoua", coordinates: [5.2658, 14.9654] }, // Coordonnées de Tahoua
      { name: "difa", coordinates: [13.4317, 16.966] }, // Coordonnées de difa
      { name: "Agadez", coordinates: [7.9919, 16.966] }, // Coordonnées de Agadez
    ];

    // Créez une source de vecteurs
    const vectorSource = new VectorSource();

    // Style pour les points rouges
    const redPointStyle = new Style({
      image: new Circle({
        radius: 5, // Rayon du cercle
        fill: new Fill({
          color: "red", // Couleur de remplissage rouge
        }),
        stroke: new Stroke({
          color: "black", // Couleur de la bordure noire (vous pouvez laisser vide si vous ne voulez pas de bordure)
          width: 2, // Largeur de la bordure en pixels (ajustez selon vos préférences)
        }),
      }),
    });

    // Parcourez la liste des villes et ajoutez un marqueur pour chacune
    cities.forEach((city) => {
      //   const cityMarker = new Feature({
      //     geometry: new Point(fromLonLat(city.coordinates)),
      //   });

      //   cityMarker.setStyle(
      //     new Style({
      //       image: new Icon({
      //         src: "https://openlayers.org/en/latest/examples/data/icon.png", // Lien vers une icône générique
      //         anchor: [0.5, 1],
      //       }),
      //     })
      //   );

      //   vectorSource.addFeature(cityMarker);
      const cityPoint = new Feature({
        geometry: new Point(fromLonLat(city.coordinates)),
      });

      cityPoint.setStyle(redPointStyle);
      vectorSource.addFeature(cityPoint);
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(vectorLayer);
  }, []);
  return (
    <>
      <div className="Dashboard1">
        <div className="top">
          <ul className="ul1">
            <li className="un">
              <h2>DASHBOARD</h2>
              <h4>Welcome to your dashboard</h4>
            </li>
            <li className="deux">
              <Download /> Download RIPORTS
            </li>
          </ul>
          <ul className="ul2">
            {[
              {
                name: "Email Sent",
                pourcentage: 14,
                icon: <MessageSquare />,
                nbr: 12.361,
                data: [
                  { name: "Avant", value: 400, fill: "#8884d8" },
                  { name: "Plus", value: 300, fill: "#82ca9d" },
                ],
              },
              {
                name: "Sales Optained",
                pourcentage: 25,
                icon: <ShoppingBag />,
                nbr: 413.225,
                data: [
                  { name: "Avant", value: 200, fill: "#ffc658" },
                  { name: "Plus", value: 350, fill: "#0088fe" },
                ],
              },
              {
                name: "New Clients",
                pourcentage: 5,
                icon: <UserPlus />,
                nbr: 32.441,
                data: [
                  { name: "Avant", value: 400, fill: "#00C49F" },
                  { name: "Plus", value: 100, fill: "#FFBB28" },
                ],
              },
              {
                name: "Trafic Received",
                pourcentage: 41,
                icon: <TrendingUp />,
                nbr: 1325.134,
                data: [
                  { name: "Avant", value: 500, fill: "#8884d8" },
                  { name: "Plus", value: 300, fill: "#82ca9d" },
                ],
              },
            ].map((param, index) => {
              return (
                <li key={index} className="carde">
                  <div className="un">
                    <h3>{param.icon}</h3>
                    <h4>{param.nbr}</h4>
                    <h5>{param.name}</h5>
                  </div>
                  <div className="deux">
                    <div className="contenaire">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={60} height={60}>
                          <Pie
                            dataKey="value"
                            isAnimationActive={true}
                            data={param.data}
                            cx="50%"
                            cy="50%"
                            outerRadius={25}
                            fill="#888400"
                            label
                          />
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    {/* <p>{param.pourcentage}%</p> */}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="midel">
          <div className="gauche">
            <div className="gh">
              <ResponsiveContainer>
                <ComposedChart
                  width={500}
                  height={400}
                  data={dataRevenu}
                  margin={{
                    top: 20,
                    right: 5,
                    bottom: 20,
                    left: 0,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="name" scale="band" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="Niamey"
                    fill="#8884d8"
                    stroke="#8884d8"
                  />
                  <Bar dataKey="Dosso" barSize={17} fill="#413ea0" />
                  <Line type="monotone" dataKey="Maradi" stroke="#ff7300" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="bas">
              <div className="un">
                <h5>Compaign</h5>
                <div className="graph">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={60} height={60}>
                      <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={data1}
                        cx="50%"
                        cy="50%"
                        outerRadius={48}
                        fill="#888400"
                        label
                      />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <h3>$48.352 revenue genereted</h3>
                <h4>Includes extra misc expenditures and costs</h4>
              </div>
              <div className="deux">
                <h3>Sales Quantity</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={200}
                    height={200}
                    data={data2}
                    margin={{
                      top: 0,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}k`} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                    <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="uv" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="droite">
            <div className="un">
              <h2>Recent Transactions</h2>
              <ul>
                {[
                  {
                    id: "01e4dsa",
                    name: "johndoe",
                    date: "2021-09-01",
                    price: "543.95",
                  },
                  {
                    id: "01a4ds4",
                    name: "johndoe",
                    date: "2022-04-01",
                    price: "133.5",
                  },
                  {
                    id: "0ve4ds7",
                    name: "johndoe",
                    date: "2021-09-01",
                    price: "600.95",
                  },
                  {
                    id: "01ebdma",
                    name: "johndoe",
                    date: "2022-10-09",
                    price: "236.98",
                  },
                  {
                    id: "01e433a",
                    name: "johndoe",
                    date: "2021-12-31",
                    price: "723.40",
                  },
                ].map((param, index) => {
                  return (
                    <li key={index}>
                      <section>
                        <h5>{param.id}</h5>
                        <h6>{param.name}</h6>
                      </section>
                      <section>
                        <p>{param.date}</p>
                      </section>
                      <section>
                        <span className="span">{param.price}</span>
                      </section>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="deux">
              <h4>Niger</h4>
              {/* <img src={image3} alt="loading" /> */}
              <div
                id="mape"
                style={{
                  width: "100%",
                  height: "400px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* <MapComponent /> */}
    </>
  );
}

export default Dashboard1;
