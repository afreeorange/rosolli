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
    genres: Genres;
    albums: Albums;
    artists: Artists;
    tracks: Tracks;

    track: Track | null;
    playingTrack: Track | null;
  };

  set: {
    genres: (genres: Genres) => void;
    albums: (albums: Albums) => void;
    artists: (artists: Artists) => void;
    tracks: (tracks: Tracks) => void;

    statistics: (statistics: Statistics) => void;
    searchTerm: (term: string | null) => void;

    current: {
      genres: (genres: Genres) => void;
      albums: (albums: Albums) => void;
      artists: (artists: Artists) => void;
      tracks: (tracks: Tracks) => void;

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
    genres: [],
    albums: [],
    artists: [],
    tracks: [],

    track: null,
    playingTrack: null,
  },

  set: {
    genres: (genres: Genres) => set((state) => ({ ...state, genres })),
    artists: (artists: Artists) => set((state) => ({ ...state, artists })),
    albums: (albums: Albums) => set((state) => ({ ...state, albums })),
    tracks: (tracks: Tracks) => set((state) => ({ ...state, tracks })),

    statistics: (statistics: Statistics) =>
      set((state) => ({
        ...state,
        statistics,
      })),
    searchTerm: (searchTerm) =>
      set((state) => ({
        ...state,
        searchTerm,
      })),

    current: {
      genres: (genres: Genres) =>
        set((state) => ({
          ...state,
          current: {
            ...state.current,
            genres,
          },
        })),
      artists: (artists: Artists) =>
        set((state) => ({
          ...state,
          current: {
            ...state.current,
            artists,
          },
        })),
      albums: (albums: Albums) =>
        set((state) => ({
          ...state,
          current: {
            ...state.current,
            albums,
          },
        })),
      tracks: (tracks: Tracks) =>
        set((state) => ({
          ...state,
          current: {
            ...state.current,
            tracks,
          },
        })),

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

/**
 * This does a few things:
 *
 * 1) It bootstraps the store with the initial data from the backend.
 * 2) It manages the
 */
const ManageStore: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
        store.set.current.genres(genres);
      }
      if (albums) {
        store.set.albums(albums);
        store.set.current.albums(albums);
      }
      if (artists) {
        store.set.artists(artists);
        store.set.current.artists(artists);
      }
      if (tracks) {
        store.set.tracks(tracks);
        store.set.current.tracks(tracks);
      }
    })();
  }, [statistics, genres, albums, artists, tracks]);

  useEffect(() => {
    (() => {
      if (statistics) {
        store.set.statistics(statistics);
      }
      if (genres) {
        store.set.genres(genres);
        store.set.current.genres(genres);
      }
      if (albums) {
        store.set.albums(albums);
        store.set.current.albums(albums);
      }
      if (artists) {
        store.set.artists(artists);
        store.set.current.artists(artists);
      }
      if (tracks) {
        store.set.tracks(tracks);
        store.set.current.tracks(tracks);
      }
    })();
  }, [statistics, genres, albums, artists, tracks]);

  // TODO: What the fuck? Rewrite...
  trpc.search.useQuery(store.searchTerm || "", {
    // enabled: Boolean(store.searchTerm && store.searchTerm.length > 3),
    onSuccess: (data) => {
      if (data) {
        store.set.current.genres(data.genres);
        store.set.current.artists(data.artists);
        store.set.current.albums(data.albums);
        store.set.current.tracks(data.tracks);

        store.set.statistics({
          ...store.statistics,
          genres: data.genres.length,
          artists: data.artists.length,
          albums: data.albums.length,
          songs: data.tracks.length,
        } as Statistics);
      }
    },
    onError: (err) => {
      store.set.current.genres(store.genres);
      store.set.current.artists(store.artists);
      store.set.current.albums(store.albums);
      store.set.current.tracks(store.tracks);

      store.set.statistics({
        ...store.statistics,
        genres: store.genres.length,
        artists: store.artists.length,
        albums: store.albums.length,
        songs: store.tracks.length,
      } as Statistics);
    },
  });

  return <>{children}</>;
};

/**
 * ---------- Put everything together ----------
 */

export default ({ children }: { children: React.ReactNode }) => {
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
        <ManageStore>{children}</ManageStore>
      </QueryClientProvider>
    </trpc.Provider>
  );
};
