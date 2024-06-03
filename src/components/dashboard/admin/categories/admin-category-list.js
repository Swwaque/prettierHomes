import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { triggerRefresh } from '../../../../store/slices/misc-slice'
import { useNavigate } from 'react-router-dom';
import { prettyConfirm } from '../../../../helpers/function/toast-confirm';
import { deleteCategory, getAdminCategory } from '../../../../api/categories-service';
import { useToast } from '../../../../store/providers/toast-provider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FiTrash } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import { FaCheck, FaTimes } from "react-icons/fa";
import { PiHandPalmDuotone } from 'react-icons/pi';
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { TbFaceIdError } from "react-icons/tb";
import { HiMagnifyingGlass, HiPlus, HiXMark } from 'react-icons/hi2';
import "./admin-category-list.scss"
import { useTranslation } from 'react-i18next';

const AdminCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast()
  const { refresher } = useSelector(state => state.misc);
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  const onPage = (event) => {
    setlazyState(event);
  };

  const getOperationButtons = (row) => {
    if (row.builtIn) return null;
    return (
      <div className='operationsButton'>
        <Button className="btn-link" onClick={(e) => confirmDelete(e, row)} >
          <FiTrash />
        </Button>
        <Button className="btn-link" onClick={() => handleEdit(row)} >
          <LuPencil />
        </Button>
      </div>
    );
  };

  const confirmDelete = async (event, row) => {
    prettyConfirm({
      event: event,
      message: t("adminCategoryList.prettyConfirmMessage"),
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: 'danger',
      handleAccept: () => handleDelete(row.id),
      handleReject: () => {
        showToast({
          severity: "warn",
          summary: t("adminCategoryList.summaryWarn"),
          detail: t("adminCategoryList.detailWarn"),
          life: 2000,
          icon: <IoMdCloseCircleOutline size={50} />,
        });
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      showToast({
        severity: "success",
        summary: t("adminCategoryList.summarySuccess"),
        detail: t("adminCategoryList.detailSuccess"),
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline size={50} />,
      });
      dispatch(triggerRefresh());
    } catch (error) {
      showToast({
        severity: "error",
        summary: t("adminCategoryList.summaryError"),
        detail: Object.values(error.response.data)[0],
        life: 2000,
        icon: <TbFaceIdError size={50} />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    navigate('/dashboard/categories/edit', { state: { ...row } });

  };

  const findCategories = () => {
    loadData(0);
  };

  const loadData = async (page) => {
    try {
      const resp = await getAdminCategory(page, lazyState.rows, "seq", "asc", searchQuery);
      setCategories(resp.content);
      setTotalRows(resp.totalElements);

    } catch (err) {
      const errMsg = Object.values(err.response.data)[0]
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: errMsg,
        life: 2000,
        icon: <TbFaceIdError size={50} />,
      });
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setlazyState((prevLazyState) => ({
      ...prevLazyState,
      page: 0, // Sayfa numarasını sıfırla
    }));
  };

  const narrowRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
  };

  const operationButton = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminCategoryList.action")} </span>
      {getOperationButtons(row)}
    </div>
  );

  const getCategoryTitle = (categories) => {
    const categoryTitle = t(`bannerTranslations.${categories.title}`, { defaultValue: categories.title });
    return categoryTitle;
  }

  const getName = (categories) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title ">{t("adminCategoryList.name")} </span>
      {getCategoryTitle(categories)}
    </div>
  );

  const sequence = (categories) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminCategoryList.sequence")} </span>
      {getSequence(categories)}
    </div>
  );

  const getSequence = (categories) => {
    return categories.seq;
  }

  const active = (categories) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminCategoryList.active")} </span>
      {getActive(categories)}
    </div>
  );

  const getActive = (categories) => {
    return categories.active ? <FaCheck /> : <FaTimes />
  }

  const icon = (categories) => (
    <div style={narrowRowStyle} className="table-category-icon">
      <span className="p-column-title">{t("adminCategoryList.icon")} </span>
      {getIcon(categories.icon)}
    </div>
  );

  const getIcon = (iconClassName) => {
    return (
      <FontAwesomeIcon icon={iconClassName} />
    );
  }

  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lazyState, refresher]);

  return (
    <>
      <div className="admin-category-container">
        <div className="category-search-wrapper">
          <InputGroup className="search-input">
            <Form.Control
              name="search"
              placeholder={t("adminCategoryList.inputPlaceholder")}
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <InputGroup.Text
                className="clear-wrapper"
                variant="outline-secondary"
              >
                <Button
                  className=" clear-btn btn-link"
                  onClick={clearSearch}
                >
                  <HiXMark size={20} strokeWidth={0.5} />
                </Button>
              </InputGroup.Text>
            )}
            <Button
              onClick={() => findCategories()}
              className="search-button"
              variant="outline-secondary"
            >
              <HiMagnifyingGlass strokeWidth={1} />
            </Button>
          </InputGroup>

          <Button
            className="add-new-btn"
            title="Add New"
            onClick={() => navigate("/dashboard/categories/create")}
          >
            <HiPlus />
          </Button>
        </div>
        <div className="tr-datatable-wrapper">
          <div className="card" >
            <DataTable
              className='tr-datatable'
              lazy
              dataKey="id"
              value={categories}
              paginator
              rows={lazyState.rows}
              rowsPerPageOptions={[5, 10, 15, 20]}
              totalRecords={totalRows}
              loading={loading}
              first={lazyState.first}
              onPage={onPage}
              paginatorTemplate={"PrevPageLink PageLinks CurrentPageReport NextPageLink"}
            >
              <Column header={t("adminCategoryList.icon")} body={icon} ></Column>
              <Column header={t("adminCategoryList.name")} body={getName} ></Column>
              <Column header={t("adminCategoryList.sequence")} body={sequence} ></Column>
              <Column header={t("adminCategoryList.active")} body={active} ></Column>
              <Column header={t("adminCategoryList.action")} body={operationButton}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategoryList
