import { Routes, Route } from "react-router-dom";

import State, { useStore } from "./State";

import Tabs from "./Panels/Tabs";
import Genres from "./Panels/Genres";
import Artists from "./Panels/Artists";
import Albums from "./Panels/Albums";
import Tracks from "./Panels/Tracks";

import "./App.scss";
import NotFound from "./Pages/NotFound";
import WindowSizeWarning from "./Components/WindowSizeWarning";
import Shortcuts from "./Components/Shortcuts";
import Loading from "./Components/Loading";

const Browse = () => (
  <>
    <Genres />
    <Artists />
    <Albums />
    <Tracks />
  </>
);

export default () => {
  const {
    preferences: { darkMode },
  } = useStore();

  return (
    <State>
      <main className={darkMode ? "dark" : undefined}>
        <Shortcuts />
        <Loading />
        <WindowSizeWarning />

        <section>
          <Tabs />
        </section>
        <section>
          <Routes>
            <Route path="/genres" element={<Genres />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/" element={<Browse />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>
      </main>
    </State>
  );
};
