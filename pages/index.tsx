import dynamic from "next/dynamic";
const DynamicComponentWithCustomLoading = dynamic(
  // () => import("../components/Landing"),
  () => import("../components/TestingPage"),
  {
    loading: () => <p>...</p>,
    ssr: false,
  }
);
function Home() {
  return (
    <div>
      <DynamicComponentWithCustomLoading />
      <p>HOME PAGE is here!</p>
    </div>
  );
}
export default Home;
