import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button, Container } from 'react-bootstrap';
import { Image as FullImage } from 'primereact/image';
import { deleteAdvert, getAdverts } from '../../../api/adverts-service';
import { useDispatch, useSelector } from 'react-redux';
import { triggerRefresh } from '../../../store/slices/misc-slice'
import { getFavoritesCountCustomer } from '../../../api/favorites-service';
import { getTourRequestCountCustomer } from '../../../api/tour-requests-service';
import { prettyConfirm } from '../../../helpers/function/toast-confirm';
import { useToast } from '../../../store/providers/toast-provider';
import { useNavigate } from 'react-router-dom';
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { HiMiniMapPin, HiMiniEye, HiMiniHeart } from "react-icons/hi2";
import { PiHandPalmDuotone } from 'react-icons/pi';
import { TbFaceIdError } from "react-icons/tb";
import { FiTrash } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import "./my-adverts.scss"
import { useTranslation } from 'react-i18next';

const MyAdverts = () => {
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const { refresher } = useSelector(state => state.misc);
  const [favoritesCounts, setFavoritesCounts] = useState([]);
  const [tourRequestCounts, setTourRequestCounts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { t } = useTranslation();
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
  const handleAdvertLink = (advert) => {
    navigate(`/advert/${advert.slug}`);
  };


  const getProperty = (advert) => {
    return (
      <div className="getproperty">
        {
          <div className="image">
            <FullImage
              className='ad-thumbnail'
              src={`data:${advert.images[0]?.type};base64, ${advert.images[0]?.data}`}
              alt={`${advert.images[0]?.name}`}
              preview
            />
          </div>
        }
        <div className='text' onClick={() => handleAdvertLink(advert)}>
          <p>{advert.title}</p>
          <p>{advert.country.name + " " + advert.city.name + " " + advert.district.name}</p>
          <p>{"$" + advert.price.toLocaleString()}</p>
        </div>
      </div>
    );
  };

  const formatCreatedAt = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('tr-TR', options);
  };

  const getOperationButtons = (row) => {
    if (row.builtIn) return null;
    return (
      <div className='operationsButton'>
        <Button className="btn-link" onClick={(e) => handleDelete(e, row)} >
          <FiTrash />
        </Button>
        <Button className="btn-link" onClick={() => handleEdit(row)}>
          <LuPencil />
        </Button>
      </div>
    );
  };

  const handleDelete = async (event, row) => {
    prettyConfirm({
      event: event,
      message: t("myAdvertsTranslations.handleDeleteMessage"),
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: "danger",
      handleAccept: () => confirmDelete(row.id),
      handleReject: () => {
        showToast({
          severity: "warn",
          summary: t("myAdvertsTranslations.summaryWarn"),
          detail: t("myAdvertsTranslations.detailWarn"),
          life: 2000,
          icon: <IoMdCloseCircleOutline size={50} />,
        });
      },
    });
  };

  const confirmDelete = async (id) => {
    try {
      await deleteAdvert(id);
      showToast({
        severity: "success",
        summary: t("myAdvertsTranslations.summarySuccess"),
        detail: t("myAdvertsTranslations.detailSuccess"),
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline size={50} />,
      })
      dispatch(triggerRefresh());
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
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

  const handleEdit = (row) => {
    navigate('/ad/edit', { state: { ...row } });
  };

  const getStatus = (adverts) => (
    <Tag
      value={t(`adminAdvertTable.${adverts.statusForAdvert}`)}
      style={{ backgroundColor: getStyle(adverts.statusForAdvert) }}
    />
  );

  const getStyle = (status) => {
    const statusStyles = {
      'PENDING': '#f18506',
      'ACTIVATED': '#61c141',
      'REJECTED': '#ec4747',
    };
    return statusStyles[status] || null;
  };


  const getViewLikeTour = (adverts) => {
    const favoritesCount = favoritesCounts[adverts.id];
    const tourRequestCount = tourRequestCounts[adverts.id];
    return (
      <div className='icons-wrapper'>
        <div className='icon-data'><HiMiniEye />{adverts.viewCount}</div>
        <div className='icon-data'><HiMiniHeart />{favoritesCount || 0}</div>
        <div className='icon-data'><HiMiniMapPin />{tourRequestCount || 0} </div>
      </div>
    );
  };

  const getFavoritesCountForAdvert = async () => {
    try {
      const favoritesCountCustomer = await getFavoritesCountCustomer();
      const updatedFavoritesCounts = { ...favoritesCounts };

      favoritesCountCustomer.forEach((item) => {
        updatedFavoritesCounts[item.advertId] = item.favoriteCount;
      });
      setFavoritesCounts(updatedFavoritesCounts);
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: errMsg,
        life: 2000,
        icon: <TbFaceIdError size={50} />,
      });
    }
  };

  const getTourRequestCountForAdvert = async () => {
    try {
      const tourRequestCountCustomer = await getTourRequestCountCustomer();
      const updatedTourRequestCounts = { ...tourRequestCounts };

      tourRequestCountCustomer.forEach((item) => {
        updatedTourRequestCounts[item.advertId] = item.tourRequestCount;
      });

      setTourRequestCounts(updatedTourRequestCounts);
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: errMsg,
        life: 2000,
        icon: <TbFaceIdError size={50} />,
      });
    }
  };

  const loadData = async (page) => {
    try {
      const resp = await getAdverts(page, lazyState.rows);
      setAdverts(resp.content);
      setTotalRows(resp.totalElements);

      getFavoritesCountForAdvert();
      getTourRequestCountForAdvert();
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

  const narrowRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
  };

  const property = (adverts) => (
    <div style={{ padding: "0 10px" }} >
      <div className="p-column-title mb-1" >{t("myAdvertsTranslations.property")} </div>
      <div>{getProperty(adverts)}</div>
    </div>
  );

  const dateFormat = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("myAdvertsTranslations.datePublish")} </span>
      {formatCreatedAt(row.createdAt)}
    </div>
  );

  const status = (adverts) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("myAdvertsTranslations.status")} </span>
      {getStatus(adverts)}
    </div>
  );
  const ViewLikeTour = (adverts) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("myAdvertsTranslations.viewLikeTour")} </span>
      {getViewLikeTour(adverts)}
    </div>
  );

  const operationButton = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("myAdvertsTranslations.action")} </span>
      {getOperationButtons(row)}
    </div>
  );

  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [lazyState, refresher]);

  return (
    <>
      <Container className="advert-container">
        <div className="tr-datatable-wrapper">
          <div className="card" >
            <DataTable className='tr-datatable'
              lazy
              dataKey="id"
              value={adverts} // the data to display in the table
              paginator // show pagination bar
              rows={lazyState.rows} // how many rows to display in each page
              rowsPerPageOptions={[5, 10, 15, 20]} // rows per page options
              totalRecords={totalRows}
              loading={loading}
              first={lazyState.first}
              onPage={onPage}
              paginatorTemplate={
                "PrevPageLink PageLinks CurrentPageReport NextPageLink"
              }
            >
              <Column
                header= {t("myAdvertsTranslations.property")}
                body={property}
                headerStyle={{ width: "30%" }}
              >
                {" "}
              </Column>
              <Column
                field="createdAt"
                className="my-custom-column"
                header= {t("myAdvertsTranslations.datePublish")}
                body={dateFormat}
              ></Column>
              <Column header= {t("myAdvertsTranslations.status")} body={status}></Column>
              <Column header= {t("myAdvertsTranslations.viewLikeTour")} body={ViewLikeTour}></Column>
              <Column header= {t("myAdvertsTranslations.action")} body={operationButton}></Column>
            </DataTable>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MyAdverts;
