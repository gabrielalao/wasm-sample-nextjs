import dynamic from "next/dynamic";
const DynamicComponentWithCustomLoading = dynamic(
  () => import("../components/Enroll"),
  {
    loading: () => <p>...</p>,
    ssr: false,
  }
);
function Enroll() {
  return (
    <div>
      <DynamicComponentWithCustomLoading />
      <p>HOME PAGE is here!</p>
    </div>
  );
}
export default Enroll;
