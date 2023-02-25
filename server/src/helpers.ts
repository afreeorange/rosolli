import fs from "fs";

import { createAvatar } from "@dicebear/core";
import { shapes } from "@dicebear/collection";
import mime from "mime-types";

import { Track } from "./database";

export const base64EncodeAsset = (assetPath: string) =>
  `data:${mime.lookup(assetPath)};base64,${fs
    .readFileSync(assetPath)
    .toString("base64")}`;

export const placeholderAlbumCover = (track: Track) =>
  createAvatar(shapes, {
    seed: track.album || track.title,

    size: 512,
    backgroundType: ["gradientLinear"],
    backgroundColor: ["336699"],
    shape1Color: ["ff3300"],
    shape2Color: ["101010"],
    shape3Color: ["ffffff"],
  }).toDataUri();
