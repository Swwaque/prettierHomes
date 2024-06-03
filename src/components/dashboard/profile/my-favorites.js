import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button, Container } from 'react-bootstrap';
import { Image as FullImage } from 'primereact/image';
import { useDispatch, useSelector } from 'react-redux';
import { triggerRefresh } from '../../../store/slices/misc-slice';
import { useToast } from '../../../store/providers/toast-provider';
import { useNavigate } from 'react-router-dom/dist';
import { getFavorites, deleteFavorite } from '../../../api/favorites-service';
import { prettyConfirm } from "../../../helpers/function/toast-confirm";
import { toggleFav } from '../../../store/slices/fav-slice';
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { PiHandPalmDuotone } from "react-icons/pi";
import { TbFaceIdError } from "react-icons/tb";
import { FiTrash } from "react-icons/fi";
import "./my-favorites.scss";
import { useTranslation } from 'react-i18next';


const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refresher } = useSelector(state => state.misc);
  const { showToast } = useToast()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleAdvertLink = (slug) => {
    navigate(`/advert/${slug}`);
  };


  const getProperty = (favorite) => {

    return (
      <div className="getproperty">
        {
          <div className="image">
            <FullImage
              className='ad-thumbnail'
              src={`data:${favorite.image?.type};base64, ${favorite.image?.data}`}
              alt={`${favorite.image?.name}`}

              preview 
            />
          </div>
        }

        <div className='text' onClick={() => handleAdvertLink(favorite.slug)}>
          <p>{favorite.title}</p>
          <p>{favorite.country.name + " " + favorite.city.name + " " + favorite.district.name}</p>
          <p>{"$" + favorite.price}</p>

        </div>
      </div>
    );
  };

  const getOperationButtons = (row) => {
    return (
      <div className='operationsButton'>
        <Button className="btn-link" onClick={(e) => {
          favoriteDecline(e, row);
        }} >

          <FiTrash />
        </Button>
      </div>
    );
  };

  const favoriteDecline = (event, row) => {
    prettyConfirm({
      event: event,
      message: t("myFavoritesTranslations.handleDeleteMessage"),
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: "danger",
      handleAccept: () => handleDelete(row.favoriteId, row.advertId),
      handleReject: () => {
        showToast({
          severity: "warn",
          summary: t("myFavoritesTranslations.summaryWarn"),
          detail: t("myFavoritesTranslations.detailWarn"),
          life: 2000,
          icon: <IoMdCloseCircleOutline size={50} />,
        });
      },
    });
  };


  const handleDelete = async (favoriteId, advertId) => {
    try {
      await deleteFavorite(favoriteId);
      dispatch(toggleFav(advertId));
      showToast({
        severity: "success",
        summary: t("myFavoritesTranslations.summarySuccess"),
        detail: t("myFavoritesTranslations.detailSuccess"),
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline size={50} />,
      });
      dispatch(triggerRefresh());
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

  const loadData = async () => {
    try {
      const resp = await getFavorites();
      setFavorites(resp);
    } catch (err) {
      showToast({
        severity: "error",
        summary: "Error",
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

  const property = (tourRequest) => (
    <div style={{ padding: "0 10px" }} >
      <div className="p-column-title mb-1" >{t("myFavoritesTranslations.property")} </div>

      <div>{getProperty(tourRequest)}</div>
    </div>
  );

  const operationButton = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("myFavoritesTranslations.action")} </span>
      {getOperationButtons(row)}
    </div>
  );

  const getCategory = (favorite) => {
    return favorite.category.title;
  }

  const category = (favorite) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("myFavoritesTranslations.category")} </span>
      {getCategory(favorite)}
    </div>
  );

  const getType = (favorite) => {
    return favorite.advertType.title;
  };
  const type = (favorite) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("myFavoritesTranslations.type")} </span>
      {getType(favorite)}
    </div>
  );

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [refresher]);

  return (
    <>
      <Container className="favorite-container" >
        <div className="tr-datatable-wrapper">
          <div className="card">
            <DataTable className='tr-datatable'
              value={favorites}
            >
              <Column header= {t("myFavoritesTranslations.property")} body={property} headerStyle={{ width: '30%' }} />
              <Column header= {t("myFavoritesTranslations.category")} body={category} />
              <Column header= {t("myFavoritesTranslations.type")} body={type} />
              <Column header= {t("myFavoritesTranslations.action")} body={operationButton} />
            </DataTable>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MyFavorites;
