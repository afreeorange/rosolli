import State from "./State";
import Main from "./Panels/Main";
import Genres from "./Panels/Genres";
import Albums from "./Panels/Albums";
import Artists from "./Panels/Artists";
import Tracks from "./Panels/Tracks";
import Player from "./Components/Player";

import "./base.scss";
import "./App.scss";

const App = () => (
  <State>
    <main>
      <Main />
      <Genres />
      <Artists />
      <Albums />
      <Tracks />
      {/* <Player /> */}
    </main>
  </State>
);

export default App;
