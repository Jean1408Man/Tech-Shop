export default function Loader({ className = "" }) {
  return (
    <div className={"flex gap-2 " + className}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`bg-primary rounded-full size-8 animate-bounce`}
          style={{
            animationDelay: 0.3 * i + "s",
          }}
        />
      ))}
    </div>
  );
}
