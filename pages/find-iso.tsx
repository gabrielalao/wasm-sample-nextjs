import dynamic from "next/dynamic";
const DynamicComponentWithCustomLoading = dynamic(
  () => import("../components/FindISO"),
  {
    loading: () => <p>...</p>,
    ssr: false,
  }
);
function FindISO() {
  return (
    <div>
      <DynamicComponentWithCustomLoading />
      <p>HOME PAGE is here!</p>
    </div>
  );
}
export default FindISO;
