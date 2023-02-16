import State, { trpc } from "./State";

import "./App.css";

const Component = () => {
  const { data: statistics, isError, isLoading } = trpc.statistics.useQuery();

  if (isError) return <div>Something went wrong upstream...</div>;
  if (isLoading) return <div>Loading&hellip;</div>;

  return <div>{statistics?.albums}</div>;
};

const App = () => (
  <State>
    <main>
      <Component />
    </main>
  </State>
);

export default App;
