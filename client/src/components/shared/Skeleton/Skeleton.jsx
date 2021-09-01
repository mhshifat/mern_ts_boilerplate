import { useCallback, useMemo } from "react";
import "./Skeleton.scss";

export default function Skeleton({ loading, children }) {
  const addSkeletonType = useCallback((type) => {
    switch (type) {
      case "h3":
        return "skeleton__heading";
      case "p":
        return "skeleton__paragraph";
      default:
        return "";
    }
  }, []);
  const modifiedChildren = useMemo(
    () =>
      (Array.isArray(children) ? children : children.props.children).map(
        (child) => ({
          ...child,
          props: {
            ...child.props,
            children: "",
            className: (child.className || "")
              .concat(" skeleton ")
              .concat(addSkeletonType(child.type))
          }
        })
      ),
    []
  );

  if (loading) return modifiedChildren;
  return <>{children}</>;
}
