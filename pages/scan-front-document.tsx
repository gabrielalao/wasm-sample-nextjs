import dynamic from "next/dynamic";
const DynamicComponentWithCustomLoading = dynamic(
  () => import("../components/ScanFrontDocument"),
  {
    loading: () => <p>...</p>,
    ssr: false,
  }
);
function ScanFrontDocument() {
  return (
    <div>
      <DynamicComponentWithCustomLoading />
      <p>HOME PAGE is here!</p>
    </div>
  );
}
export default ScanFrontDocument;
