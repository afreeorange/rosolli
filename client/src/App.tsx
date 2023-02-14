import State, { trpc } from "./State";

import "./App.css";

const Component = () => {
  const hello = trpc.greet.useQuery("Lol");
  if (!hello.data) return <div>Loading&hellip;</div>;
  return <div>{hello.data.greeting}</div>;
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
