import style from "./TitleTab.module.css";

export default function TitleTab({ children, variant = "relative" }) {
  const className =
    variant === "relative"
      ? "relative -translate-y-6 sm:-translate-y-8"
      : "absolute";
  return (
    <div
      className={
        style.parent + ` ${className} top-0 left-1/2 -translate-x-1/2 z-50`
      }
    >
      <h1
        className={`w-max text-2xl sm:text-3xl font-bold text-white bg-gradient-to-b from-primary-dark to-primary px-8 sm:px-12 py-3 sm:py-4 ${style["title-tab"]}`}
      >
        {children}
      </h1>
    </div>
  );
}
