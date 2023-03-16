import React, { useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import State, { useStore } from "./State";
import Tabs from "./Panels/Tabs";
import Tracks from "./Pages/Tracks";
import NotFound from "./Pages/NotFound";

import WindowSizeWarning from "./Components/WindowSizeWarning";
import Shortcuts from "./Components/Shortcuts";
import Loading from "./Components/Loading";

import "./App.scss";
import Albums from "./Pages/Albums";

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
            {/* <Route path="/genres" element={<Genres />} /> */}
            <Route path="/albums" element={<Albums />} />
            {/*
            <Route path="/artists" element={<Artists />} />

             */}
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/" element={<Navigate to="/tracks" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>
      </main>
    </State>
  );
};
