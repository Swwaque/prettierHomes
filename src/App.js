import AppRouter from "./router";
import Loading from "./components/loading/LogoLoading";
import { useEffect, useState } from "react";
import { getUser } from "./api/auth-service";
import { login, logout } from "./store/slices/auth-slice";
import { useDispatch } from "react-redux";
import { PopupProvider } from "./store/providers/toast-provider";
import { getFavoriteAdvertIdList } from "./api/user-service";
import { fetchFavs, resetFavs } from "./store/slices/fav-slice";
import { getFromLocalStorage } from "./helpers/function/encrypted-storage";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      const resp = await getUser();
      dispatch(login(resp));
    } catch (err) {
      dispatch(logout());
      dispatch(resetFavs());
    } finally {
      loadFavs();
    }
  };

  const loadFavs = async () => {
    try {
      if (getFromLocalStorage("token")) {
        const resp = await getFavoriteAdvertIdList();
        dispatch(fetchFavs(resp));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  return (
      <PopupProvider>
        {loading ?
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh"
            }}>
            <Loading size={120} />
          </div>
          :
          <AppRouter />}
      </PopupProvider>
  );
}

export default App;
