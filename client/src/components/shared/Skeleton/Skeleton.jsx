import { useCallback, useMemo } from "react";
import "./Skeleton.scss";

export default function Skeleton({ loading, children }) {
  const addSkeletonType = useCallback((type) => {
    switch (type) {
      case "h3":
        return "skeleton__heading";
      case "p":
        return "skeleton__paragraph";
      case "img":
        return "skeleton__img";
      default:
        return "";
    }
  }, []);
  const modifiedChildren = useMemo(
    () =>
      (Array.isArray(children)
        ? children
        : children?.type
        ? [children]
        : children.props.children
      ).map((child) => ({
        ...child,
        ...(child?.type === "img" ? { type: "div" } : {}),
        props: {
          ...child.props,
          ...(child?.type !== "img" ? { children: "" } : { src: "" }),
          className: (child.className || "")
            .concat(" skeleton ")
            .concat(addSkeletonType(child.type))
        }
      })),
    []
  );

  if (loading) return modifiedChildren;
  return <>{children}</>;
}
