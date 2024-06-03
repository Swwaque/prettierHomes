import React, { useEffect } from 'react'
import Spacer from "../../../components/common/spacer";
import AdminCategoryCommon from '../../../components/dashboard/admin/categories/admin-category-common';
import AdminCategoryProperties from '../../../components/dashboard/admin/categories/admin-category-properties';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminCategoryEditPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialState = location.state;
    const categoryId = location.state?.id;


    useEffect(() => {
        if (!categoryId) {
            navigate("/dashboard/categories");
        }
    }, [])

    return (
        <>
            {categoryId &&
                <div className="admin-category-edit-page-container">
                    <AdminCategoryCommon toEdit={true} initialState={initialState} />
                    <Spacer minHeight={70} />
                    <AdminCategoryProperties categoryId={categoryId} />
                </div>}
        </>
    )
}

export default AdminCategoryEditPage