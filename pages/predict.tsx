import dynamic from "next/dynamic";
const DynamicComponentWithCustomLoading = dynamic(
  () => import("../components/Predict"),
  {
    loading: () => <p>...</p>,
    ssr: false,
  }
);
function Predict() {
  return (
    <div>
      <DynamicComponentWithCustomLoading />
      <p>HOME PAGE is here!</p>
    </div>
  );
}
export default Predict;
