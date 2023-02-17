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
  Songs,
  Artists,
} from "@rosolli/server";

/**
 * ----------- tRPC Stuff -----------
 */

export const trpc = createTRPCReact<AppRouter>();

/**
 * ---------- Zustand/Local State Stuff ----------
 */

export const useStore = createStore<{
  statistics: Partial<Statistics>;
  setStatistics: (statistics: Statistics) => void;

  genres: Genres;
  setGenres: (genres: Genres) => void;

  albums: Albums;
  setAlbums: (albums: Albums) => void;

  artists: Artists;
  setArtists: (artists: Artists) => void;

  songs: Songs;
  setSongs: (songs: Songs) => void;

  search: {
    term: string | null;
  };
}>((set) => ({
  statistics: {},
  setStatistics: (statistics: Statistics) =>
    set((state) => ({
      ...state,
      statistics,
    })),

  genres: [],
  setGenres: (genres: Genres) => set((state) => ({ ...state, genres })),

  albums: [],
  setAlbums: (albums: Albums) => set((state) => ({ ...state, albums })),

  artists: [],
  setArtists: (artists: Artists) => set((state) => ({ ...state, artists })),

  songs: [],
  setSongs: (songs: Songs) => set((state) => ({ ...state, songs })),

  search: {
    term: null,
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
  const { data: songs } = trpc.songs.useQuery();

  useEffect(() => {
    (() => {
      if (statistics) {
        store.setStatistics(statistics);
      }
      if (genres) {
        store.setGenres(genres);
      }
      if (albums) {
        store.setAlbums(albums);
      }
      if (artists) {
        store.setArtists(artists);
      }
      if (songs) {
        store.setSongs(songs);
      }
    })();
  }, [statistics, genres, albums, songs]);

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
