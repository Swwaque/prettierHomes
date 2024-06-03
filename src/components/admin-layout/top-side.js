import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { HiDotsHorizontal } from "react-icons/hi";
import { toggleDashboardSide } from "../../store/slices/misc-slice";
import { useLocation } from "react-router-dom";
import "./top-side.scss";

const TopSide = () => {
  const { dashboardSide } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  // Get URL parameters and location using react-router-dom hooks
  const location = useLocation();
  // Extract the last segment of the URL path 
  const lastSegment = location.pathname.split("/").pop();

  const pascalize = (str) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const headerLabel = pascalize(lastSegment);

  const handleSideMenu = () => {
    // Toggle the visibility of the side menu and update Redux state
    dispatch(toggleDashboardSide());
  };

  return (
    <Container fluid className="dashboard-top-side">
      <div className={`menu-toggle ${dashboardSide ? "active" : "passive"}`} onClick={handleSideMenu}>
        <HiDotsHorizontal size={24} />
      </div>
      <div className="top-label">
        {headerLabel}
      </div>
    </Container>
  );
};

export default TopSide;