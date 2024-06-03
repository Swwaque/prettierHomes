import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { useNavigate } from "react-router-dom/dist";
import { Icon } from "leaflet";
import { Image } from "react-bootstrap";
import "leaflet/dist/leaflet.css";

const EUROPE = [48.46973457587732, 21.203613281250004];

const LocationDisplay = ({ location, style, adverts }) => {
  const [mapLocation, setMapLocation] = useState(null);
  const navigate = useNavigate();
  const mapZoom = adverts ? 5 : 15;

  useEffect(() => {
    if (location) {
      setMapLocation([location.lat, location.lng]);
    } else {
      setMapLocation(EUROPE);
    }
    return () => {
      setMapLocation(null);
    };
  }, [location]);


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

  const advertMarkers = () => {
    return (
      <>
        {
          adverts && adverts.map((advert, index) => (
            <Marker key={index}
              position={[advert.location?.lat, advert.location?.lng]}
              icon={prettierMarker}
              eventHandlers={{
                click: (e) => navigate(`/advert/${advert.slug}`),
              }}
            >
              <Tooltip direction="top" offset={[0, -40]} className="advert-popup">
                <Image
                  style={{ width: "120px", height: "60px", objectFit: "cover" }}
                  src={`data:${advert.image?.type};base64, ${advert.image?.data}`}
                  alt={`${advert.image?.name}`}
                  fluid
                />
                <p style={{
                  margin: 0,
                  width: "120px",
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 1,
                }}
                >
                  {advert.title}
                </p>
                <p style={{
                  margin: 0,
                  width: "120px",
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 1,
                  color: "brown"
                }}
                >${advert.price.toLocaleString()}</p>
              </Tooltip>
            </Marker>
          ))
        }
      </>
    )
  }

  return (
    <>
      {mapLocation &&
        <MapContainer
          className="display-map-container"
          center={mapLocation}
          zoom={mapZoom}
          scrollWheelZoom={true}
          style={style || { height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {
            adverts
              ?
              <>
                {advertMarkers()}
              </>
              :
              <Marker position={location} icon={prettierMarker}>
                <Popup>Location of this advert</Popup>
              </Marker>
          }
        </MapContainer>
      }
    </>
  );
};

export default LocationDisplay;
