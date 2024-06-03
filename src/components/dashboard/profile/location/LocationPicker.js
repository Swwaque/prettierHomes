import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useTranslation } from "react-i18next";

const DEFAULT_POSITION = [51.506845987685146, -0.12784378224492746];

const LocationPicker = ({ onlyRead = false, formik, field, zoomLevel = 5 }) => {
  const [initialPosition, setInitialPosition] = useState(null);
  const mapRef = useRef(null);

  const prettierMarker = new Icon({
    iconUrl: require("./marker/prettier-marker-sm.png"),
    iconRetinaUrl: require("./marker/prettier-marker-lg.png"),
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    shadowSize: [40, 40],
    shadowAnchor: [12, 40],
  });

  const MapEventsHandler = () => {
    useMapEvents({
      click: (event) => {
        if (!onlyRead) {
          const { lat, lng } = event.latlng;
          formik.setFieldValue(field, [lat, lng]);
        }
      },
    });
  };
  const {t} = useTranslation();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo(formik.values[field], zoomLevel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values[field]]);

  useEffect(() => {
    if (formik.values[field].length > 0) {
      setInitialPosition(formik.values[field]);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setInitialPosition([latitude, longitude]);
        },
        (error) => {
          setInitialPosition(DEFAULT_POSITION);
        }
      );
    } else {
      setInitialPosition(DEFAULT_POSITION);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {initialPosition && (
        <>
          <p>{t("locationPickerTranslations.titleP")} </p>
          <MapContainer
            center={initialPosition}
            zoom={zoomLevel}
            scrollWheelZoom={true}
            style={{ height: "400px", width: "100%", cursor: "pointer" }}
            ref={mapRef}
            minZoom={5}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {formik.values[field].length > 0 && (
              <Marker position={formik.values[field]} icon={prettierMarker}>
                <Popup>{t("locationPickerTranslations.popup")}</Popup>
              </Marker>
            )}
            <MapEventsHandler />
          </MapContainer>
        </>
      )}
    </>
  );
};

export default LocationPicker;
