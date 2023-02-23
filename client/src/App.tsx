import State from "./State";

import Main from "./Panels/Main";
import Genres from "./Panels/Genres";
import Artists from "./Panels/Artists";
import Albums from "./Panels/Albums";
import Tracks from "./Panels/Tracks";

import "./App.scss";

const App = () => (
  <State>
    <main>
      <Main />
      <Genres />
      <Artists />
      <Albums />
      <Tracks />

    </main>
  </State>
);

export default App;
