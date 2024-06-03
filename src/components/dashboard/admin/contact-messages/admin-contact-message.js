import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Badge, Button, Form, InputGroup } from "react-bootstrap";
import { deleteMessage, getAllContactMessage, toggleReadStatus } from "../../../../api/contact-messages";
import { useDispatch, useSelector } from "react-redux";
import { formatCreatedAt } from "../../../../helpers/function/format-date-time";
import { useToast } from "../../../../store/providers/toast-provider";
import { Paginator } from "primereact/paginator";
import { HiMagnifyingGlass, HiXMark, HiChevronDown, HiOutlineUser, HiOutlineClock } from "react-icons/hi2";
import { MdOutlineDeleteOutline, MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";
import { HiFilter } from "react-icons/hi";
import "./admin-contact-message.scss";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useFormik } from "formik";
import MessageFilterModal from "./message-filter-modal";
import { triggerRefresh } from "../../../../store/slices/misc-slice";

const AdminContactMessage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { showToast } = useToast();
  const { refresher } = useSelector((state) => state.misc);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [totalRows, setTotalRows] = useState(0);
  const [lazyState, setLazyState] = useState({
    first: 0,
    rows: 10,
    page: 0,
    sortField: null,
    sortOrder: null,
  });


  const onPage = (event) => {
    setLazyState(event);
  };

  const clearSearch = () => {
    formik.setFieldValue("searchText", "");
    formik.setFieldValue("status", "");
    formik.setFieldValue("startDate", "");
    formik.setFieldValue("endDate", "");
    setLazyState((prevLazyState) => ({
      ...prevLazyState,
      page: 0,
    }));
  };

  const getMessages = async (values) => {
    setLoading(true);
    try {
      const resp = await getAllContactMessage(values.searchText, values.status, values.startDate, values.endDate, lazyState.page, lazyState.rows);
      setMessages(resp);
      setTotalRows(resp.totalElements);
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

  const initialValues = {
    searchText: "",
    status: "",
    startDate: "",
    endDate: "",
  };

  const validationSchema = Yup.object({
    searchText: Yup.string(),
    status: Yup.boolean(),
    startDate: Yup.date(),
    endDate: Yup.date(),
  });

  const onSubmit = async (values) => {
    getMessages(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  // Formik

  const handleReadStatus = async (id) => {
    try {
      await toggleReadStatus(id);
      dispatch(triggerRefresh());
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: errMsg,
        life: 2000,
      });
    }
  }

  const handleDeleteMassage = async (id) => {
    try {
      await deleteMessage(id);
      dispatch(triggerRefresh());
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: errMsg,
        life: 2000,
      });
    }
  }

  const filterCount = Object.values(formik.values).filter(value => !!value).length;

  useEffect(() => {
    formik.handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lazyState, refresher]);

  return (
    <>
      <div className="admin-contact-message-container">
        <MessageFilterModal
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          formik={formik}
        />
        <div className="message-search-wrapper">
          <InputGroup className="search-input">
            <Form.Control
              placeholder={t("adminContactMessageTranslations.inputPlaceholder")}
              onChange={(e) => formik.setFieldValue("searchText", e.target.value)}
              value={formik.values.searchText}
              className="search-input"
              name="search"
            />
            {formik.values.searchText && (
              <InputGroup.Text
                className="clear-wrapper"
                variant="outline-secondary"
              >
                <Button
                  className="clear-btn btn-link"
                  onClick={clearSearch}
                >
                  <HiXMark size={20} strokeWidth={0.5} />
                </Button>
              </InputGroup.Text>
            )}

            <Button
              onClick={() => setShowFilter(true)}
              className="filter-button"
            >
              <HiFilter size={20} strokeWidth={0.5} />
              <Badge className="active-filter-badge">{filterCount > 0 && filterCount}</Badge>
            </Button>

            <Button
              onClick={() => formik.handleSubmit()}
              className="search-button"
            >
              <HiMagnifyingGlass strokeWidth={1} />
            </Button>

          </InputGroup>
        </div>

        <Accordion >
          {messages?.content?.map((item, index) => (
            <Accordion.Item key={index} eventKey={index.toString()}>
              <Accordion.Header className={item.status ? "read" : "unread"}	>
                <span className="email">{`${item.email}`}</span>
                <span className="create-time d-none d-md-inline">{(formatCreatedAt(item.createdAt))}</span>
                <span className="arrow d-md-none"><HiChevronDown /></span>
              </Accordion.Header>
              <Accordion.Body>
                <div className="fullname"><HiOutlineUser /><span>{`${item.firstName} ${item.lastName}`}</span></div>
                <div className="create-time d-md-none"><HiOutlineClock /><span>{(formatCreatedAt(item.createdAt))}</span></div>
                <p>{item.message}</p>
                <div className="message-status-button-wrapper">
                  <Button
                    className={`read-toggle-btn message-button ${item.status ? "read" : "unread"}`}
                    onClick={() => handleReadStatus(item.id)}
                    title={item.status ? "Mark as unread" : "Mark as read"}
                  >
                    {item.status ? <MdMarkEmailUnread /> : <MdMarkEmailRead />}
                  </Button>
                  <Button
                    className="message-delete-btn message-button"
                    onClick={() => handleDeleteMassage(item.id)}
                    title="Delete message"
                  >
                    <MdOutlineDeleteOutline />
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        <Paginator
          first={lazyState.first}
          rows={lazyState.rows}
          totalRecords={totalRows}
          onPageChange={onPage}
          template="PrevPageLink PageLinks CurrentPageReport NextPageLink"
        />
      </div>
    </>
  );
};

export default AdminContactMessage;
