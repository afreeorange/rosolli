/**
 * TODO:
 *
 * - ImmerJS
 * - Split things up
 * - DevTools
 */

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { create as createStore } from "zustand";
import { devtools } from "zustand/middleware";

import {
  AppRouter,
  Statistics,
  Genres,
  Albums,
  Tracks,
  Artists,
  Track,
  Album,
} from "@rosolli/server";

/**
 * ----------- tRPC Stuff -----------
 */

export const trpc = createTRPCReact<AppRouter>();

/**
 * ---------- Zustand/Local State Stuff ----------
 */

export const TABS = {
  browse: 10,
  settings: 20,
  history: 30,
  trackInfo: 40,
  playing: 50,
};

type State = {
  genres: Genres;
  albums: Albums;
  artists: Artists;
  tracks: Tracks;

  loading: boolean;

  statistics: Partial<Statistics>;
  searchTerm: string | null;
  showingSearchResults: boolean;

  current: {
    genres: Genres;

    albums: Albums;
    album: Album | null;

    artists: Artists;

    tracks: Tracks;
    track: Track | null;

    playingTrack: Track | null;
    tabNumber: number;
  };

  preferences: {
    trackInfoOpen: boolean;
    darkMode: boolean;
    verticalTrackBrowse: boolean;
  };

  set: {
    genres: (genres: Genres) => void;
    albums: (albums: Albums) => void;
    artists: (artists: Artists) => void;
    tracks: (tracks: Tracks) => void;

    statistics: (statistics: Statistics) => void;
    searchTerm: (term: string | null) => void;
    showingSearchResults: (showingSearchResults: boolean) => void;
    loading: (loading: boolean) => void;

    current: {
      genres: (genres: Genres) => void;

      albums: (albums: Albums) => void;
      album: (album: Album) => void;

      artists: (artists: Artists) => void;

      tracks: (tracks: Tracks) => void;
      track: (track: Track) => void;
      playingTrack: (track: Track | null) => void;

      tabNumber: (tabNumber: number) => void;
    };

    preferences: {
      trackInfoOpen: (open: boolean) => void;
      darkMode: (darkMode: boolean) => void;
      verticalTrackBrowse: (verticalTrackBrowse: boolean) => void;
    };
  };
};

export const useStore = createStore<State>()(
  devtools((set) => ({
    genres: [],
    albums: [],
    artists: [],
    tracks: [],

    loading: true,

    statistics: {},
    searchTerm: null,
    showingSearchResults: false,

    current: {
      genres: [],

      albums: [],
      album: null,

      artists: [],

      tracks: [],
      track: null,

      playingTrack: null,
      tabNumber: 1,
    },

    preferences: {
      trackInfoOpen: true,

      /**
       * TODO: Use system prefs... create a hierarchy of preferences. See
       * index.html.
       */
      darkMode: Boolean(localStorage.getItem("darkMode")),
      verticalTrackBrowse: false,
    },

    set: {
      genres: (genres: Genres) => set((state) => ({ ...state, genres })),
      artists: (artists: Artists) => set((state) => ({ ...state, artists })),
      albums: (albums: Albums) => set((state) => ({ ...state, albums })),
      tracks: (tracks: Tracks) => set((state) => ({ ...state, tracks })),

      loading: (loading) =>
        set((state) => ({
          ...state,
          loading,
        })),

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
      showingSearchResults: (showingSearchResults) =>
        set((state) => ({
          ...state,
          showingSearchResults,
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
        album: (album: Album) =>
          set((state) => ({
            ...state,
            current: {
              ...state.current,
              album,
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

        tabNumber: (tabNumber) =>
          set((state) => ({
            ...state,
            current: {
              ...state.current,
              tabNumber,
            },
          })),
      },

      preferences: {
        trackInfoOpen: (trackInfoOpen) =>
          set((state) => ({
            ...state,
            preferences: {
              ...state.preferences,
              trackInfoOpen,
            },
          })),
        darkMode: (darkMode) => {
          set((state) => ({
            ...state,
            preferences: {
              ...state.preferences,
              darkMode,
            },
          }));

          if (darkMode) {
            localStorage.setItem("darkMode", darkMode.toString());
          } else {
            localStorage.removeItem("darkMode");
          }
        },
        verticalTrackBrowse: (verticalTrackBrowse) =>
          set((state) => ({
            ...state,
            preferences: {
              ...state.preferences,
              verticalTrackBrowse,
            },
          })),
      },
    },
  }))
);

/**
 * This does a few things:
 *
 * 1) It bootstraps the store with the initial data from the backend.
 * 2) It manages the
 */
const ManageStore: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useStore();

  const { isFetching: isFet_S, data: statistics } = trpc.statistics.useQuery();
  const { isFetching: isFet_G, data: genres } = trpc.genres.useQuery();
  const { isFetching: isFet_A, data: albums } = trpc.albums.useQuery();
  const { isFetching: isFet_L, data: artists } = trpc.artists.useQuery();
  const { isFetching: isFet_T, data: tracks } = trpc.tracks.useQuery();

  /**
   * BOOTSTRAP! 🥾
   */
  useEffect(() => {
    (() => {
      if (!(isFet_S || isFet_G || isFet_A || isFet_L || isFet_T)) {
        store.set.loading(false);
      }

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

  // TODO: What the fuck? Rewrite. There appears to be a `previousdata` part to
  // React Query as well...
  trpc.search.useQuery(store.searchTerm || "", {
    enabled:
      store.searchTerm === "" ||
      Boolean(store.searchTerm && store.searchTerm.length >= 3),
    onSuccess: (data) => {
      if (data) {
        store.set.current.genres(data.genres);
        store.set.current.artists(data.artists);
        store.set.current.albums(data.albums);
        store.set.current.tracks(data.tracks);

        store.set.showingSearchResults(true);

        store.set.statistics({
          ...store.statistics,
          genres: data.genres.length,
          artists: data.artists.length,
          albums: data.albums.length,
          tracks: data.tracks.length,
        } as Statistics);
      }
    },
    onError: () => {
      store.set.current.genres(store.genres);
      store.set.current.artists(store.artists);
      store.set.current.albums(store.albums);
      store.set.current.tracks(store.tracks);

      store.set.showingSearchResults(false);

      store.set.statistics({
        ...store.statistics,
        genres: store.genres.length,
        artists: store.artists.length,
        albums: store.albums.length,
        tracks: store.tracks.length,
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
        loggerLink({
          enabled: (opts) =>
            (process.env.NODE_ENV === "development" &&
              typeof window !== "undefined") ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
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
