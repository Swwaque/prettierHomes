import React, { useEffect, useState } from 'react'
import InputText from '../../../common/input-text';
import InputSelect from '../../../common/input-select';
import ButtonComponent from '../../../common/button-component';
import * as Yup from "yup";
import { useFormik } from "formik";
import { getAdvertTypes, getCategories } from '../../../../api/adverts-service';
import { Col, Form, Row } from 'react-bootstrap'
import { useToast } from '../../../../store/providers/toast-provider';
import { IoSearchOutline } from 'react-icons/io5';
import './admin-advert-search-panel.scss';
import { useTranslation } from 'react-i18next';
import CategorySelect from '../../CategorySelect ';
import AdvertTypeSelect from '../../AdvertTypeSelect ';

const AdminAdvertSearchPanel = ({ loading, setSearchParams }) => {
    const [advertTypes, setAdvertTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const { showToast } = useToast();
    const { t } = useTranslation();

    const statusForAdverts = [
        {
            id: "",
            name: t("adminAdvertSearchPanel.titleAll"),
        },
        {
            id: 1,
            name: t("adminAdvertSearchPanel.statusForAdvertsId1"),
        },
        {
            id: 2,
            name: t("adminAdvertSearchPanel.statusForAdvertsId2"),
        },
        {
            id: 3,
            name: t("adminAdvertSearchPanel.statusForAdvertsId3"),
        },
    ];

    const initialValues = {
        q: "",
        status: "",
        price_start: 0,
        price_end: "",
        advert_type_id: "",
        category_id: "",
    };

    const validationSchema = Yup.object({
        price_start: Yup.number().test(
            t("adminAdvertSearchPanel.priceStartTest1"),
            t("adminAdvertSearchPanel.priceStartTest2"),
            (value) => value >= 0
        ),
        price_end: Yup.number()
            .positive(t("adminAdvertSearchPanel.priceEndPositive")),
        advert_type_id: Yup.number()
            .notOneOf([0], t("adminAdvertSearchPanel.advertTypeNotOneOf")),
        category_id: Yup.number()
            .notOneOf([0], t("adminAdvertSearchPanel.categoryIdNotOneOf")),
        status: Yup.number().notOneOf([0], t("adminAdvertSearchPanel.statusNotOneOf")),
    });

    const onSubmit = async (values) => {
        setSearchParams(values);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const fetchAdvertTypes = async () => {
        try {
            const data = await getAdvertTypes();
            setAdvertTypes([{ id: "", title: t("adminAdvertSearchPanel.titleAll") }, ...data]);
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
            setCategories([{ id: "", title: t("adminAdvertSearchPanel.titleAll") }, ...data]);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="admin-adverts-search-container">
                <Form noValidate onSubmit={formik.handleSubmit}>
                    <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 m-0">
                        <Col md={12} lg={12} className="search-input">
                            <InputText
                                formik={formik}
                                label={t("adminAdvertSearchPanel.labelTypeSomeType")}
                                type="text"
                                field={"q"}
                                placeholder={t("adminAdvertSearchPanel.placeholderSearch")}
                                feedback={false}
                            />
                        </Col>

                        <Col>
                            <InputText
                                formik={formik}
                                label={t("adminAdvertSearchPanel.labelPrice")}
                                field={"price_start"}
                                type={"number"}
                                placeholder={t("adminAdvertSearchPanel.placeholderMin")}
                            />
                        </Col>
                        <Col>
                            <InputText
                                formik={formik}
                                label={t("adminAdvertSearchPanel.labelPrice")}
                                field={"price_end"}
                                type={"number"}
                                placeholder={t("adminAdvertSearchPanel.placeholderMax")}
                            />
                        </Col>
                        <Col>
                            <InputSelect
                                formik={formik}
                                field={"status"}
                                label={t("adminAdvertSearchPanel.labelStatus")}
                                options={statusForAdverts}
                                feedback={false}
                            />
                        </Col>
                        <Col>
                            {advertTypes.length > 0 && (
                                // <InputSelect
                                //     formik={formik}
                                //     field={"advert_type_id"}
                                //     label={t("adminAdvertSearchPanel.labelAvertType")}
                                //     options={advertTypes}
                                //     feedback={false}
                                // />
                            <AdvertTypeSelect t={t} formik={formik} advertTypes={advertTypes} feedback={false} field={"advert_type_id"} /> 

                            )}
                        </Col>
                        <Col>
                            {categories.length > 0 && (
                                // <InputSelect
                                //     formik={formik}
                                //     field={"category_id"}
                                //     label={t("adminAdvertSearchPanel.labelCategory")}
                                //     options={categories}
                                //     feedback={false}
                                // />
                            <CategorySelect t={t} formik={formik} categories={categories} feedback={false} field={"category_id"}/>
                            )}
                        </Col>
                        <Col style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ width: "100%" }}>
                                <ButtonComponent
                                    formik={formik}
                                    loading={loading}
                                    type="submit"
                                    text={t("adminAdvertSearchPanel.buttonText")}
                                    style={{ width: "100%", padding: "15px" }}
                                >
                                    <IoSearchOutline />
                                </ButtonComponent>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    )
}

export default AdminAdvertSearchPanel