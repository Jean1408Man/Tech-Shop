import { useLoading } from "../../context/LoadingContext";
import Loader from "./Loader";

export default function GlobalLoader() {
  const { isLoading, message } = useLoading();

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 sm:p-8 shadow-2xl">
        <Loader className="scale-125 sm:scale-150" />
        {message && (
          <p className="text-sm font-medium text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
