import React from 'react'
import InputText from '../../../common/input-text';
import InputSelect from '../../../common/input-select';
import ButtonLoader from '../../../common/button-loader';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useToast } from "../../../../store/providers/toast-provider";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setComponentMode, triggerRefresh } from "../../../../store/slices/misc-slice";
import { deletePropertyKey, savePropertyKey, updatePropertyKey } from "../../../../api/property-key-service";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { TbCategoryFilled, TbFaceIdError } from "react-icons/tb";
import { HiArrowUpCircle, HiArrowUturnLeft, HiOutlineTrash, HiXMark } from 'react-icons/hi2';
import './category-property-key.scss';
import { PiHandPalmDuotone } from 'react-icons/pi';
import { prettyConfirm } from '../../../../helpers/function/toast-confirm';
import { useTranslation } from 'react-i18next';

const CategoryPropertyKey = ({ categoryId }) => {
    const [loading, setLoading] = useState(false);
    const { currentPK, componentMode, refresher } = useSelector(state => state.misc);
    const { showToast } = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleCreatePropertyKey = async (values, resetForm) => {
        setLoading(true);
        try {
            await savePropertyKey(categoryId, values);
            resetForm();
            dispatch(triggerRefresh())
            showToast({
                severity: "success",
                summary: t("categoryPropertyKey.summarySuccess"),
                detail: t("categoryPropertyKey.detailSuccess"),
                life: 2000,
                icon: <IoMdCheckmarkCircleOutline size={50} />
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
    }

    const handleUpdatePropertyKey = async (values, resetForm) => {
        setLoading(true);
        try {
            await updatePropertyKey(currentPK.id, values);
            resetForm();
            dispatch(setComponentMode("new"));
            dispatch(triggerRefresh())
            showToast({
                severity: "success",
                summary: t("success.success"),
                detail: t("categoryPropertyKey.detailSuccessUpdated"),
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
    }


    // const confirmDelete = async (event) => {
    //     prettyConfirm({
    //         event: event,
    //         message: t("categoryPropertyKey.prettyConfirmMessage"),
    //         icon: <PiHandPalmDuotone size={50} />,
    //         acceptButtonType: 'danger',
    //         handleAccept: () => handleDeletePropertyKey(),
    //         handleReject: () => {
    //             showToast({
    //                 severity: "warn",
    //                 summary: t("categoryPropertyKey.summaryWarn"),
    //                 detail: t("categoryPropertyKey.detailWarn"),
    //                 life: 2000,
    //                 icon: <IoMdCloseCircleOutline size={50} />,
    //             });
    //         },
    //     });
    // };

    // const handleDeletePropertyKey = async () => {
    //     try {
    //         await deletePropertyKey(currentPK.id);
    //         dispatch(triggerRefresh())
    //         showToast({
    //             severity: "success",
    //             summary: t("categoryPropertyKey.summarySuccessDeleted"),
    //             detail: t("categoryPropertyKey.detailSuccessDeleted"),
    //             life: 2000,
    //             icon: <IoMdCheckmarkCircleOutline size={50} />,
    //         });
    //     } catch (err) {
    //         showToast({
    //             severity: "error",
    //             summary: t("error.error"),
    //             detail: Object.values(err.response.data)[0],
    //             life: 2000,
    //             icon: <TbFaceIdError size={50} />,
    //         });
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    // Formik

    const emptyInitializer = {
        name: "",
        keyType: -1,
        prefix: "",
        suffix: ""
    }

    const selectedInit = componentMode === "edit"
        ?
        {
            ...currentPK,
            keyType: currentPK.keyType === "TEXT" ? "0" : currentPK.keyType === "BOOLEAN" ? "1" : "2"
        }
        :
        emptyInitializer;

    const initialValues = {
        ...selectedInit
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required(t("categoryPropertyKey.requiredName"))
            .min(2, t("categoryPropertyKey.minName", { min: 2 }))
            .max(80, t("categoryPropertyKey.maxName", { max: 80 })),
        keyType: Yup.number()
            .required(t("categoryPropertyKey.requiredKeyType"))
            .oneOf([0, 1, 2], t("categoryPropertyKey.OneOfKeyType")),
        prefix: Yup.string().max(5, t("contactForm.maxLength", { max: 5 })),
        suffix: Yup.string().min(5, t("contactForm.minLength", { min: 5 })),
    });

    const onSubmit = async (values, { resetForm }) => {
        if (componentMode === "edit") {
            handleUpdatePropertyKey(values, resetForm)
        } else {
            handleCreatePropertyKey(values, resetForm)
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true,
    });

    const keyTypeOptions = [
        {
            id: 0,
            name: t("categoryPropertyKey.keyTypeOptionsId0"),
        },
        {
            id: 1,
            name: t("categoryPropertyKey.keyTypeOptionsId1"),
        },
        {
            id: 2,
            name: t("categoryPropertyKey.keyTypeOptionsId2"),
        },
    ];

    const handleCancel = () => {
        dispatch(setComponentMode("new"));
    }

    return (
        <>
            <div className="admin-property-key-form-container">
                <div className="property-key-form-wrapper">
                    <Form noValidate onSubmit={formik.handleSubmit} className="property-key-form">
                        <Row style={{ margin: "0" }}>
                            <Col>
                                <InputText
                                    autoComplete="true"
                                    formik={formik}
                                    label={t("categoryPropertyKey.labelName")}
                                    type="text"
                                    field={"name"}
                                    placeholder={t("categoryPropertyKey.namePlaceholder")}
                                />
                            </Col>
                        </Row>
                        <Row className="row-cols-1 row-cols-lg-3" style={{ margin: "0" }}>
                            <Col>
                                <InputSelect
                                    formik={formik}
                                    label={t("categoryPropertyKey.labelKeyType")}
                                    field={"keyType"}
                                    options={keyTypeOptions}
                                />
                            </Col>
                            <Col>
                                <InputText
                                    formik={formik}
                                    label={t("categoryPropertyKey.labelPrefix")}
                                    field={"prefix"}
                                    placeholder={t("categoryPropertyKey.labelPlaceholder")}
                                />
                            </Col>
                            <Col>
                                <InputText
                                    formik={formik}
                                    label={t("categoryPropertyKey.labelSuffix")}
                                    field={"suffix"}
                                    placeholder={t("categoryPropertyKey.label1Placeholder")}
                                />
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="category-property-form-button-wrapper">
                    {componentMode === "edit" ?
                        <>
                            <div className='button-saparator'>
                                <Button
                                    variant="secondary"
                                    type="button"
                                    className="category-property-form-button cancel-button"
                                    onClick={handleCancel}
                                >
                                    <HiXMark size={20} />{t("categoryPropertyKey.buttonCancel")}
                                </Button>

                                {/* <Button
                                    onClick={(e) => confirmDelete(e)}
                                    className="category-property-form-button delete-button"
                                    disabled={loading}
                                >
                                    {loading ? <ButtonLoader /> : <HiOutlineTrash size={20} />} {t("categoryPropertyKey.buttonDelete")}
                                </Button>*/}

                                <Button
                                    variant="warning"
                                    onClick={() => formik.handleSubmit()}
                                    className="category-property-form-button update-button"
                                    disabled={!formik.isValid || loading}
                                >
                                    {loading ? <ButtonLoader /> : <HiArrowUpCircle size={20} />} {t("categoryPropertyKey.buttonText")}
                                </Button>
                            </div>
                        </>
                        :
                        <div className='button-saparator'>
                            <Button
                                variant="secondary"
                                type="button"
                                className="category-property-form-button back-button"
                                onClick={() => navigate(-1)}
                            >
                                <HiArrowUturnLeft size={20} /> {t("categoryPropertyKey.buttonBack")}
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => formik.handleSubmit()}
                                className="category-property-form-button create-button"
                                disabled={!formik.isValid || loading}
                            >
                                {loading ? <ButtonLoader /> : <HiArrowUpCircle size={20} />} {t("categoryPropertyKey.buttonCreate")}
                            </Button>
                        </div>
                    }
                </div >
            </div>
        </>
    )
}

export default CategoryPropertyKey