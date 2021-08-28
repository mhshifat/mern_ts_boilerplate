import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loader from "../components/shared/Loader/Loader";
import useLoaderWithRefresh from "../hooks/useLoaderWithRefresh";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PublicRoute from "./PublicRoute";

export default function Routes() {
  const { loading } = useLoaderWithRefresh();

  if (loading) return <Loader size="md" />;
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <PublicRoute exact path="/login" component={Login} />
      </Switch>
    </>
  );
}
