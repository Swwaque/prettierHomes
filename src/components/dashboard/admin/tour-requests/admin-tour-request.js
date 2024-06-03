import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Image as FullImage } from 'primereact/image';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { deleteTourRequest, getAllTourRequestByAdminManager } from '../../../../api/tour-requests-service';
import { useDispatch, useSelector } from 'react-redux';
import { triggerRefresh, setTourDetails } from '../../../../store/slices/misc-slice'
import { prettyConfirm } from "../../../../helpers/function/toast-confirm";
import { useToast } from '../../../../store/providers/toast-provider';
import { useNavigate } from 'react-router-dom';
import { PiHandPalmDuotone } from "react-icons/pi";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { TbFaceIdError } from "react-icons/tb";
import { HiArrowsPointingOut, HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import { FiTrash } from "react-icons/fi";
import "./admin-tour-request.scss";
import { useTranslation } from 'react-i18next';

const AdminTourRequest = () => {
  const [adminTourRequest, setAdminTourRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  // const inputRef = useRef(null);
  const { refresher } = useSelector(state => state.misc);
  const { showToast } = useToast()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
  });
  const {t} = useTranslation();
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
      <div className='operationsButton'>
                {row.status === "PENDING" &&
        <Button className="btn-link"
          onClick={(e) => {
            tourRequestDelete(e, row);
          }}
        >
          <FiTrash />
        </Button>
  }
        <Button className="btn-link"
          onClick={(e) => {
            handleDetails(row)
          }}
        >
        <HiArrowsPointingOut />
        </Button>
      </div>
    );
  };

  const tourRequestDelete = (event, row) => {
    prettyConfirm({
      event: event,
      message: t("adminTourRequestTranslations.prettyConfirmMessage"),
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: "danger",
      handleAccept: () => handleDelete(row.id),
      handleReject: () => {
        showToast({
          severity: "warn",
          summary: t("adminTourRequestTranslations.summaryWarn"),
          detail: t("adminTourRequestTranslations.detailWarn"),
          life: 2000,
          icon: <IoMdCloseCircleOutline size={50} />,
        });
      },
    });
  };

  const handleAdvertLink = (adminTourRequest) => {
    navigate(`/advert/${adminTourRequest.advert.slug}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTourRequest(id);
      showToast({
        severity: "success",
        summary: t("adminTourRequestTranslations.summarySuccess"),
        detail: t("adminTourRequestTranslations.detailSuccess"),
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline size={50} />,
      });
      dispatch(triggerRefresh())
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: Object.values(error.response.data)[0],
        life: 2000,
        icon: <TbFaceIdError size={50} />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDetails = (row) => {
    dispatch(setTourDetails(row));
    navigate('/dashboard/tour-requests/details', { state: { ...row } });
  };

  const getStatus = (adminTourRequest) => (
    console.log(adminTourRequest),
    <Tag
      value={t(`statusForTourRequest.${adminTourRequest.status}`)}
      style={{ backgroundColor: getStyle(adminTourRequest.status) }}
    />
  );

  const getStyle = (status) => {
    switch (status) {
      case 'PENDING':
        return '#f18506';
      case 'APPROVED':
        return '#61c141';
      case 'DECLINED':
        return '#ec4747';
      default:
        return null;
    }
  };

  const getProperty = (adminTourRequest) => {
    return (
      <div className="getproperty">
        {
          <div className="image">
            <FullImage
              className='ad-thumbnail'
              src={`data:${adminTourRequest?.image?.type};base64, ${adminTourRequest?.image?.data}`}
              alt={`${adminTourRequest?.image?.name}`}
              preview
            />
          </div>
        }
        <div className='text' onClick={() => handleAdvertLink(adminTourRequest)} >
          <p>{adminTourRequest.advert.title}</p>
          <p>{adminTourRequest.advert.district.name + ", " + adminTourRequest.advert.city.name + ", " + adminTourRequest.advert.country.name}</p>
          <p>{"$" + adminTourRequest.advert.price.toLocaleString()}</p>
        </div>
      </div>
    );
  };

  const getFullNameOwner = (adminTourRequest) => {
    const firstName = adminTourRequest.ownerUser.firstName;
    const lastName = adminTourRequest.ownerUser.lastName;

    return `${firstName} ${lastName}`;
  }

  const getFullNameGuest = (adminTourRequest) => {
    const firstName = adminTourRequest.guestUser.firstName;
    const lastName = adminTourRequest.guestUser.lastName;

    return `${firstName} ${lastName}`;
  }
  const findTourRequests = () => {
    loadData(0);
  };

  const loadData = async (page) => {
    try {
      const resp = await getAllTourRequestByAdminManager(page, lazyState.rows, "tourDate", "desc", searchQuery);
      setAdminTourRequest(resp.content);
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
    padding: "0 10px"
  };

  const property = (adminTourRequest) => (
    <div style={{ padding: "0 10px" }} >
      <div className="p-column-title mb-1" >{t("adminTourRequestTranslations.property")} </div>
      <div>{getProperty(adminTourRequest)}</div>
    </div>
  );

  const fullNameOwner = (adminTourRequest) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title ">{t("adminTourRequestTranslations.owner")} </span>
      {getFullNameOwner(adminTourRequest)}
    </div>
  );
  const fullNameGuest = (adminTourRequest) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title ">{t("adminTourRequestTranslations.guest")} </span>
      {getFullNameGuest(adminTourRequest)}
    </div>
  );

  const status = (tourRequest) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminTourRequestTranslations.status")}</span>
      {getStatus(tourRequest)}
    </div>
  );

  const dateFormat = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminTourRequestTranslations.tourDate")} </span>
      {formatDate(row.tourDate)}
    </div>
  );

  const timeFormat = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminTourRequestTranslations.tourTime")} </span>
      {formatTime(row.tourTime)}
    </div>
  );

  const operationButton = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminTourRequestTranslations.action")}</span>
      {getOperationButtons(row)}
    </div>
  );

  const onPage = (event) => {
    setlazyState(event);
  };

  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lazyState, refresher]);



  return (
    <>
      <div className="admin-tour-request-container" >
        <div className="search-tour-request-wrapper">
          <InputGroup className="search-input">
            <Form.Control
              name="search"
              aria-label="Search"
              placeholder= {t("adminTourRequestTranslations.placeholderTypeSomething")}
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
                  onClick={clearSearch}
                >
                  <HiXMark size={20} strokeWidth={0.5} />
                </Button>
              </InputGroup.Text>
            )}
            <Button
              onClick={() => findTourRequests()}
              className="search-button"
              variant="outline-secondary"
            >
              <HiMagnifyingGlass strokeWidth={1} />
            </Button>
          </InputGroup>
        </div>

        <div className="tr-datatable-wrapper">
          <div className="card">
            <DataTable className='tr-datatable'
              lazy
              dataKey="id"
              value={adminTourRequest} // the data to display in the table
              paginator // show pagination bar
              rows={lazyState.rows} // how many rows to display in each page
              rowsPerPageOptions={[5, 10, 15, 20]}
              totalRecords={totalRows}
              loading={loading}
              first={lazyState.first}
              onPage={onPage}
              paginatorTemplate={"PrevPageLink PageLinks CurrentPageReport NextPageLink"}
            >
              <Column header={t("adminTourRequestTranslations.property")} body={property} headerStyle={{ width: '30%' }} >  </Column>
              <Column header={t("adminTourRequestTranslations.owner")}  body={fullNameOwner}></Column>
              <Column header={t("adminTourRequestTranslations.guest")} body={fullNameGuest}></Column>
              <Column header={t("adminTourRequestTranslations.status")} body={status}></Column>
              <Column header={t("adminTourRequestTranslations.tourDate")} body={dateFormat}></Column>
              <Column header={t("adminTourRequestTranslations.tourTime")} body={timeFormat}></Column>
              <Column header={t("adminTourRequestTranslations.action")} body={operationButton}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTourRequest;