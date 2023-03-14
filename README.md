# Rosolli-ɑ

A frontend to [Beets](https://github.com/beetbox/beets). Can be used without Beets as well. A giant work-in-progress.

Just an overcomplicated way of teaching myself tRPC, Prisma, Vite, Tanstack Query, and other new things. This entire project can be done with REST, Express, and something lightweight like Mithril or Vue with little fuss...

## TODO

- [x] Search!
- [ ] Global play/pause with keystrokes
- [ ] Marquee of titles
- [ ] Check for Database and connectivity
- [ ] Scrubber
- [ ] Pagination of Tracks
- [ ] Themes
  - [ ] Solarized Light
  - [ ] [Disco Theme](https://marketplace.visualstudio.com/items?itemName=RobbOwen.synthwave-vscode)
- [x] Squeeze Warning
- [ ] Persistence
- [ ] Electron?
- [ ] Toasts
- [ ] ±10s
- [ ] User preferences
  - [ ] ±10s - Adjustable
  - [x] Dark mode
  - [ ] Toasts/notifications
  - [ ] Layout of Tracks
- [x] Missing album art
- [ ] Albums and Artists by Genre (group by)
- [ ] Albums by Artist (group by)
- [ ] Mobile/responsive view
- [ ] Check for database or croak
- [ ] Server - Scan Mode
- [x] Server - Compression (6.5MiB -> 855Kib!)
- [ ] Playlists
- [ ] Packaging
- [ ] Loading states
- [ ] Error states :/
- [ ] Sort table
- [ ] Click to Copy
- [ ] Error Boundary
- [ ] Adjustable table cols with truncation
- [ ] Debounce Search
- [ ] Search Loading state
- [ ] [Panels](https://react-resizable-panels.vercel.app/examples/horizontal)
- [x] Data Loading State
- [ ] Drag and Drop Albums, Tracks, Artists
- [x] Router
  - [ ] Links to Songs
  - [ ] Links to Albums
  - [ ] Links to Genres
  - [ ] Links to Tracks (activate tab)

## Development Notes

Used `yarn create vite` to bootstrap the Client. Manually created the Server.

### Fields

Named to maintain compatilibity with the Beets schema.

```
album,
album_id,
albumartist,
artist,
bitrate,
channels,
disc,
disctotal,
encoder,
format,
genre,
id,
label,
length,
mtime,
path,
samplerate,
title,
track,
tracktotal,
year
```

I additionally add these

```
cover
readableLength
```

### References

- [tRPC - Usage with Express](https://trpc.io/docs/express) - Uses contexts which I don't think I need
- [tRPC - Usage with React](https://trpc.io/docs/react)
- [Workspace script runner](https://www.npmjs.com/package/wsrun)
- `create-mf-app`
- [Tanstack Table Example](https://codesandbox.io/p/sandbox/friendly-matsumoto-nbvtwb)
- https://github.com/donavon/use-persisted-state
- https://github.com/donavon/use-dark-mode

## License

MIT

Icons [via](https://www.flaticon.com/packs/healthy-food-2) and [React Icons](https://react-icons.github.io/react-icons/).
