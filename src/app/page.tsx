import "semantic-ui-css/semantic.min.css";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <span className="text-2xl">&#128200;</span>
      <h1 className="font-medium">Loading your data...</h1>
    </div>
  );
};

export default function Home() {
  return <div>Hello</div>;
}
