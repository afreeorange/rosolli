import State from "./State";
import Main from "./Panels/Main";
import Genres from "./Panels/Genres";
import Albums from "./Panels/Albums";
import Artists from "./Panels/Artists";
import Songs from "./Panels/Songs";
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
      <Songs />
      {/* <Player /> */}
    </main>
  </State>
);

export default App;
