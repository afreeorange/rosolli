import React, { useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import State, { useStore } from "./State";

import Albums from "./Pages/Albums";
import NotFound from "./Pages/NotFound";
import Tabs from "./Panels/Tabs";
import Tracks from "./Pages/Tracks";
import Genres from "./Pages/Genres";

import Loading from "./Components/Loading";
import Shortcuts from "./Components/Shortcuts";
import WindowSizeWarning from "./Components/WindowSizeWarning";
import ErrorBoundary from "./Components/ErrorBoundary";

import "./App.scss";

export default () => {
  const {
    preferences: { darkMode },
  } = useStore();

  const leftRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLElement>(null);

  useEffect(() => {
    rightRef.current?.addEventListener("scroll", scrollListener);

    return () =>
      rightRef.current?.removeEventListener("scroll", scrollListener);
  }, []);

  const scrollListener: EventListener = () => {
    const left = leftRef.current;
    const right = rightRef.current;

    if (left && right) {
      if (right.scrollLeft > 10) {
        left.classList.add("scroll-shadow");
      } else {
        left.classList.remove("scroll-shadow");
      }
    }
  };

  return (
    <main className={darkMode ? "dark" : undefined}>
      <ErrorBoundary>
        <State>
          <Shortcuts />
          <Loading />
          <WindowSizeWarning />

          <section ref={leftRef}>
            <Tabs />
          </section>
          <section ref={rightRef}>
            <Routes>
              <Route path="/genres" element={<Genres />} />
              {/* <Route path="/artists" element={<Artists />} /> */}
              <Route path="/albums" element={<Albums />} />
              <Route path="/tracks" element={<Tracks />} />
              <Route path="/" element={<Navigate to="/tracks" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </section>
        </State>
      </ErrorBoundary>
    </main>
  );
};
