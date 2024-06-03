import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../../store/providers/toast-provider';
import { prettyConfirm } from '../../../../helpers/function/toast-confirm';
import { deleteAdvert, getAdvertsForAdmin } from '../../../../api/adverts-service';
import { getFavoritesCountAdmin } from '../../../../api/favorites-service';
import { getTourRequestCountAdmin } from '../../../../api/tour-requests-service';
import { Image as FullImage } from "primereact/image";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { HiMiniEye, HiMiniHeart, HiMiniMapPin } from 'react-icons/hi2';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { PiHandPalmDuotone } from 'react-icons/pi';
import { TbFaceIdError } from 'react-icons/tb';
import { FiTrash } from 'react-icons/fi';
import { LuPencil } from 'react-icons/lu';
import './admin-advert-table.scss'
import { useTranslation } from 'react-i18next';

const AdminAdvertTable = ({ adverts, setAdverts, searchParams, loading, setLoading }) => {
    const [totalRows, setTotalRows] = useState(0);
    const [favoritesCounts, setFavoritesCounts] = useState([]);
    const [tourRequestCounts, setTourRequestCounts] = useState([]);
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 5,
        page: 0,
        sortField: null,
        sortOrder: null,
    });
    const {t} = useTranslation();
    const onPage = (event) => {
        setlazyState(event);
    };
    const getOperationButtons = (row) => {
        if (row.builtIn) return null;

        return (
            <div className="operationsButton">
                <Button className="btn-link" onClick={(e) => handleDelete(e, row)}>
                    <FiTrash />
                </Button>
                <Button className="btn-link" onClick={() => handleEdit(row)}>
                    <LuPencil />
                </Button>
            </div>
        );
    };

    // style for status
    const getStyle = (status) => {
        const statusStyles = {
            PENDING: "#f18506",
            ACTIVATED: "#61c141",
            REJECTED: "#ec4747",
        };

        return statusStyles[status] || null;
    };

    const handleDelete = async (event, row) => {
        prettyConfirm({
            event: event,
            message: t("adminAdvertTable.prettyConfirmMessage"),
            icon: <PiHandPalmDuotone size={50} />,
            acceptButtonType: "danger",
            handleAccept: () => confirmDelete(row.id),
            handleReject: () => {
                showToast({
                    severity: "warn",
                    summary: t("adminAdvertTable.summaryWarn"),
                    detail: t("adminAdvertTable.detailWarn"),
                    life: 2000,
                    icon: <IoMdCheckmarkCircleOutline size={50} />,
                });
            },
        });
    };

    const confirmDelete = async (id) => {
        try {
            await deleteAdvert(id);
            showToast({
                severity: "success",
                summary: t("adminAdvertTable.summarySuccess"),
                detail: t("adminAdvertTable.detailSuccess"),
                life: 2000,
                icon: <IoMdCheckmarkCircleOutline size={50} />,
            });
        } catch (err) {
            const errMsg = Object.values(err.response.data)[0];
            showToast({
                severity: "error",
                summary: t("adminAdvertTable.summaryError"),
                detail: errMsg,
                life: 2000,
                icon: <TbFaceIdError size={50} />,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (row) => {
        navigate("/dashboard/adverts/edit", { state: { ...row } });
    };

    const getStatus = (adverts) => (
        <Tag
            value={t(`adminAdvertTable.${adverts.statusForAdvert}`)}
            style={{ backgroundColor: getStyle(adverts.statusForAdvert) }}
        />
    );
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
            const favoritesCountCustomer = await getFavoritesCountAdmin();
            const updatedFavoritesCounts = { ...favoritesCounts };

            favoritesCountCustomer.forEach(item => {
                updatedFavoritesCounts[item.advertId] = item.favoriteCount;
            })
            setFavoritesCounts(updatedFavoritesCounts);
        } catch (err) {
            const errMsg = Object.values(err.response.data)[0];
            showToast({
                severity: "error",
                summary: t("adminAdvertTable.summaryError"),
                detail: errMsg,
                life: 2000,
                icon: <TbFaceIdError size={50} />,
            });
        }
    };

    const getTourRequestCountForAdvert = async () => {
        try {
            const tourRequestCountCustomer = await getTourRequestCountAdmin();
            const updatedTourRequestCounts = { ...tourRequestCounts };

            tourRequestCountCustomer.forEach(item => {
                updatedTourRequestCounts[item.advertId] = item.tourRequestCount;
            });
            setTourRequestCounts(updatedTourRequestCounts);

        } catch (err) {
            const errMsg = Object.values(err.response.data)[0];
            showToast({
                severity: "error",
                summary: t("adminAdvertTable.summaryError"),
                detail: errMsg,
                life: 2000,
                icon: <TbFaceIdError size={50} />,
            });
        }
    };
    const loadData = async (page) => {
        try {
            const resp = await getAdvertsForAdmin(searchParams, page, lazyState.rows);
            setAdverts(resp.content);
            setTotalRows(resp.totalElements);

            getFavoritesCountForAdvert();
            getTourRequestCountForAdvert();

        } catch (err) {
            showToast({
                severity: "error",
                summary: t("adminAdvertTable.summaryError"),
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

    const handleAdvertLink = (advert) => {
        navigate(`/advert/${advert.slug}`);
    };

    const getProperty = (advert) => {

        return (
            <div className="getproperty">
                {
                    <div className="image">
                        <FullImage
                            className="ad-thumbnail"
                            src={`data:${advert.images[0]?.type};base64, ${advert.images[0]?.data}`}
                            alt={`${advert.images[0]?.name}`}
                            preview
                        />
                    </div>
                }
                <div className="text" onClick={() => handleAdvertLink(advert)}>
                    <p>{advert.title}</p>
                    <p>{advert.district.name + ", " + advert.city.name + ", " + advert.country.name}</p>
                    <p>{"$" + advert.price.toLocaleString()}</p>
                </div>
            </div>
        );
    };
    const property = (adverts) => (
        <div style={{ padding: "0 10px" }}>
            <div className="p-column-title mb-1">{t("adminAdvertTable.property")} </div>
            <div>{getProperty(adverts)}</div>
        </div>
    );
    const formatCreatedAt = (dateString) => {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        return date.toLocaleDateString("tr-TR", options);
    };
    const dateFormat = (row) => (
        <div style={narrowRowStyle}>
            <span className="p-column-title">{t("adminAdvertTable.published")} </span>
            {formatCreatedAt(row.createdAt)}
        </div>
    );

    const status = (adverts) => (
        <div style={narrowRowStyle}>
            <span className="p-column-title">{t("adminAdvertTable.status")} </span>
            {getStatus(adverts)}
        </div>
    );
    const ViewLikeTour = (adverts) => (
        <div style={narrowRowStyle}>
            <span className="p-column-title">{t("adminAdvertTable.viewLikeTour")} </span>
            {getViewLikeTour(adverts)}
        </div>
    );
    const operationButton = (row) => (
        <div style={narrowRowStyle}>
            <span className="p-column-title">{t("adminAdvertTable.action")} </span>
            {getOperationButtons(row)}
        </div>
    );

    useEffect(() => {
        loadData(lazyState.page);
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [searchParams, lazyState]);

    return (
        <>
            <div className="admin-advert-table-container">
                <div className="tr-datatable-wrapper">
                    <div className="card">
                        <DataTable
                            className="tr-datatable"
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
                                header= {t("adminAdvertTable.property")}
                                body={property}
                                headerStyle={{ width: "30%" }}
                            ></Column>
                            <Column
                                field="createdAt"
                                className="my-custom-column"
                                header= {t("adminAdvertTable.published")}
                                body={dateFormat}
                            ></Column>
                            <Column header= {t("adminAdvertTable.status")} body={status}></Column>
                            <Column header= {t("adminAdvertTable.viewLikeTour")} body={ViewLikeTour}></Column>
                            <Column header= {t("adminAdvertTable.action")} body={operationButton}></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminAdvertTable