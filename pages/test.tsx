import dynamic from "next/dynamic";
const DynamicComponentWithCustomLoading = dynamic(
  () => import("../components/TestingPage"),
  {
    loading: () => <p>...</p>,
    ssr: false,
  }
);
function ContinousPredict() {
  return (
    <div>
      <DynamicComponentWithCustomLoading />
      <p>HOME PAGE is here!</p>
    </div>
  );
}
export default ContinousPredict;
