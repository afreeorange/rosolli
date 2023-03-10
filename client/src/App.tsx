import State from "./State";

import Main from "./Panels/Main";
import Genres from "./Panels/Genres";
import Artists from "./Panels/Artists";
import Albums from "./Panels/Albums";
import Tracks from "./Panels/Tracks";
import Track from "./Panels/Track";

import "./App.scss";

const App = () => (
  <State>
    <main>
      <div>
        <Main />
      </div>
      <div>
        <Genres />
        <Artists />
        <Albums />
        <Tracks />
      </div>
    </main>
  </State>
);

export default App;
