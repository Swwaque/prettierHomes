import React from 'react';
import AdminUserEdit from '../../../components/dashboard/admin/users/admin-user-edit';
import AdminUserAdverts from '../../../components/dashboard/admin/users/admin-user-adverts';
import AdminUserTourRequests from '../../../components/dashboard/admin/users/admin-user-tour-requests';
import AdminUserFavorites from '../../../components/dashboard/admin/users/admin-user-favorites';
import AdminUserLogs from '../../../components/dashboard/admin/users/admin-user-logs';
import FieldWrapper from '../../../components/common/field-wrapper';
import Spacer from '../../../components/common/spacer';

const AdminUserEditPage = () => {

  return (
    <>
      <AdminUserEdit />
      <Spacer minHeight={50} />
      <FieldWrapper label="Adverts">
        <AdminUserAdverts />
      </FieldWrapper>
      <Spacer minHeight={50} />
      <FieldWrapper label="Tour Request">
        <AdminUserTourRequests />
      </FieldWrapper>
      <Spacer minHeight={50} />
      <FieldWrapper label="Favorites">
        <AdminUserFavorites />
      </FieldWrapper>
      <Spacer minHeight={50} />
      <FieldWrapper label="Logs">
        <AdminUserLogs />
      </FieldWrapper>
    </>
  )
}

export default AdminUserEditPage