import React, { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import Select from "ol/interaction/Select";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";

const MapComponent = () => {
  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    const vectorSource = map.getLayers().getArray()[1].getSource();

    const select = new Select();
    map.addInteraction(select);

    select.on("select", (event) => {
      if (event.selected.length > 0) {
        const selectedFeatures = event.selected;
        let buildingCount = 0;
        let roadCount = 0;

        selectedFeatures.forEach((feature) => {
          // Comptez les entités géospatiales en fonction de leurs propriétés ou de leur géométrie
          // Par exemple, vous pouvez vérifier la géométrie de la fonction pour savoir si elle est un point ou une ligne
          if (feature.getGeometry() instanceof Point) {
            buildingCount++;
          } else if (feature.getGeometry() instanceof LineString) {
            roadCount++;
          }
        });

        // Affichez les décomptes dans votre interface utilisateur
        const infoDiv = document.getElementById("info");
        infoDiv.textContent = `Bâtiments : ${buildingCount}, Routes : ${roadCount}`;
      }
    });

    // Gérer le clic sur la carte pour ajouter des fonctionnalités
    map.on("click", (event) => {
      const coords = event.coordinate;
      const newFeature = new Feature({
        geometry: new Point(coords),
      });
      vectorSource.addFeature(newFeature);
    });
  }, []);

  return (
    <div>
      <div id="info">
        <h2>Informations :</h2>
        <p>Cliquez sur la carte pour ajouter des points.</p>
        <p>
          Cliquez sur un point pour afficher les décomptes de bâtiments et de
          routes.
        </p>
      </div>
      <div id="map" style={{ width: "600px", height: "400px" }}></div>
    </div>
  );
};

export default MapComponent;
