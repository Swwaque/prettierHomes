import React, { useEffect, useState } from 'react'
import InputSelect from "../common/input-select";
import InputText from '../common/input-text';
import ButtonComponent from '../common/button-component';
import * as Yup from "yup";
import { useFormik } from "formik";
import { getAdvertTypes, getAllCityByCountry, getAllCountries, getAllDistrictsByCity, getCategories } from '../../api/adverts-service';
import { useToast } from '../../store/providers/toast-provider';
import { Col, Form, Row, Modal } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { prepareRequestParams } from '../../helpers/function/request-param-converter';
import { useTranslation } from 'react-i18next';
import AdvertTypeSelect from '../dashboard/AdvertTypeSelect ';
import CategorySelect from '../dashboard/CategorySelect ';

const SearchPanel = ({ open, setOpen, loading }) => {
    const [advertTypes, setAdvertTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    // const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const handleClose = () => setOpen(false);

    const location = useLocation();
    const navigate = useNavigate();
    const sParams = new URLSearchParams(location.search);
    const { t } = useTranslation();

    /////////FORMIK/////////////

    const initialValues = {
        q: sParams.get('q') || "",
        at: sParams.get('at') || "",
        c: sParams.get('c') || "",
        ps: sParams.get('ps') || "",
        pe: sParams.get('pe') || "",
        ctry: sParams.get('ctry') || "",
        city: sParams.get('city') || "",
        dist: sParams.get('dist') || "",
    };

    const validationSchema = Yup.object({
        price: Yup.number()
            .positive(t('searchPanelTranslations.pricePositive')),
    });

    const onSubmit = async (values) => {
        const queryString = prepareRequestParams(values);
        navigate(`?${queryString}`);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true,
    });

    const handleFormSubmit = () => {
        formik.handleSubmit();
        handleClose();
    };

    /////////FORMIK/////////////

    const fetchAdvertTypes = async () => {
        try {
            const data = await getAdvertTypes();
            setAdvertTypes([{ id: "", title: t("searchPanelTranslations.titleAll") }, ...data]);
        } catch (err) {
            const errMsg = Object.values(err.response.data)[0];
            showToast({
                severity: "error",
                summary: t("error.error"),
                detail: errMsg,
                life: 3000,
            });
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories([{ id: "", title: t("searchPanelTranslations.titleAll") }, ...data]);
        } catch (err) {
            const errMsg = Object.values(err.response.data)[0];
            showToast({
                severity: "error",
                summary: t("error.error"),
                detail: errMsg,
                life: 3000,
            });
        }
    };

    const fetchCountries = async () => {
        try {
            const data = await getAllCountries();
            setCountries([{ id: "", name: t("searchPanelTranslations.titleAll") }, ...data]);
        } catch (err) {
            const errMsg = Object.values(err.response.data)[0];
            showToast({
                severity: "error",
                summary: t("error.error"),
                detail: errMsg,
                life: 3000,
            });
        }
    };

    const fetchCities = async (ctry) => {
        try {
            const data = await getAllCityByCountry(ctry);
            setCities([{ id: "", name: t("searchPanelTranslations.titleAll") }, ...data]);
        } catch (err) {
            const errMsg = Object.values(err.response.data)[0];
            showToast({
                severity: "error",
                summary: t("error.error"),
                detail: errMsg,
                life: 3000,
            });
        }
    };

    const fetchDistricts = async (city) => {
        try {
            const data = await getAllDistrictsByCity(city);
            setDistricts([{ id: "", name: "All" }, ...data]);
        } catch (err) {
            const errMsg = Object.values(err.response.data)[0];
            showToast({
                severity: "error",
                summary: t("error.error"),
                detail: errMsg,
                life: 3000,
            });
        }
    };

    useEffect(() => {
        fetchAdvertTypes();
        fetchCategories();
        fetchCountries();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        formik.values.ctry > 0 && fetchCities(formik.values.ctry);
        // eslint-disable-next-line
    }, [formik.values.ctry]);

    useEffect(() => {
        formik.values.city > 0 && fetchDistricts(formik.values.city);
        // eslint-disable-next-line
    }, [formik.values.city]);

    const content = () => {
        return (
            <>
                <Form noValidate>
                    <Row className=" row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-1">
                        <Col xs lg={8}>
                            <InputText
                                formik={formik}
                                label={t("searchPanelTranslations.search")}
                                type="text"
                                field="q"
                                placeholder={t("searchPanelTranslations.search")}
                                feedback={false}
                            />
                        </Col>
                        <Col style={{ display: "flex", gap: "10px" }}>
                            <div style={{ width: "50%" }}>
                                <InputText
                                    formik={formik}
                                    label={t("searchPanelTranslations.priceRange")}
                                    type={"number"}
                                    field="ps"
                                    placeholder={t("searchPanelTranslations.min")}
                                />
                            </div>
                            <div style={{ width: "50%" }}>
                                <InputText
                                    formik={formik}
                                    label="&nbsp;"
                                    type={"number"}
                                    field="pe"
                                    placeholder={t("searchPanelTranslations.max")}
                                />
                            </div>
                        </Col>
                        <Col>
                            {/* <InputSelect
                                formik={formik}
                                field={"at"}
                                label={t("searchPanelTranslations.advertType")}
                                options={advertTypes}
                                feedback={false}
                            /> */}
                              <AdvertTypeSelect t={t} formik={formik} advertTypes={advertTypes} feedback={false} field={"at"}/> 
                        </Col>
                        <Col>
                            {/* <InputSelect
                                formik={formik}
                                field={"c"}
                                label={t("searchPanelTranslations.category")}
                                options={categories}
                                feedback={false}
                            /> */}
                              <CategorySelect t={t} formik={formik} categories={categories} feedback={false} field={"c"}/>
                        </Col>
                        <Col>
                            {countries.length > 0 && (
                                <InputSelect
                                    formik={formik}
                                    field={"ctry"}
                                    label={t("searchPanelTranslations.country")}
                                    options={countries}
                                    feedback={false}
                                />
                            )}
                        </Col>
                        <Col>
                            <InputSelect
                                formik={formik}
                                field={"city"}
                                label={t("searchPanelTranslations.city")}
                                options={cities}
                                feedback={false}
                            />
                        </Col>
                        <Col>
                            <InputSelect
                                formik={formik}
                                field={"dist"}
                                label={t("searchPanelTranslations.district")}
                                options={districts}
                                feedback={false}
                            />
                        </Col>
                        <Col style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ width: "100%" }}>
                                <ButtonComponent
                                    formik={formik}
                                    loading={loading}
                                    text={t("searchPanelTranslations.search")}
                                    onClick={handleFormSubmit}
                                    style={{ width: "100%", padding: "15px" }}
                                >
                                    <GoSearch />
                                </ButtonComponent>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </>
        );
    };

    return (
        <>
            {open ? (
                <Modal show={open} onHide={handleClose} fullscreen>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ fontSize: "16px", fontWeight: "400" }}>
                            <span>{t("searchPanelTranslations.filter")}</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {content()}
                    </Modal.Body>
                </Modal>
            ) : (
                <div className="d-none d-md-block">{content()}</div>
            )}
        </>
    );
};

export default SearchPanel;