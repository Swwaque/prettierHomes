import React, { useState } from 'react'
import AdminCategoryCommon from '../../../components/dashboard/admin/categories/admin-category-common';
import AdminCategoryProperties from '../../../components/dashboard/admin/categories/admin-category-properties';


const AdminCategoryCreatePage = () => {
    const [categoryId, setCategoryId] = useState(null);

    return (
        <>
            <div className="admin-category-edit-page-container">
                {categoryId === null &&
                    <AdminCategoryCommon toEdit={false} setCategoryId={setCategoryId} />
                }
                <div
                    style={{
                        opacity: categoryId ? 1 : 0,
                        transition: 'transform 0.7s ease, opacity 0.7s ease',
                        transform: categoryId ? 'translateY(0)' : 'translateY(30px)'
                    }}
                >
                    {categoryId &&
                        <AdminCategoryProperties categoryId={categoryId} />
                    }
                </div>
            </div>
        </>
    )
}

export default AdminCategoryCreatePage