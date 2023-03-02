import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { create as createStore } from "zustand";

import {
  AppRouter,
  Statistics,
  Genres,
  Albums,
  Tracks,
  Artists,
  Track,
} from "@rosolli/server";

/**
 * ----------- tRPC Stuff -----------
 */

export const trpc = createTRPCReact<AppRouter>();

/**
 * ---------- Zustand/Local State Stuff ----------
 */

type State = {
  genres: Genres;
  albums: Albums;
  artists: Artists;
  tracks: Tracks;

  statistics: Partial<Statistics>;
  searchTerm: string | null;

  current: {
    track: Track | null;
    playingTrack: Track | null;
  };

  set: {
    genres: (genres: Genres) => void;
    albums: (albums: Albums) => void;
    artists: (artists: Artists) => void;
    tracks: (tracks: Tracks) => void;

    statistics: (statistics: Statistics) => void;
    searchterm: (term: string | null) => void;

    current: {
      track: (track: Track | null) => void;
      playingTrack: (track: Track | null) => void;
    };
  };
};

export const useStore = createStore<State>((set) => ({
  genres: [],
  albums: [],
  artists: [],
  tracks: [],

  statistics: {},
  searchTerm: null,

  current: {
    track: null,
    playingTrack: null,
  },

  set: {
    albums: (albums: Albums) => set((state) => ({ ...state, albums })),
    artists: (artists: Artists) => set((state) => ({ ...state, artists })),
    tracks: (tracks: Tracks) => set((state) => ({ ...state, tracks })),
    genres: (genres: Genres) => set((state) => ({ ...state, genres })),

    statistics: (statistics: Statistics) =>
      set((state) => ({
        ...state,
        statistics,
      })),
    searchterm: (term) =>
      set((state) => ({
        ...state,
        searchTerm: term,
      })),

    current: {
      track: (track) =>
        set((state) => ({
          ...state,
          current: {
            ...state.current,
            track,
          },
        })),

      playingTrack: (playingTrack) =>
        set((state) => ({
          ...state,
          current: {
            ...state.current,
            playingTrack,
          },
        })),
    },
  },
}));

const BootstrapStore: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const store = useStore();

  const { data: statistics } = trpc.statistics.useQuery();
  const { data: genres } = trpc.genres.useQuery();
  const { data: albums } = trpc.albums.useQuery();
  const { data: artists } = trpc.artists.useQuery();
  const { data: tracks } = trpc.tracks.useQuery();

  useEffect(() => {
    (() => {
      if (statistics) {
        store.set.statistics(statistics);
      }
      if (genres) {
        store.set.genres(genres);
      }
      if (albums) {
        store.set.albums(albums);
      }
      if (artists) {
        store.set.artists(artists);
      }
      if (tracks) {
        store.set.tracks(tracks);
      }
    })();
  }, [statistics, genres, albums, artists, tracks]);

  return <>{children}</>;
};

/**
 * ---------- Put everything together ----------
 */

const Component: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false, // Fail immediately!
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BootstrapStore>{children}</BootstrapStore>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Component;
