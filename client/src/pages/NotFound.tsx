import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <p>Page not found</p>
      <Link to="/">Home</Link>
    </div>
  );
}
