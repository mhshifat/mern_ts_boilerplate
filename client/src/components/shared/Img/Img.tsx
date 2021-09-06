import axios from "axios";
import { ImgHTMLAttributes, useEffect, useState } from "react";
import Skeleton from "../Skeleton/Skeleton";
import "./Img.scss";

export default function Img({
  src,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (!src) return;
    axios
      .get(src)
      .then((data) => setImageSrc(data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Skeleton loading={loading}>
      <img src={src} {...rest} alt="" />
    </Skeleton>
  );
}
