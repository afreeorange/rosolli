import glob from "fast-glob";
import { writeFileSync } from "fs";
import { stat } from "fs/promises";
import { parseFile } from "music-metadata";
import cliProgress from "cli-progress";
import { v5 as uuid } from "uuid";
import numeral from "numeral";
const sqlite3 = require("sqlite3").verbose();

const NAMESPACE = "ROSOLLI-413B3820-9D0E-429F-9819-87EE29D1EFE0";
const ROOT = `~/Downloads/Test`;
const ERROR_LOG = `./rosolli.error.${new Date().toISOString()}.txt`;
const DATABASE = `./library.db`;

(async () => {
  let output: Record<string, any> = {};

  let bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  let matches = glob.sync([`${ROOT}/**/*`], {}); // TODO: Glob just for music files...
  let badFiles = [];

  console.log("Found", numeral(matches.length).format("0,0"), "tracks");

  bar.start(matches.length, 0);
  for (let i = 0; i < matches.length; i++) {
    try {
      const id = uuid(matches[i], NAMESPACE);
      const stats = await stat(matches[i]);
      const metadata = await parseFile(matches[i]);

      const {
        album,
        albumartist,
        artist,
        disk,
        genre,
        label,
        picture,
        title,
        track,
        year,
      } = metadata.common;

      const {
        bitrate,
        codec,
        container,
        duration,
        modificationTime,
        numberOfChannels,
        sampleRate,
      } = metadata.format;

      output[id] = {
        album: album ? album : null,
        album_id: album ? uuid(album, NAMESPACE) : uuid("NO ALBUM", NAMESPACE),
        albumartist,
        artist,
        bitrate,
        channels: numberOfChannels,
        disc: disk.no ? disk.no : 1,
        disctotal: disk.of ? disk.of : 1,
        encoder: codec,
        filesize: stats.size,
        format: container,
        genre: genre ? genre[0] : "NO GENRE",
        id: uuid(matches[i], NAMESPACE),
        label: label ? label[0] : null,
        length: duration,
        mtime: modificationTime,
        path: matches[i],
        samplerate: sampleRate,
        title,
        track: track.no ? track.no : 1,
        tracktotal: track.of ? track.of : 1,
        year,
      };
    } catch (error) {
      badFiles.push(matches[i]);
    }

    bar.increment();
  }
  bar.stop();

  if (badFiles.length > 0) {
    console.log(
      `Encountered some files that could not be processed.`,
      `See ${ERROR_LOG}`
    );

    writeFileSync(
      ERROR_LOG,
      `Found ${badFiles.length} tracks that could not be processed.\n\n` +
        badFiles.join("\n") +
        "\n"
    );
  }

  console.log("Writing output...");
  writeFileSync(`output.json`, JSON.stringify(output, null, 2));
})();
