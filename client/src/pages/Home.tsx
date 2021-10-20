import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setLoading(false), 5000);

    return () => clearInterval(timer);
  }, []);

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
