import { useTranslation } from 'react-i18next';

const Status = () => {

  const { t } = useTranslation();

  const status = [
    { label: t("status.all"), value: "" },
    { label: t("status.pending"), value: 0 },
    { label: t("status.approved"), value: 1 },
    { label: t("status.rejected"), value: 2 },
    { label: t("status.canceled"), value: 3 }]
  
    const statusForAdverts = [
      {
          value: "",
          label: t("adminAdvertSearchPanel.titleAll"),
      },
      {
        value: 0,
          label: t("adminAdvertSearchPanel.statusForAdvertsId1"),
      },
      {
        value: 1,
          label: t("adminAdvertSearchPanel.statusForAdvertsId2"),
      },
      {
          value: 2,
          label: t("adminAdvertSearchPanel.statusForAdvertsId3"),
      },
  ];
  

  return { status, statusForAdverts };

}

export default Status;