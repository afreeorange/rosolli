import State from "./State";
import MainPanel from "./Panels/Main";
import Genres from "./Panels/Genres";
import Albums from "./Panels/Albums";
import Artists from "./Panels/Artists";
import Songs from "./Panels/Songs";

import "./base.scss";
import "./App.scss";

const App = () => (
  <State>
    <main>
      <MainPanel />
      <Genres />
      <Albums />
      <Artists />
      <Songs />
    </main>
  </State>
);

export default App;
