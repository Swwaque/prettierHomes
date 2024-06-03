import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { getDailyReport } from "../../../../api/report-service";
import { useToast } from "../../../../store/providers/toast-provider";
import { BsClipboard2DataFill } from "react-icons/bs";
import "./dashboard.scss";
import AdminDailyReport from "../reports/admin-daily-report";
import Spacer from "../../../common/spacer";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const [statistics, setStatistics] = useState();
  const { showToast } = useToast();
  const color = ["--blue-500", "--red-500", "--green-500", "--orange-500", "--purple-500", "--pink-500"];
  const {t} = useTranslation();

  const loadData = async () => {
    try {
      const resp = await getDailyReport();
      setStatistics(resp);
    } catch (error) {
      showToast({
        severity: "error",
        summary: t("error.error"),
        detail: Object.values(error.response.data)[0],
      });
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="dashboard-container">
        {statistics &&
          Object.entries(statistics).map(([label, data], index) => (
            <Card key={index} className="statistic-card">
              <Card.Header>
                <BsClipboard2DataFill color="orange" size={20} />
                {label}
              </Card.Header>
              <Card.Body>
                <AdminDailyReport
                  key={label}
                  label={label}
                  data={data}
                  color={color[index]}
                />
              </Card.Body>
            </Card>
          ))}
      </div>
      <Spacer />
    </>
  );
};

export default Dashboard;
