import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../api/favorites-service";
import { useToast } from "../../store/providers/toast-provider";
import { showModal, toggleFav } from "../../store/slices/fav-slice";
import { HiMiniHeart } from "react-icons/hi2";
import "./properties-card.scss";
import { useTranslation } from "react-i18next";

const PropertiesCard = ({ ad }) => {
  const { favorites } = useSelector((state) => state.fav);
  const { isUserLogin } = useSelector((state) => state.auth);

  const isFaved = favorites.includes(ad.id);
  const formatedPrice = ad.price?.toLocaleString();
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const handleFavorite = async () => {
    if (isUserLogin) {
      setLoading(true);
      try {
        await toggleFavorite(ad.id);
        dispatch(toggleFav(ad.id));
      } catch (err) {
        showToast({
          severity: "error",
          summary: t("error.error"),
          detail: Object.values(err.response.data)[0],
        });
      } finally {
        setLoading(false);
      }
    } else {
      dispatch(showModal());
    }
  };

  return (
    <>
      <Card className="property-card">
        <Link to={`/advert/${ad.slug}`} className=" text-decoration-none">
          <Card.Img
            variant="top"
            src={`data:${ad.image.type};base64, ${ad.image.data}`}
            alt={ad.image.name}
            className="property-card-img"
          />
        </Link>
        <button
          className={`fav-button ${isFaved ? "faved" : ""}`}
          onClick={handleFavorite}
          disabled={loading}
        >
          <HiMiniHeart className="heart-icon" />
        </button>
        <div className="property-card-body">
          <div className="property-card-info">
            <Card.Title>{ad.title}</Card.Title>
            <Card.Text>
              {ad.district.name}, {ad.city.name}
            </Card.Text>
          </div>
          <span className="price">${formatedPrice}</span>
        </div>
      </Card>
    </>
  );
};

export default PropertiesCard;
