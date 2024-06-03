import React, { useEffect, useState } from "react";
import {  triggerRefresh } from "../../../../store/slices/misc-slice";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useToast } from "../../../../store/providers/toast-provider";
import { prettyConfirm } from "../../../../helpers/function/toast-confirm";
import { deleteUser, getUsers } from "../../../../api/user-service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { PiHandPalmDuotone } from "react-icons/pi";
import { TbFaceIdError } from "react-icons/tb";
import { LuPencil } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";
import { Tag } from "primereact/tag";
import "../users/admin-users.scss";
import { useTranslation } from "react-i18next";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const { refresher } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { t } = useTranslation();

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  const getOperationButtons = (row) => {
    if (row.built_in) return null;
    return (
      <div className="operationsButton">
        <Button
          className="btn-link"
          onClick={(e) => {
            userDecline(e, row);
          }}
        >
          <FiTrash />
        </Button>
        <Button
          className="btn-link"
          onClick={(e) => {
            handleEdit(row);
          }}
        >
          <LuPencil />
        </Button>
      </div>
    );
  };

  const userDecline = (event, row) => {
    prettyConfirm({
      event: event,
      message: t("adminUsersTranslations.prettyConfirmMessage"),
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: "danger",
      handleAccept: () => handleDelete(row.id),
      handleReject: () => {
        showToast({
          severity: "warn",
          summary: t("adminUsersTranslations.summaryWarn"),
          detail: t("adminUsersTranslations.detailWarn"),
          life: 2000,
          icon: <IoMdCloseCircleOutline size={50} />,
        });
      },
    });
  };

  const findUsers = () => {
    loadData(0);
  };

  const loadData = async (page) => {
    try {
      const resp = await getUsers(searchQuery, page, lazyState.rows);
      setUsers(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: t("adminUsersTranslations.summaryError"),
        detail: errMsg,
        life: 2000,
        icon: <TbFaceIdError size={50} />,
      });

    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      showToast({
        severity: 'success',
        summary: t('adminUsersTranslations.summarySuccess'),
        detail: t('adminUsersTranslations.detailSuccess'),
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline size={50} />,
      })
      dispatch(triggerRefresh());
    } catch (error) {
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: Object.values(error.response.data)[0],
        life: 2000,
        icon: <TbFaceIdError size={50} />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    navigate("edit", { state: { ...row } });
  };
 
  const onPage = (event) => {
    if (event.page === lazyState.page) return;
    setlazyState(event);
  };

  const getFullName = (user) => {
    const firstName = user.firstName;
    const lastName = user.lastName;

    return `${firstName} ${lastName}`;
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

  const fullName = (user) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title ">{t("adminUsersTranslations.name")} </span>
      {getFullName(user)}
    </div>
  );

  const userEmail = (user) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title ">{t("adminUsersTranslations.email")} </span>
      {user.email}
    </div>
  );

  const userPhone = (user) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title ">{t("adminUsersTranslations.phone")} </span>
      {user.phone}
    </div>
  );

  const userRole = (user) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title ">{t("adminUsersTranslations.role")} </span>
      <Tag
        value={t(`role.${user.role}`)}
      />
    </div>
  );

  const operationButton = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminUsersTranslations.action")}</span>
      {getOperationButtons(row)}
    </div>
  );

  useEffect(() => {
    loadData(lazyState.page);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lazyState, refresher]);

  return (
    <>
      <div className="admin-users-container">
        <div className="search-users-wrapper">
          <InputGroup className="search-input">
            <Form.Control
              name="search"
              aria-label="Search"
              placeholder= {t("adminUsersTranslations.placeholderTypeSomething")}
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            {searchQuery && (
              <InputGroup.Text
                className="clear-wrapper"
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
              onClick={() => findUsers()}
              className="search-button"
              variant="outline-secondary"
            >
              <HiMagnifyingGlass strokeWidth={1} />
            </Button>
          </InputGroup>
        </div>

        <div className="tr-datatable-wrapper">
          <div className="card">
            <DataTable
              className="tr-datatable"
              lazy
              dataKey="id"
              value={users} // the data to display in the table
              paginator // show pagination bar
              rows={lazyState.rows} // how many rows to display in each page
              rowsPerPageOptions={[5, 10, 15, 20]}
              totalRecords={totalRows}
              loading={loading}
              first={lazyState.first}
              onPage={onPage}
              paginatorTemplate={
                "PrevPageLink PageLinks CurrentPageReport NextPageLink"
              }
            >
              <Column header={t("adminUsersTranslations.name")} body={fullName} ></Column>
              <Column header={t("adminUsersTranslations.email")} body={userEmail}></Column>
              <Column header={t("adminUsersTranslations.phone")} body={userPhone}></Column>
              <Column header={t("adminUsersTranslations.role")} body={userRole}></Column>
              <Column header={t("adminUsersTranslations.action")} body={operationButton}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
