import React, { useState } from "react";
import AdminAdvertSearchPanel from "../../../components/dashboard/admin/adverts/admin-advert-search-panel";
import AdminAdvertTable from "../../../components/dashboard/admin/adverts/admin-advert-table";
import Spacer from "../../../components/common/spacer";

const AdminAdvertsPage = () => {
  const [loading, setLoading] = useState(false);
  const [adverts, setAdverts] = useState([]);
  const [searchParams, setSearchParams] = useState({
    q: "",
    status: "",
    price_start: 0,
    price_end: "",
    advert_type_id: "",
    category_id: "",
  });

  return (
    <>
      <AdminAdvertSearchPanel
        loading={loading}
        setSearchParams={setSearchParams}
      />
      <Spacer minHeight={50} />
      <AdminAdvertTable
        adverts={adverts}
        setAdverts={setAdverts}
        searchParams={searchParams}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};

export default AdminAdvertsPage;
