import React from 'react';
import AdminAdvertsReport from '../../../components/dashboard/admin/reports/admin-adverts-report';
import AdminMostPopularReport from '../../../components/dashboard/admin/reports/admin-most-popular-report';
import AdminUsersReport from '../../../components/dashboard/admin/reports/admin-users-report';
import AdminTourRequestsReport from '../../../components/dashboard/admin/reports/admin-tour-requests-report';

const AdminReportsPage = () => {
  return (
    <>
      <div className="admin-report-container">
        <AdminAdvertsReport />
        <AdminMostPopularReport />
        <AdminUsersReport />
        <AdminTourRequestsReport />
      </div>
    </>
  )
}

export default AdminReportsPage