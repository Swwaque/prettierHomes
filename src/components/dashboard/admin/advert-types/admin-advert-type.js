import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form, InputGroup } from "react-bootstrap";
import { isInValid, isValid } from "../../../../helpers/function/forms";
import { useToast } from "../../../../store/providers/toast-provider";
import { triggerRefresh } from "../../../../store/slices/misc-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiMagnifyingGlass, HiXMark, HiCheck, HiPlus } from "react-icons/hi2";
import { LuPencil } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";
import {
  deleteAdvertType,
  getAllAdvertType,
  updateAdvertType,
} from "../../../../api/advert-type-service";
import './admin-advert-type.scss';
import { useTranslation } from "react-i18next";
 
const AdminAdvertType = () => {
  const { showToast } = useToast();
  const [advertTypes, setAdvertTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { refresher } = useSelector((state) => state.misc);
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(-1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const fetchAllAdvertTypes = async () => {
    try {
      const resp = await getAllAdvertType();
      setAdvertTypes(resp);
    } catch (err) {
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: Object.values(err.response.data)[0],
        life: 2000,
      });
    }
  };

  useEffect(() => {
    fetchAllAdvertTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresher]);

  const findAdvertTypes = () => {
    const filteredAdvertTypes = advertTypes.filter((advertType) =>
      advertType.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setAdvertTypes(filteredAdvertTypes);
  };

  const initialValues = {
    id: "",
    title: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required(t("adminAdvertType.requiredTitle"))
      .min(2, t("adminAdvertType.minTitle", {min: 2}))
      .max(50, t("adminAdvertType.maxTitle", {max: 50})),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const resp = await updateAdvertType(values.id, values);
      setAdvertTypes(
        advertTypes.map((advertType) =>
          advertType.id === values.id ? resp : advertType
        )
      );
      setEditable(-1);
      showToast({
        severity: "success",
        summary: t("success.success"),
        detail: t("adminAdvertType.detailSuccessUpdated"),
        life: 2000,
      });
    } catch (err) {
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: Object.values(err.response.data)[0],
        life: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const handleClearSearch = () => {
    setSearchQuery("");
    fetchAllAdvertTypes();
  };

  const handleEdit = (advertType) => {
    setEditable(advertType.id);
    formik.setFieldValue('id', advertType.id);
    formik.setFieldValue('title', advertType.title);
  };

  const handleDismiss = () => {
    setEditable(-1);
    formik.setFieldValue('id', "");
    formik.setFieldValue('title', "");
  };
  const handleDelete = async (id) => {
    try {
      await deleteAdvertType(id);
      dispatch(triggerRefresh());
      showToast({
        severity: "success",
        summary: t("success.success"),
        detail: t("adminAdvertType.detailSuccessDeleted"),
        life: 2000,
      });
    } catch (err) {
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: Object.values(err.response.data)[0],
        life: 2000,
      });
    }
  };

  return (
    <div className="admin-advert-type-container">
      <div className="advert-types-search-wrapper ">
        <InputGroup className="search-input">
          <Form.Control
            name="search"
            placeholder= {t("adminAdvertType.inputPlaceholder")}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          {searchQuery && (
            <InputGroup.Text
              className="clear-wrapper"
              variant="outline-secondary"
            >
              <Button
                className=" clear-btn btn-link"
                onClick={handleClearSearch}
              >
                <HiXMark size={20} strokeWidth={0.5} />
              </Button>
            </InputGroup.Text>
          )}
          <Button
            onClick={() => findAdvertTypes()}
            className="search-button"
            variant="outline-secondary"
          >
            <HiMagnifyingGlass strokeWidth={1} />
          </Button>
        </InputGroup>

        <Button
          className="add-new-btn"
          title="Add New"
          onClick={() => navigate("/dashboard/advert-types/new")}
        >
          <HiPlus />
        </Button>
      </div>
      <div className="advert-type-table">
        <div className="table-header">
          <span>{t("adminAdvertType.headerTitle")} </span>
          <span>{t("adminAdvertType.headerAction")} </span>
        </div>
        {advertTypes.map((advertType) => (
          <div className={`table-row ${editable === advertType.id ? "editing" : ""}`} key={advertType.id}>
            <div className="type-edit-wrapper">
              <Form.Group className="type-edit-input-group" controlId={advertType.id}>
                <Form.Control
                  className="type-edit-input"
                  type="text"
                  placeholder= {t("adminAdvertType.formPlaceholder")}
                  name="title"
                  value={editable === advertType.id ? formik.values.title : advertType.title}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  isInvalid={editable === advertType.id && isInValid(formik, "title")}
                  isValid={editable === advertType.id && isValid(formik, "title")}
                  disabled={editable !== advertType.id}
                />
                <Form.Control.Feedback type="invalid" className="formik-feedback">
                  {editable === advertType.id && formik.errors.title}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="button-wrapper">
              {editable === advertType.id
                ?
                <>
                  <Button className="ad-type-btn dismiss-btn" title= {t("adminAdvertType.titleDismiss")} onClick={handleDismiss}>
                    <HiXMark />
                  </Button>
                  <Button className="ad-type-btn update-btn" title= {t("adminAdvertType.titleUpdate")} onClick={() => formik.handleSubmit()}>
                    <HiCheck />
                  </Button>
                </>
                :
                <>
                  <Button className="ad-type-btn delete-btn" title= {t("adminAdvertType.titleDelete")} onClick={() => handleDelete(advertType.id)}>
                    <FiTrash />
                  </Button>
                  <Button className="ad-type-btn edit-btn" title= {t("adminAdvertType.titleEdit")} onClick={() => handleEdit(advertType)}>
                    <LuPencil />
                  </Button>
                </>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAdvertType;
