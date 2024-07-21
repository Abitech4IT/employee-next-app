import { Spinner } from "@nextui-org/spinner";

export default function LoadingSpinner() {
  return (
    <div className="grid items-center justify-center">
      <Spinner label="loading data..." />
    </div>
  );
}
