import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Pagination } from 'swiper/modules';
import { getAdvertsByCities } from "../../../../api/adverts-service";
import { Swiper, SwiperSlide } from "swiper/react";
import { useToast } from "../../../../store/providers/toast-provider";
import { useNavigate } from "react-router-dom";
import 'swiper/scss';
import 'swiper/scss/pagination';
import "./style.scss";
import { useTranslation } from "react-i18next";

const ExploreByCities = () => {

  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const fetchCities = async () => {
    try {
      const resp = await getAdvertsByCities(12);
      setCities(resp);
    } catch (error) {
      const errMsg = Object.values(error.response.data)[0];
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: errMsg,
        life: 3000,
      });
    }
  };

  useEffect(() => {
    fetchCities();
    // eslint-disable-next-line
  }, []);


  const handleSearch = (param) => {
    navigate(`ad/search?city=${param}`);
  }


  return (
    <>
      <Container className="city-statistics">
        <div className="mb-4">
          <h2>{t("byCitiesTranslations.exploreByCitiesTitle")} </h2>
          <h5>{ t("byCitiesTranslations.exploreByCitiesSubtitle")}</h5>
        </div>

        <Swiper
          className="city-swiper"
          modules={[Pagination]}
          pagination={{
            dynamicBullets: true,
            clickable: true
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            500: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
        >
          {cities.map((city, index) => (
            <SwiperSlide key={index} className="cities-slider">
              <Card key={index} className="by-cities-card" onClick={() => handleSearch(city.cityId)}>
                <Card.Img
                  src={`images/cities/${city.cityName}.jpg`}
                  className="by-cities-card-img"
                  alt={city.cityName}
                  onError={(e) => {
                    e.target.src = "images/cities/Default.png";
                  }}
                />
                <Card.ImgOverlay className="statistics">
                  <h6>{city.cityName}</h6>
                  <span className="ad-quantity">{city.cityQuantity}{" ad"}</span>
                </Card.ImgOverlay>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </>
  );
};

export default ExploreByCities;
