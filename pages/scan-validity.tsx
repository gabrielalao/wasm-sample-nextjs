import dynamic from "next/dynamic";
const DynamicComponentWithCustomLoading = dynamic(
  () => import("../components/ScanValidity"),
  {
    loading: () => <p>...</p>,
    ssr: false,
  }
);
function ScanValidity() {
  return (
    <div>
      <DynamicComponentWithCustomLoading />
      <p>HOME PAGE is here!</p>
    </div>
  );
}
export default ScanValidity;
