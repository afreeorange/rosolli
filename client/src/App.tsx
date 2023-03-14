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
import React, { useEffect, useRef } from "react";

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

  const leftRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const leftSection = leftRef.current;
    const rightSection = rightRef.current;

    rightSection?.addEventListener("scroll", () => {
      console.log(":LOL");
      scrollListener(leftSection, rightSection);
    });
  }, []);

  const scrollListener = (
    left: HTMLElement | null,
    right: HTMLElement | null
  ) => {
    if (left && right) {
      if (right.scrollLeft > 10) {
        left.classList.add("scroll-shadow");
      } else {
        left.classList.remove("scroll-shadow");
      }
    }
  };

  return (
    <State>
      <main className={darkMode ? "dark" : undefined}>
        <Shortcuts />
        <Loading />
        <WindowSizeWarning />

        <section ref={leftRef}>
          <Tabs />
        </section>
        <section ref={rightRef}>
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
