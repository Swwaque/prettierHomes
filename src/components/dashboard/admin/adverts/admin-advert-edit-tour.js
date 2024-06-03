import React, { useEffect, useState } from "react";
import {
  deleteTourRequest,
  getTourRequestByAdvert,
} from "../../../../api/tour-requests-service";
import { triggerRefresh } from "../../../../store/slices/misc-slice";
import { prettyConfirm } from "../../../../helpers/function/toast-confirm";
import {
  formatDate,
  formatTime,
} from "../../../../helpers/function/format-date-time";
import { useToast } from "../../../../store/providers/toast-provider";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { LuTrash } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import './admin-advert-edit-tour.scss';
import { useTranslation } from "react-i18next";


const AdminAdvertEditTour = () => {
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [tour, setTour] = useState([]);
  const { refresher } = useSelector(
    (state) => state.misc
  );

  const dispatch = useDispatch();
  const { showToast } = useToast();
  const location = useLocation();
  const id = location.state.id;
  const { t } = useTranslation();



  // CONFIRM & TOAST
  const handleDecline = async (row) => {
    try {
      await deleteTourRequest(row.id);
      showToast({
        severity: "warn",
        summary: t("adminAdvertEditTour.summaryWarn"),
        detail: t("adminAdvertEditTour.detailWarn"),
        life: 2000,
        icon: <LuTrash size={30} />,
      });
      dispatch(triggerRefresh());
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: t("adminAdvertEditTour.summaryError"),
        detail: errMsg,
        life: 2000,
      });
    }
  };

  const deleteTourRequests = (event, row) => {
    prettyConfirm({
      event: event,
      message: t("adminAdvertEditTour.prettyConfirmMessage"),
      icon: <LuTrash size={30} />,
      acceptButtonType: "danger",
      handleAccept: () => handleDecline(row),
    });
  };

  //TABLE PAGE DATA
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  const onPage = (event) => {
    if (event.page === lazyState.page) return;
    setlazyState(event);
  };

  const loadData = async (page) => {
    try {
      const resp = await getTourRequestByAdvert(
        id,
        page,
        lazyState.rows
      );
      setTour(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: t("adminAdvertEditTour.summaryError"),
        detail: errMsg,
        life: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [lazyState, refresher]);

  //STATUS & STYLE
  const getStatus = (tour) => (
    <Tag
      value={tour.status}
      style={{ backgroundColor: getStyle(tour.status) }}
    />
  );

  const getStyle = (status) => {
    switch (status) {
      case "PENDING":
        return "#f18506";
      case "APPROVED":
        return "#61c141";
      case "DECLINED":
        return "#ec4747";
      case "CANCELED":
        return "#ff0000";
      default:
        return null;
    }
  };

  const getOperationButtons = (row) => {
    if (row.built_in) return null;
    return (
      <span className="operationsButtons">
        {
          (row.status === "PENDING" || row.status === "DECLINED") &&
          <Button
            className="btn-delete"
            onClick={(e) => {
              deleteTourRequests(e, row);
            }}
          >
            <LuTrash />
          </Button>
        }
      </span>
    );
  };

  //NARROW TABLE & STYLE
  const narrowRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
  };

  const fullName = (rowData) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminAdvertEditTour.guestName")} </span>
      {rowData.guestUserFullName}
    </div>
  );

  const advertStatus = (rowData) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminAdvertEditTour.advertStatus")} </span>
      {getStatus(rowData)}
    </div>
  );

  const tourRequestDate = (date) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminAdvertEditTour.tourDate")} </span>
      {formatDate(date)}
    </div>
  );

  const tourRequestTime = (time) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminAdvertEditTour.tourTime")} </span>
      {formatTime(time)}
    </div>
  );

  const operationButtons = (rowdata) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminAdvertEditTour.action")} </span>
      {getOperationButtons(rowdata)}
    </div>
  );

  return (
    <>
      <div className="admin-advert-edit-tour-request-container">
        {/* <h5>Tour Requests</h5> */}
        <div className="tr-datatable-wrapper">
          <div className="card">
            <DataTable
              className="tr-datatable"
              lazy
              dataKey="id"
              value={tour}
              paginator
              rows={lazyState.rows}
              totalRecords={totalRows}
              loading={loading}
              first={lazyState.first}
              onPage={onPage}
              tableStyle={{ minHeight: "122px" }}
              paginatorTemplate={
                "PrevPageLink PageLinks CurrentPageReport NextPageLink"
              }
            >
              <Column
                header={t("adminAdvertEditTour.columnHeader")}
                field="guestUserFullName"
                headerStyle={{ width: "30%" }}
                body={fullName}
              ></Column>
              <Column
                header={t("adminAdvertEditTour.advertStatus")}
                field="status"
                className="my-custom-column"
                body={advertStatus}
              ></Column>
              <Column
                header={t("adminAdvertEditTour.tourDate")}
                body={(rowData) => tourRequestDate(rowData.tourDate)}
              ></Column>
              <Column
                header={t("adminAdvertEditTour.tourTime")}
                body={(rowData) => tourRequestTime(rowData.tourTime)}
              ></Column>
              <Column
                header={t("adminAdvertEditTour.action")}
                body={(rowData) => operationButtons(rowData)}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAdvertEditTour;
