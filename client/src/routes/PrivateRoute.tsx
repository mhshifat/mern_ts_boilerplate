import { Redirect, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ component: Component, ...rest }: any) {
  const { authState } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        !authState?.isAuth ? (
          <Redirect to="/login" from={props.location.pathname} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
