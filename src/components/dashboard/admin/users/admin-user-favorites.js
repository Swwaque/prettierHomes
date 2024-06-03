import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "react-bootstrap";
import { Image as FullImage } from "primereact/image";
import { triggerRefresh } from "../../../../store/slices/misc-slice";
import { deleteFavoriteAdmin, getAllFavoritesByUserId } from "../../../../api/favorites-service";
import { prettyConfirm } from "../../../../helpers/function/toast-confirm";
import { toggleFav } from "../../../../store/slices/fav-slice";
import { useToast } from "../../../../store/providers/toast-provider";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline, } from "react-icons/io";
import { TbFaceIdError } from "react-icons/tb";
import { PiHandPalmDuotone } from "react-icons/pi";
import { FiTrash } from "react-icons/fi";
import "./admin-user-favorites.scss";
import { useTranslation } from "react-i18next";
 

const AdminUserFavorites = () => {
  const { refresher } = useSelector((state) => state.misc);
  const { user } = useSelector((state) => state.auth);
  const [favorites, setFavorites] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;
  const { t } = useTranslation();

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  const handleAdvertLink = (favorite) => {
    navigate(`/advert/${favorite.slug}`);
  };


  const getProperty = (favorite) => {
    const formatedPrice = favorite.price.toLocaleString();

    return (
      <div className="getproperty">
        {
          <div className="image">
            <FullImage
              className="ad-thumbnail"
              src={`data:${favorite.image.type};base64, ${favorite.image?.data}`}
              alt={`${favorite.image?.name}`}
              preview
            />
          </div>
        }

        <div className="text" onClick={() => handleAdvertLink(favorite)}>
          <p>{favorite.title}</p>
          <p>
            {favorite.district.name +
              ", " +
              favorite.city.name +
              ", " +
              favorite.country.name}
          </p>
          <p>{"$" + formatedPrice}</p>
        </div>
      </div>
    );
  };

  const onPage = (event) => {
    setlazyState(event);
  };

  const getOperationButtons = (row) => {
    return (
      <div className="operationsButton">
        <Button
          className="btn-link"
          onClick={(e) => {
            favoriteDecline(e, row);
          }}
        >
          <FiTrash />
        </Button>
      </div>
    );
  };

  const favoriteDecline = (event, row) => {
    prettyConfirm({
      event: event,
      message: t("adminUserFavoritesTranslations.prettyConfirmMessage"),
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: "danger",
      handleAccept: () => handleDelete(row.favoriteId, row.advertId),
      handleReject: () => {
        showToast({
          severity: "warn",
          summary: t("adminUserFavoritesTranslations.summaryWarn"),
          detail: t("adminUserFavoritesTranslations.detailWarn"),
          life: 2000,
          icon: <IoMdCloseCircleOutline size={50} />,
        });
      },
    });
  };

  const handleDelete = async (favoriteId, advertId) => {
    try {
      await deleteFavoriteAdmin(favoriteId);
      if (user.id === id) {
        dispatch(toggleFav(advertId));
      }
      showToast({
        severity: "success",
        summary: t("adminUserFavoritesTranslations.summarySuccess"),
        detail: t("adminUserFavoritesTranslations.detailSuccess"),
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline size={50} />,
      });
      dispatch(triggerRefresh());
    } catch (err) {
      showToast({
        severity: "error",
        summary: t("adminUserFavoritesTranslations.summaryError"),
        detail: Object.values(err.response.data)[0],
        life: 2000,
        icon: <TbFaceIdError size={50} />,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadData = async (id, page) => {
    try {
      const resp = await getAllFavoritesByUserId(id, page, lazyState.rows);
      setFavorites(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      showToast({
        severity: "error",
        summary: t("adminUserFavoritesTranslations.summaryError"),
        detail: Object.values(err.response.data)[0],
        life: 3000,
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
    <div style={{ padding: "0 10px" }}>
      <div className="p-column-title mb-1">{t("adminUserFavoritesTranslations.property")} </div>
      <div>{getProperty(tourRequest)}</div>
    </div>
  );

  const operationButton = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminUserFavoritesTranslations.action")} </span>
      {getOperationButtons(row)}
    </div>
  );

  const getCategory = (favorite) => {
    return favorite.category.title;
  };
  const category = (favorite) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminUserFavoritesTranslations.category")} </span>
      {getCategory(favorite)}
    </div>
  );

  const getType = (favorite) => {
    return favorite.advertType.title;
  };
  const type = (favorite) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">{t("adminUserFavoritesTranslations.type")} </span>
      {getType(favorite)}
    </div>
  );

  useEffect(() => {
    loadData(id, lazyState.page);
    // eslint-disable-next-line
  }, [lazyState, refresher]);

  return (
    <>
      <div className="admin-user-favorite-container">
        <div className="tr-datatable-wrapper">
          <div className="card">
            <DataTable
              className="tr-datatable"
              lazy
              dataKey="advertId"
              value={favorites} // the data to display in the table
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
                header= {t("adminUserFavoritesTranslations.property")}
                body={property}
                headerStyle={{ width: "30%" }}
              />
              <Column header={t("adminUserFavoritesTranslations.category")} body={category} />
              <Column header={t("adminUserFavoritesTranslations.type")} body={type} />
              <Column header={t("adminUserFavoritesTranslations.action")} body={operationButton} />
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserFavorites;
