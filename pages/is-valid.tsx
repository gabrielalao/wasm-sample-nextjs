import dynamic from "next/dynamic";
const DynamicComponentWithCustomLoading = dynamic(
  () => import("../components/IsValid"),
  {
    loading: () => <p>...</p>,
    ssr: false,
  }
);
function IsValid() {
  return (
    <div>
      <DynamicComponentWithCustomLoading />
      <p>HOME PAGE is here!</p>
    </div>
  );
}
export default IsValid;
