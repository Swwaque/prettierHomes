import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useToast } from "../../../store/providers/toast-provider";
import { getMostPopularAdverts } from "../../../api/adverts-service";
import PropertiesCard from "../../properties-page/properties-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';
import "./style.scss";
import { useTranslation } from "react-i18next";
const PopularProperties = () => {
  const [forRent, setForRent] = useState([]);
  const [forSale, setForSale] = useState([]);
  const { showToast } = useToast();
  const { t } = useTranslation();

  const fetchPopularForRent = async () => {
    try {
      const resp = await getMostPopularAdverts(12, "rent");
      setForRent(resp);
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
  const fetchPopularForSale = async () => {
    try {
      const resp = await getMostPopularAdverts(12, "sale");
      setForSale(resp);
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
    fetchPopularForRent();
    fetchPopularForSale();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Container className="popular-container">
        <div className="mb-2">
          <h2>{t("popularPropertiesTranslations.popularPropertiesTitle")} </h2>
          <h5>{t("popularPropertiesTranslations.popularPropertiesSubtitle")}</h5>
        </div>
        {forRent.length > 0 &&
          <Swiper
            className="popular-swiper mb-4"
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            loop={true}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            slidesPerView={1}
            breakpoints={{
              576: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
          >
            {forRent.map((ad, index) => (
              <SwiperSlide key={index}>
                <PropertiesCard ad={ad} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>}
        <div className="mb-2">
          <h5>{t("popularPropertiesTranslations.title")}</h5>
        </div>
        {forSale.length > 0 &&
          <Swiper
            className="popular-swiper"
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            loop={true}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            slidesPerView={1}
            breakpoints={{
              576: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
          >
            {forSale.map((ad, index) => (
              <SwiperSlide key={index}>
                <PropertiesCard ad={ad} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>}
      </Container>
    </>
  );
};

export default PopularProperties;
