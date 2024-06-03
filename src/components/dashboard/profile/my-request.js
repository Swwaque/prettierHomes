import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Image as FullImage } from 'primereact/image';
import { Button } from 'react-bootstrap';
import { deleteTourRequest, getTourRequestGuest } from '../../../api/tour-requests-service';
import { triggerRefresh } from '../../../store/slices/misc-slice'
import { prettyConfirm } from "../../../helpers/function/toast-confirm";
import { useToast } from '../../../store/providers/toast-provider';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { PiHandPalmDuotone } from "react-icons/pi";
import { TbFaceIdError } from "react-icons/tb";
import { FiTrash } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import "./my-tour-request.scss";
import { useTranslation } from 'react-i18next';

const MyRequest = () => {
  const [tourRequest, setTourRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const { refresher } = useSelector(state => state.misc);
  const { showToast } = useToast()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    return date.toLocaleString('tr-TR', options);
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return time.toLocaleString('en-US', options);
  };

  const getOperationButtons = (row) => {
    if (row.built_in) return null;
    return (
      <div className='operationsButtons'>
        {row.status === "PENDING" &&
          <Button className="btn-link"
            onClick={(e) => {
              tourRequestDecline(e, row);
            }}
          >
            <FiTrash />
          </Button>
        }
        <Button className="btn-link"
          onClick={(e) => {
            handleEdit(row)
          }}
        >
          <LuPencil />
        </Button>
      </div>
    );
  };

  const tourRequestDecline = (event, row) => {
    prettyConfirm({
      event: event,
      message: t("myTourRequestTranslations.handleDeleteMessage"),
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: "danger",
      handleAccept: () => handleDelete(row.id),
      handleReject: () => {
        showToast({
          severity: "warn",
          summary: t("myTourRequestTranslations.summaryWarn"),
          detail: t("myTourRequestTranslations.detailWarn"),
          life: 2000,
          icon: <IoMdCloseCircleOutline size={50} />,
        });
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteTourRequest(id);
      showToast({
        severity: "success",
        summary: t("myTourRequestTranslations.summarySuccess"),
        detail: t("myTourRequestTranslations.detailSuccess"),
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline size={50} />,
      });
      dispatch(triggerRefresh())
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
    navigate('/tour-request-details', { state: { ...row } });
  };

  const getStatus = (tourRequest) => (
    <Tag
      value={t(`statusForTourRequest.${tourRequest.status}`)}
      style={{ backgroundColor: getStyle(tourRequest.status) }}
    />
  );

  // style for status
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

  const handleAdvertLink = (slug) => {
    navigate(`/advert/${slug}`);
  };


  const getProperty = (tourRequest) => {
    return (
      <div className="getproperty">
        {
          <div className="image">
            <FullImage
              className='ad-thumbnail'
              src={`data:${tourRequest.image?.type};base64, ${tourRequest.image?.data}`}
              alt={`${tourRequest.image?.name}`}
              preview
            />
          </div>
        }
        <div className='text' onClick={() => handleAdvertLink(tourRequest.advert.slug)} >
          <p>{tourRequest.advert.title}</p>
          <p>{tourRequest.advert.country.name + " " + tourRequest.advert.city.name + " " + tourRequest.advert.district.name}</p>
          <p>{"$" + tourRequest.advert.price.toLocaleString()}</p>
        </div>
      </div>
    );
  };

  const onPage = (event) => {
    setlazyState(event);
  };

  const getFullName = (tourRequest) => {
    const firstName = tourRequest.ownerUser.firstName;
    const lastName = tourRequest.ownerUser.lastName;

    return `${firstName} ${lastName}`;
  }

  const loadData = async (page) => {
    try {
      const resp = await getTourRequestGuest(page, lazyState.rows);
      setTourRequest(resp.content);
      setTotalRows(resp.totalElements);

    } catch (err) {
      const errMsg = Object.values(err.response.data)[0]

      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: errMsg,
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const narrowRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px"
  };

  const property = (tourRequest) => (
    <div style={{ padding: "0 10px" }} >
      <div className="p-column-title mb-1" >{t("myTourRequestTranslations.property")} </div>
      <div>{getProperty(tourRequest)}</div>
    </div>
  );

  const fullName = (tourRequest) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title ">{t("myTourRequestTranslations.owner")} </span>
      {getFullName(tourRequest)}
    </div>
  );

  const status = (tourRequest) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("myTourRequestTranslations.status")} </span>
      {getStatus(tourRequest)}
    </div>
  );

  const dateFormat = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("myTourRequestTranslations.tourDate")} </span>
      {formatDate(row.tourDate)}
    </div>
  );

  const timeFormat = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("myTourRequestTranslations.tourTime")} </span>
      {formatTime(row.tourTime)}
    </div>
  );

  const operationButton = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("myTourRequestTranslations.action")} </span>
      {getOperationButtons(row)}
    </div>
  );

  useEffect(() => {
    loadData(lazyState.page);
    //eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [lazyState, refresher]);

  return (
    <>
      <div className="tr-datatable-wrapper">
        <div className="card">
          <DataTable className='tr-datatable'
            lazy
            dataKey="id"
            value={tourRequest} // the data to display in the table
            paginator // show pagination bar
            rows={lazyState.rows} // how many rows to display in each page
            rowsPerPageOptions={[5, 10, 15, 20]}
            totalRecords={totalRows}
            loading={loading}
            first={lazyState.first}
            onPage={onPage}
            paginatorTemplate={"PrevPageLink PageLinks CurrentPageReport NextPageLink"}
          >
            <Column header={t("myTourRequestTranslations.property")} body={property} headerStyle={{ width: '30%' }} >  </Column>
            <Column header={t("myTourRequestTranslations.owner")} body={fullName}></Column>
            <Column header={t("myTourRequestTranslations.status")} body={status}></Column>
            <Column header={t("myTourRequestTranslations.tourDate")} body={dateFormat}></Column>
            <Column header={t("myTourRequestTranslations.tourTime")} body={timeFormat}></Column>
            <Column header={t("myTourRequestTranslations.action")} body={operationButton}></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default MyRequest