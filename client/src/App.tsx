import State from "./State";

import Tabs from "./Panels/Tabs";
import Genres from "./Panels/Genres";
import Artists from "./Panels/Artists";
import Albums from "./Panels/Albums";
import Tracks from "./Panels/Tracks";

import "./App.scss";

export default () => (
  <State>
    <main>
      <div>
        <Tabs />
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
