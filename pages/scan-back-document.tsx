import dynamic from "next/dynamic";
const DynamicComponentWithCustomLoading = dynamic(
  () => import("../components/ScanBackDocument"),
  {
    loading: () => <p>...</p>,
    ssr: false,
  }
);
function ScanBackDocument() {
  return (
    <div>
      <DynamicComponentWithCustomLoading />
      <p>HOME PAGE is here!</p>
    </div>
  );
}
export default ScanBackDocument;
