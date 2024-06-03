import React from 'react'
import InputText from "../../../common/input-text";
import IconPicker from "./icon-picker";
import ButtonLoader from "../../../common/button-loader";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteCategory, saveCategory, updateCategory } from '../../../../api/categories-service';
import { triggerRefresh } from '../../../../store/slices/misc-slice';
import { prettyConfirm } from '../../../../helpers/function/toast-confirm';
import { useToast } from '../../../../store/providers/toast-provider';
import { useDispatch, useSelector } from 'react-redux';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { HiArrowUpCircle, HiArrowUturnLeft, HiOutlineTrash } from "react-icons/hi2";
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { TbFaceIdError } from 'react-icons/tb';
import { PiHandPalmDuotone } from 'react-icons/pi';
import './admin-category-common.scss';
import { useTranslation } from 'react-i18next';

const AdminCategoryCommon = ({ toEdit = false, initialState, setCategoryId }) => {
    const { refresher } = useSelector(state => state.misc);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = initialState?.id;
    const {t} = useTranslation();


    const normalizeTitle = (value) => {
        return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    // const confirmDelete = async (event) => {
    //     prettyConfirm({
    //         event: event,
    //         message: t("adminCategoryCommon.prettyConfirmMessage"),
    //         icon: <PiHandPalmDuotone size={50} />,
    //         acceptButtonType: 'danger',
    //         handleAccept: () => handleDeleteCategory(),
    //         handleReject: () => {
    //             showToast({
    //                 severity: "warn",
    //                 summary:  t("adminCategoryCommon.summaryWarn"),
    //                 detail: t("adminCategoryCommon.detailWarn"),
    //                 life: 2000,
    //                 icon: <IoMdCloseCircleOutline size={50} />,
    //             });
    //         },
    //     });
    // };

    // const handleDeleteCategory = async () => {
    //     try {
    //         await deleteCategory(id);
    //         showToast({
    //             severity: "success",
    //             summary: t("success.success"),
    //             detail: t("adminCategoryCommon.detailSuccess"),
    //             life: 2000,
    //         });
    //         navigate("/dashboard/categories");
    //     } catch (err) {
    //         showToast({
    //             severity: "error",
    //             summary: t("error.error"),
    //             detail: Object.values(err.response.data)[0],
    //             life: 2000,
    //         });
    //     }
    // };


    const handleSaveCategory = async (values, { resetForm }) => {
        setLoading(true);
        try {
            const resp = await saveCategory({ ...values, title: normalizeTitle(values.title) });
            setCategoryId(resp.id)
            showToast({
                severity: "info",
                summary: t("adminCategoryCommon.summaryInfo"),
                detail: t("adminCategoryCommon.detailInfo"),
                sticky: true,
            })
        } catch (err) {
            showToast({
                severity: "error",
                summary: t("error.error"),
                detail: Object.values(err.response.data)[0],
                life: 2000,
                icon: <TbFaceIdError size={50} />,
            });
        } finally {
            setLoading(false);
        }
    };


    const handleUpdateCategory = async (values, { resetForm }) => {
        setLoading(true);
        try {
            await updateCategory(id, { ...values, title: normalizeTitle(values.title) });
            dispatch(triggerRefresh());
            showToast({
                severity: "success",
                summary: t("adminCategoryCommon.summarySuccessUpdated"),
                detail: t("adminCategoryCommon.summarySuccessUpdatedDetail"),
                life: 2000,
            });
        } catch (err) {
            const errMsg = Object.values(err.response.data)[0];

            showToast({
                severity: "error",
                summary: t("error.error"),
                detail: errMsg,
                life: 2000,
            });
        } finally {
            setLoading(false);
        }
    };

    // Formik

    const emptyInitializer = {
        title: "",
        icon: "",
        seq: "",
        active: false
    }

    const selectedInit = (toEdit && initialState) ? initialState : emptyInitializer;

    const initialValues = {
        ...selectedInit
    };

    const validationSchema = Yup.object({
        title: Yup.string()
            .required(t("adminCategoryCommon.titleRequired"))
            .min(3, t("adminCategoryCommon.titleMin",{min: 3}))
            .max(150, t("adminCategoryCommon.titleMax",{max: 150})),
        icon: Yup.string()
            .required(t("adminCategoryCommon.iconRequired"))
            .test('is-fa-icon', t("adminCategoryCommon.iconTest"), value => {
                if (!value) {
                    return false;
                }
                const iconName = value.replace('fa-solid fa-', '');
                const iconFound = findIconDefinition({ prefix: 'fas', iconName });

                return iconFound;
            }),
        seq: Yup.number()
            .required(t("adminCategoryCommon.seqRequired"))
            .positive(t("adminCategoryCommon.seqPositive"))
    });

    const onSubmit = async (values, { resetForm }) => {
        if (toEdit) {
            handleUpdateCategory(values, resetForm);
        } else {
            handleSaveCategory(values, resetForm);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true,
    });

    return (
        <>
            <div className="admin-category-common-container">
                <Form noValidate onSubmit={formik.handleSubmit} className="admin-category-common-form">
                    <div className="category-new">
                        <Row style={{ margin: "0" }}>
                            <Col xs={12} md={7} xl={12} className="category-common-element-wrapper">
                                <InputText
                                    formik={formik}
                                    label= {t("adminCategoryCommon.titleLabel")}
                                    type="text"
                                    field="title"
                                    placeholder={t("adminCategoryCommon.titlePlaceholder")}
                                />
                            </Col>

                            <Col xs={12} md={5} xl={5} className="category-common-element-wrapper">
                                <InputText
                                    formik={formik}
                                    label= {t("adminCategoryCommon.seqLabel")}
                                    type={"number"}
                                    field="seq"
                                    placeholder={t("adminCategoryCommon.title1Placeholder")}
                                />
                            </Col>

                            <Col xs={12} md={7} xl={4} className="category-common-element-wrapper">
                                <IconPicker formik={formik} />
                            </Col>

                            <Col xs={12} md={5} xl={3} className="category-common-element-wrapper category-status">
                                <Form.Group controlId="category-switch">
                                    <Form.Label >{t("adminCategoryCommon.active")}</Form.Label>
                                    <Form.Check
                                        className="category-switch"
                                        type="switch"
                                        checked={formik.values.active}
                                        value={formik.values.active ? 'true' : 'false'}  // Set a non-null value
                                        {...formik.getFieldProps("active")}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                    <div className="admin-category-common-button-wrapper">
                        <Button
                            variant="secondary"
                            type="button"
                            className="category-common-button back-button"
                            onClick={() => navigate(-1)}
                        >
                            <HiArrowUturnLeft size={20} />{t("adminCategoryCommon.buttonBack")}
                        </Button>
                        {toEdit
                            ?
                            <>
                                {/* <Button
                                    onClick={(e) => confirmDelete(e)}
                                    className="category-common-button delete-button"
                                    disabled={loading}
                                >
                                    {loading ? <ButtonLoader /> : <HiOutlineTrash size={20} />} 
                                    {t("adminCategoryCommon.buttonDelete")}
                                </Button>*/}

                                <Button
                                    variant="warning"
                                    onClick={() => formik.handleSubmit()}
                                    className="category-common-button update-button"
                                    disabled={!formik.isValid || loading}
                                >
                                    {loading ? <ButtonLoader /> : <HiArrowUpCircle size={20} />} 
                                    {t("adminCategoryCommon.buttonText")}
                                </Button>
                            </>
                            :
                            <Button
                                variant="primary"
                                type="submit"
                                className="category-common-button create-button"
                                disabled={!formik.isValid || loading}
                            >
                                {loading ? <ButtonLoader /> : <HiArrowUpCircle size={20} />} {t("adminCategoryCommon.buttonCreate")}
                            </Button>}
                    </div>
                </Form>
            </div>
        </>
    )
}

export default AdminCategoryCommon