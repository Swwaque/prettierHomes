import React, { useEffect, useState } from "react";
import { getAdvertTypes, getCategories } from "../../../api/adverts-service";
import {
  Container,
  Dropdown,
  DropdownButton,
  Button,
} from "react-bootstrap";
import { prepareRequestParams } from "../../../helpers/function/request-param-converter";
import { useToast } from "../../../store/providers/toast-provider";
import { useNavigate } from "react-router-dom";
import { config } from "../../../helpers/config";
import { LiaSearchSolid } from "react-icons/lia";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css/effect-fade';
import 'swiper/css';
import "./style.scss";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const [advertTypes, setAdvertTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const { showToast } = useToast();

  // Search Params
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const {t} = useTranslation();

  const fetchAdvertTypes = async () => {
    try {
      const data = await getAdvertTypes();
      const filteredTypes = data.filter((type) => type.builtIn);
      setAdvertTypes(filteredTypes);
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: errMsg,
        life: 2000,
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      const filteredCategories = data.filter((category) => category.builtIn);
      setCategories(filteredCategories);
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: errMsg,
        life: 2000,
      });
    }
  };

  useEffect(() => {
    fetchAdvertTypes();
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  const handleSearch = () => {
    const searchParams = {
      q: query,
      at: type,
      c: category,
    };
    const queryString = prepareRequestParams(searchParams);
    navigate(`ad/search?${queryString}`);
  };

  const handleTypeChange = (typeId) => {
    if (typeId !== type) {
      setType(typeId);
    } else {
      setType("");
    }
  };

  const handleCategoryChange = (categoryId) => {
    if (categoryId !== category) {
      setCategory(categoryId);
    } else {
      setCategory("");
    }
  };

  return (
    <Container className="homepage-banner-container">
      <Swiper
        className="banner-images d-none d-lg-block"
        modules={[EffectFade, Autoplay]}
        effect={'fade'}
        loop={true}
        slidesPerView={1}
        autoplay={{
          delay: 18000,
          disableOnInteraction: false,
        }}
        speed={2000}
      >
        {config.banner.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="banner-slide-image"
              src={image.source}
              alt={image.alt}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="content-wrapper">
        <div className="headline">
          <h3>{t('bannerTranslations.banner1')} </h3>
          <h3>{t('bannerTranslations.banner2')}</h3>
          <h3>{t('bannerTranslations.banner3')}</h3>
        </div>
        <div className="search-panel">
          <div className="advert-type-wrapper d-none d-lg-flex">
            {advertTypes.map((adType, index) => (
              <Button
                key={index}
                className={`ad-type-button btn-link ${adType.id === type ? 'selected' : ''}`}
                onClick={() => handleTypeChange(adType.id)}
              >{t(`bannerTranslations.${adType.title}`, {defaultValue: adType.title}).toUpperCase()}
              </Button>
            ))}
          </div>
          <div className="search-collapse-wrapper">
            <div className="search-input-wrapper">
              <input
                className="form-control"
                name="query"
                type="search"
                placeholder={t('bannerTranslations.bannerSearchPlaceholder')}
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              ></input>
              <Button
                className=""
                onClick={handleSearch}
              >
                <LiaSearchSolid size={25} color="white" />
              </Button>
            </div>
            <div className="type-category-drop-wrapper d-flex d-lg-none">
              <DropdownButton
                // id="type-dropdown"
                className="type-dropdown"
                title={advertTypes.find(search => search.id === type)?.title || t("bannerTranslations.bannerOptionValueTypes")}
              >
                <Dropdown.Item
                  value=""
                  onClick={() => handleTypeChange("")}
                  active={type === ""}
                >
                  {t('bannerTranslations.bannerOptionValueTypes')}
                </Dropdown.Item>
                {advertTypes.map((adType) => (
                  <Dropdown.Item
                    key={adType.id}
                    value={adType.id}
                    onClick={() => handleTypeChange(adType.id)}
                    active={type === adType.id}
                  >
                    {t(`bannerTranslations.${adType.title}`)}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <DropdownButton
                id="category-dropdown"
                className="category-dropdown"
                title={categories.find(search => search.id === category)?.title || t("bannerTranslations.bannerOptionValueCategories")}
              >
                <Dropdown.Item
                  value=""
                  onClick={() => handleCategoryChange("")}
                  active={category === ""}
                >{t('bannerTranslations.bannerOptionValueCategories')}
                </Dropdown.Item>
                {categories.map((cat) => (
                  <Dropdown.Item
                    key={cat.id}
                    value={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    active={category === cat.id}
                  >
                    {t(`bannerTranslations.${cat.title}`)}
                   
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
          </div>
          <div className="category-wrapper d-none d-lg-flex">
            {categories.map((cat, index) => (
              <Button
                key={index}
                className={`ad-type-button btn-link ${cat.id === category ? 'selected' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
              >{t(`bannerTranslations.${cat.title}`).toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Banner;