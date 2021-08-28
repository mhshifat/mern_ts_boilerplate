import loaderSVG from "../../../assets/loader.svg";
import "./Loader.scss";

interface LoaderProps {
  size: "sm" | "md" | "lg";
}

export default function Loader({ size }: LoaderProps) {
  return (
    <div className="loader">
      <img
        src={loaderSVG}
        width={
          size === "sm" ? 30 : size === "md" ? 60 : size === "lg" ? 90 : 30
        }
        alt="Loading..."
      />
    </div>
  );
}
