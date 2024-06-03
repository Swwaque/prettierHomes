import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import { formatTimeStamp } from "../../../../helpers/function/format-date-time"
import { useLocation } from 'react-router-dom';
import { TbFaceIdError } from "react-icons/tb";
import { getLogs } from "../../../../api/log-service";
import { useToast } from "../../../../store/providers/toast-provider";
import "./admin-user-logs.scss";
import { useTranslation } from "react-i18next";
 
const AdminUserLogs = () => {
  const {refresher} = useSelector((state) => state.misc);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const { showToast } = useToast();
  const location = useLocation();
  const id = location.state?.id;
  const { t } = useTranslation();

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  const loadData = async (page) => {
    try {
      const resp = await getLogs(id, page, lazyState.rows);
      setLogs(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      showToast({
        severity: "error",
        summary: t("adminUserLogsTranslations.summaryError"),
        detail: Object.values(err.response.data)[0],
        life: 2000,
        icon: <TbFaceIdError size={50} />,
      });
    } finally {
      setLoading(false);
    }
  };

  const onPage = (event) => {
    setlazyState(event);
  };

  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line
  }, [lazyState, refresher]);

  const narrowRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 5px",
  };

  const logMessage = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminUserLogsTranslations.log")} </span>
      <span className="log-message">{row.message}</span>
    </div>
  );

  const logDate = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminUserLogsTranslations.date")}</span>
      {formatTimeStamp(row.createdAt)}
    </div>
  );


  return (
    <>
      <div className="admin-user-logs-container">
        <div className="tr-datatable-wrapper">
          <div className="card">
            <DataTable
              className="tr-datatable"
              lazy
              dataKey="id"
              value={logs} // the data to display in the table
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
              <Column
                header={t("adminUserLogsTranslations.log")}
                field="message"
                bodyStyle={{ flex: 1 }}
                body={logMessage}
              ></Column>
              <Column
                header={t("adminUserLogsTranslations.date")}
                body={logDate}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserLogs;
