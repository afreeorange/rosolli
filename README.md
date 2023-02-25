# Rosolli-ɑ

A frontend to [Beets](https://github.com/beetbox/beets). Can be used without Beets as well. Just an overcomplicated way of teaching myself tRPC, Prisma, Vite, Tanstack Query, and other new things (this entire project can be done with Express and Mithril).

## TODO

- [ ] Search!
- [ ] Global play/pause with keystrokes
- [ ] Marquee of titles
- [ ] Scrubber
- [ ] ±10s
- [ ] User preferences
  - [ ] ±10s - Adjustable
  - [ ] Dark mode
- [ ] Missing album art
- [ ] Albums and Artists by Genre (group by)
- [ ] Albums by Artist (group by)
- [ ] Mobile/responsive view
- [ ] Check for database or croak
- [ ] Scan Mode
- [ ] Playlists
- [ ] Packaging
- [ ] Loading states
- [ ] Error states :/
- [ ] Sort table
- [ ] Router
  - [ ] Links to Songs
  - [ ] Links to Albums
  - [ ] Links to Genres

## Development Notes

Used `yarn create vite` to bootstrap the Client. Manually created the Server.

- [Workspace script runner](https://www.npmjs.com/package/wsrun)
- `create-mf-app`

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

- [tRPC - Usage with React](https://trpc.io/docs/react)
- [tRPC - Usage with Express](https://trpc.io/docs/express) - Uses contexts which I don't think I need
- https://codesandbox.io/p/sandbox/friendly-matsumoto-nbvtwb

## License

MIT
