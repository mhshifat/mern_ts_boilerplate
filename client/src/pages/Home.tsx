import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { logout } = useAuth();

  return (
    <>
      <Link to="/login">Login</Link>
      <Link
        to="/logout"
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
      >
        Logout
      </Link>
    </>
  );
}
