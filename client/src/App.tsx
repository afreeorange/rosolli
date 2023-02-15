import State, { trpc } from "./State";

import "./App.css";

const Component = () => {
  const { data, error, isError } = trpc.greet.useQuery("Lol");

  if (isError) return <div>Something went wrong upstream...</div>;
  if (!data) return <div>Loading&hellip;</div>;
  return <div>{data.greeting}</div>;
};

function App() {
  return (
    <State>
      <main>
        <Component />
      </main>
    </State>
  );
}

export default App;
