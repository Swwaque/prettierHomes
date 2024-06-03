import React, { useEffect, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import InputText from "../../../common/input-text";
import AddressSelect from "../../../common/address-select";
import {
  getAllCountries,
  getAllCityByCountry,
  getAllDistrictsByCity,
} from "../../../../api/adverts-service";
import LocationPicker from "../location/LocationPicker";
import { useToast } from "../../../../store/providers/toast-provider";
import "./advert-address.scss";
import { useTranslation } from "react-i18next";

const AdvertAddress = ({ formik, fluid }) => {

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const { showToast } = useToast();
  const {t} = useTranslation();

  const zoomLevel = () => {
    if (formik.values.districtId) {
      return 13;
    } else if (formik.values.cityId) {
      return 9;
    } else if (formik.values.countryId) {
      return 6;
    } else {
      return 5;
    }
  }

  const fetchCountries = async () => {
    try {
      const data = await getAllCountries();
      setCountries(data);
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

  const fetchCities = async (countryId) => {
    try {
      const data = await getAllCityByCountry(countryId);
      setCities(data);
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

  const fetchDistricts = async (cityId) => {
    try {
      const data = await getAllDistrictsByCity(cityId);
      setDistricts(data);
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary:  t("error.error"),
        detail: errMsg,
        life: 2000,
      });
    }
  };

  useEffect(() => {
    fetchCountries();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (formik.values.countryId > 0) {
      fetchCities(formik.values.countryId);
      if (countries.length > 0) {
        formik.setFieldValue("cityId", -1);
        formik.setFieldValue("districtId", -1);
      }
    }
    // eslint-disable-next-line
  }, [formik.values.countryId]);

  useEffect(() => {
    if (formik.values.cityId > 0) {
      fetchDistricts(formik.values.cityId);
      if (cities.length > 0) {
        formik.setFieldValue("districtId", -1);
      }
    }
    // eslint-disable-next-line
  }, [formik.values.cityId]);

  return (
    <Container className={`advert-address ${fluid ? "nopadding" : ""}`} fluid={fluid}>
      <h5>{t("advertAddressTranslations.titleH5")} </h5>
      <Row className="row-cols-1 row-cols-lg-3">
        <Col>
          {countries.length > 0 && (
            <AddressSelect
              formik={formik}
              field={"countryId"}
              label={t("advertAddressTranslations.country")}
              options={countries}
              location={true}
              locationField="location"
            />
          )}
        </Col>
        <Col>
          <AddressSelect
            formik={formik}
            field={"cityId"}
            label={t("advertAddressTranslations.city")}
            options={cities}
            location={true}
            locationField="location"
          />
        </Col>
        <Col>
          <AddressSelect
            formik={formik}
            field={"districtId"}
            label={t("advertAddressTranslations.district")}
            options={districts}
            location={true}
            locationField="location"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputText
            formik={formik}
            label={t("advertAddressTranslations.address")}
            type="text"
            field="address"
            placeholder={t("advertAddressTranslations.address")}
            autoComplete="on"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <LocationPicker formik={formik} field={"location"} zoomLevel={zoomLevel()} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Accordion flush>
            <Accordion.Item eventKey="0" disabled>
              <Accordion.Header>
                {t("advertAddressTranslations.accordionHeader")}
              </Accordion.Header>
              <Accordion.Body>
                <Row className="row-cols-1 row-cols-lg-2">
                  <Col>
                    <InputText
                      formik={formik}
                      id={"location-lat"}
                      handleValue={
                        formik.values.location.length > 0
                          ? formik.values.location[0]
                          : 0
                      }
                      handleChange={(e) =>
                        formik.setFieldValue("location", [
                          e.target.value,
                          formik.values.location[1],
                        ])
                      }
                      handleDisable={formik.values.location.length === 0}
                      label={t("advertAddressTranslations.latitude")}
                      type={"number"}
                      field="location"
                      placeholder={t("advertAddressTranslations.placeholderLatitude")}
                      feedback={false}
                    />
                  </Col>
                  <Col>
                    <InputText
                      formik={formik}
                      id={"location-lng"}
                      handleValue={
                        formik.values.location.length > 0
                          ? formik.values.location[1]
                          : 0
                      }
                      handleChange={(e) =>
                        formik.setFieldValue("location", [
                          formik.values.location[0],
                          e.target.value,
                        ])
                      }
                      handleDisable={formik.values.location.length === 0}
                      label= {t("advertAddressTranslations.longitude")}
                      type={"number"}
                      field="location"
                      placeholder={t("advertAddressTranslations.placeholderLongitude")}
                      feedback={false}
                    />
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default AdvertAddress;
