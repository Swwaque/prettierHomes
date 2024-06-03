import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deletePropertyKey, getPropertyKeysOfCategory } from '../../../../api/property-key-service';
import { setComponentMode, setCurrentPK } from '../../../../store/slices/misc-slice';
import { prettyConfirm } from "../../../../helpers/function/toast-confirm";
import { useToast } from '../../../../store/providers/toast-provider';
import { PiHandPalmDuotone } from "react-icons/pi";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { FiTrash } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import { TbFaceIdError } from "react-icons/tb";
import './category-property-list.scss';
import { useTranslation } from 'react-i18next';


const CategoryPropertyList = ({ categoryId }) => {
    const {refresher} = useSelector(state => state.misc);
    const [propertyKey, setPropertyKey] = useState([]);
    const { showToast } = useToast();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const deleteConfirm = (event, row) => {
        prettyConfirm({
            event: event,
            message: t("categorypropertyList.prettyConfirmMessage"),
            icon: <PiHandPalmDuotone size={50} />,
            acceptButtonType: "danger",
            handleAccept: () => handleDelete(row.id),
            handleReject: () => {
                showToast({
                    severity: "warn",
                    summary: t("categorypropertyList.summaryWarn"),
                    detail: t("categorypropertyList.detailWarn"),
                    life: 2000,
                    icon: <IoMdCloseCircleOutline size={50} />,
                });
            },
        });
    };


    const handleDelete = async (id) => {
        try {
            await deletePropertyKey(id);
            setPropertyKey(propertyKey.filter((item) => item.id !== id));
            showToast({
                severity: "success",
                summary: t("categorypropertyList.summarySuccess"),
                detail: t("categorypropertyList.detailSuccess"),
                life: 2000,
                icon: <IoMdCheckmarkCircleOutline size={50} />,
            });
        } catch (err) {
            showToast({
                severity: "error",
                summary: t("categorypropertyList.summaryErr"),
                detail: Object.values(err.response.data)[0],
                life: 2000,
                icon: <TbFaceIdError size={50} />,
            });
        }
    };

    const handleEdit = (row) => {
        dispatch(setCurrentPK(row));
        dispatch(setComponentMode("edit"));
    };

    const loadData = async (categoryId) => {
        try {
            const resp = await getPropertyKeysOfCategory(categoryId);
            setPropertyKey(resp);
        } catch (err) {
            const errMsg = Object.values(err.response.data)[0];
            showToast({
                severity: "error",
                summary: t("categorypropertyList.summaryErr"),
                detail: errMsg,
                life: 2000,
                icon: <TbFaceIdError size={50} />,
            });
        }
    };

    const operationButton = (row) => (
        <div>
            <div className='operationsButton'>
                <Button className="btn-link" onClick={(e) => deleteConfirm(e, row)}>
                    <FiTrash />
                </Button>
                <Button className="btn-link" onClick={() => handleEdit(row)}>
                    <LuPencil />
                </Button>
            </div>
        </div>
    );

    useEffect(() => {
        loadData(categoryId);
        return () => {
            dispatch(setCurrentPK(null));
            dispatch(setComponentMode(null));
        }
        // eslint-disable-next-line
    }, [refresher]);

    return (
        <>
            <div className="admin-property-key-list-container">
                <div className="pk-datatable-wrapper">
                    <div className="card" >
                        <DataTable
                            className='pk-datatable'
                            value={propertyKey}
                            header={t("categorypropertyList.header")}
                            emptyMessage={t("categorypropertyList.emptyMessage")}
                        >
                            <Column field="name" style={{ width: 'auto' }} />
                            <Column body={operationButton} style={{ width: '100px' }} />
                        </DataTable>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryPropertyList